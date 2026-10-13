"use client";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {Button} from "@dvnnshmr/web-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <Button
      color="inherit"
      disabled={isSigningOut}
      onClick={handleSignOut}
      startIcon={<LogoutRoundedIcon />}
      variant="Primary"
    >
      {isSigningOut ? "Signing out…" : "Sign out"}
    </Button>
  );
}
