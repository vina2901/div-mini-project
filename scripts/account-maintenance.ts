import "dotenv/config";

import { z } from "zod";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

const DIVINA_EMAIL = "divinabarabad91@gmail.com";
const DEMO_EMAIL = "demo@example.com";

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters")
  .max(128, "Password must contain no more than 128 characters");

function promptHidden(message: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
      reject(new Error("A local interactive terminal is required for secure password entry."));
      return;
    }

    let value = "";
    const stdin = process.stdin;
    const stdout = process.stdout;

    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
    };

    const onData = (input: Buffer | string) => {
      for (const character of input.toString()) {
        if (character === "\u0003") {
          cleanup();
          stdout.write("\n");
          reject(new Error("Account creation cancelled."));
          return;
        }

        if (character === "\r" || character === "\n") {
          cleanup();
          stdout.write("\n");
          resolve(value);
          return;
        }

        if (character === "\u0008" || character === "\u007f") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            stdout.write("\b \b");
          }
          continue;
        }

        if (character >= " ") {
          value += character;
          stdout.write("*");
        }
      }
    };

    stdout.write(message);
    stdin.setEncoding("utf8");
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function inspectAccounts() {
  const users = await prisma.user.findMany({
    where: {
      email: { in: [DEMO_EMAIL, DIVINA_EMAIL] },
    },
    orderBy: { email: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      createdAt: true,
      accounts: {
        select: { id: true, providerId: true },
      },
      _count: {
        select: { accounts: true, sessions: true },
      },
    },
  });

  console.table(
    users.map(({ accounts, _count, ...user }) => ({
      ...user,
      providers: accounts.map((account) => account.providerId).join(", "),
      accountRecords: _count.accounts,
      sessionRecords: _count.sessions,
    })),
  );

  return users;
}

async function createDivinaAccount() {
  const existing = await prisma.user.findUnique({
    where: { email: DIVINA_EMAIL },
    select: { id: true },
  });

  if (existing) {
    throw new Error(`An account already exists for ${DIVINA_EMAIL}. Nothing was changed.`);
  }

  let password = await promptHidden("New password: ");
  let confirmation = await promptHidden("Confirm password: ");

  try {
    if (password !== confirmation) {
      throw new Error("The passwords did not match. Nothing was changed.");
    }

    const parsedPassword = passwordSchema.parse(password);

    await auth.api.signUpEmail({
      body: {
        name: "Divina",
        email: DIVINA_EMAIL,
        password: parsedPassword,
      },
    });

    // A successful sign-in verifies the stored Better Auth credential hash.
    await auth.api.signInEmail({
      body: {
        email: DIVINA_EMAIL,
        password: parsedPassword,
      },
    });

    const created = await prisma.user.findUnique({
      where: { email: DIVINA_EMAIL },
      select: {
        name: true,
        email: true,
        accounts: { select: { providerId: true } },
        _count: { select: { accounts: true, sessions: true } },
      },
    });

    if (!created || !created.accounts.some((account) => account.providerId === "credential")) {
      throw new Error("Better Auth did not create the expected credential account.");
    }

    console.log("\nDivina account created and credential sign-in verified.");
    console.table([
      {
        name: created.name,
        email: created.email,
        accountRecords: created._count.accounts,
        sessionRecords: created._count.sessions,
      },
    ]);
    console.log("Demo User was not changed or deleted.");
  } finally {
    password = "";
    confirmation = "";
  }
}

async function main() {
  const command = process.argv[2];

  if (command === "inspect") {
    await inspectAccounts();
    return;
  }

  if (command === "create-divina") {
    await createDivinaAccount();
    return;
  }

  throw new Error("Use either `inspect` or `create-divina`.");
}

void main()
  .catch((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "Unknown account-maintenance error";
    console.error(`\n${message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
