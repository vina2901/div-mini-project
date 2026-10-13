import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SubscriptionDashboard } from "@/components/subscription-dashboard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/");
  }

  return <SubscriptionDashboard userName={session.user.name || "there"} />;
}
