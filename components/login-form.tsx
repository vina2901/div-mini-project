"use client";

import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@dvnnshmr/web-components";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";

type FieldErrors = Partial<Record<keyof LoginValues, string>>;

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.email(result.data);
      if (error) {
        setFormError(error.message || "Unable to sign in. Check your credentials.");
        return;
      }
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setFormError("The authentication service is unavailable. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="main"
      className="subsense-login"
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 2.5, md: 3 },
        background: "linear-gradient(135deg, #F8FAFC 0%, #EAF7F4 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1120,
          // Desktop: fit the complete two-column panel inside the viewport.
          // Compact desktop windows can scroll rather than clipping content.
          height: { md: "min(740px, calc(100dvh - 48px))" },
          "@media (min-width: 900px) and (max-height: 699px)": {
            height: "auto",
          },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.04fr 0.96fr" },
          bgcolor: "background.paper",
          border: "1px solid #E2E8F0",
          borderRadius: { xs: 3, md: 5 },
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(15, 55, 61, 0.09)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
            p: { xs: 3, sm: 4, md: 4, lg: 4.5 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: { xs: 3, md: 4 } }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                borderRadius: 2.5,
              }}
            >
              <AccountBalanceWalletRoundedIcon />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.04em" }}>
              SubSense
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 420, width: "100%", mx: "auto" }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Welcome back!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.55 }}>
              Sign in to keep your subscriptions organized and your spending in sight.
            </Typography>

            <Box component="form" method="post" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {formError ? <Alert severity="error">{formError}</Alert> : null}
                <Box>
                  <Typography component="label" htmlFor="subsense-email" sx={{ display: "block", fontWeight: 600, fontSize: 14, mb: 0.75 }}>
                    Email address
                  </Typography>
                  <TextField
                    id="subsense-email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 50,
                      minHeight: 50,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxSizing: "border-box",
                      height: "100%",
                      minHeight: 0,
                      padding: "0 14px !important",
                      lineHeight: "normal",
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      opacity: 1,
                      color: "#64748B",
                    },
                  }}
                    placeholder="Enter your email address"
                  autoComplete="email"
                  autoFocus
                  disabled={isSubmitting}
                  error={Boolean(fieldErrors.email)}
                  helperText={fieldErrors.email}
                  name="email"
                  onChange={(event) =>
                    setValues((current) => ({ ...current, email: event.target.value }))
                  }
                  type="email"
                  value={values.email}
                />
                </Box>
                <Box>
                  <Typography component="label" htmlFor="subsense-password" sx={{ display: "block", fontWeight: 600, fontSize: 14, mb: 0.75 }}>
                    Password
                  </Typography>
                  <TextField
                    id="subsense-password"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 50,
                      minHeight: 50,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "12px",
                    },
                    "& .MuiOutlinedInput-input": {
                      boxSizing: "border-box",
                      height: "100%",
                      minHeight: 0,
                      padding: "0 14px !important",
                      lineHeight: "normal",
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                      opacity: 1,
                      color: "#64748B",
                    },
                  }}
                    placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  error={Boolean(fieldErrors.password)}
                  helperText={fieldErrors.password}
                  name="password"
                  onChange={(event) =>
                    setValues((current) => ({ ...current, password: event.target.value }))
                  }
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            disabled={isSubmitting}
                            edge="end"
                            onClick={() => setShowPassword((current) => !current)}
                          >
                            {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                />
                </Box>
                <Button
                  type="submit"
                  variant="Primary"
                  size="Large"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{ minHeight: 52 }}
                >
                  {isSubmitting ? (
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <CircularProgress color="inherit" size={18} />
                      <span>Signing in...</span>
                    </Stack>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Stack>
            </Box>
            <Typography color="text.secondary" sx={{ mt: 2.5, textAlign: "center", fontSize: 12 }}>
              Your subscriptions, all in one place.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            minWidth: 0,
            p: { md: 3, lg: 3.5 },
            color: "#FFFFFF",
            background: "linear-gradient(155deg, #0F766E 0%, #115E59 55%, #083F3D 100%)",
          }}
        >
          <Box sx={{ position: "absolute", width: 380, height: 380, right: -170, top: -160, border: "1px solid rgba(255,255,255,.16)", borderRadius: "50%" }} />
          <Box sx={{ position: "absolute", width: 480, height: 480, left: -300, bottom: -300, border: "1px solid rgba(255,255,255,.14)", borderRadius: "50%" }} />

          <Box sx={{ position: "relative" }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
              <AutoAwesomeRoundedIcon sx={{ fontSize: 19 }} />
              <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 700, color: "#CFFAF0" }}>
                SMARTER SUBSCRIPTION TRACKING
              </Typography>
            </Stack>
            <Typography variant="h3" sx={{ maxWidth: 400, fontWeight: 800, fontSize: { md: 32, lg: 38 }, lineHeight: 1.12, mb: 1.5 }}>
              Know what you pay. Save what you can.
            </Typography>
            <Typography sx={{ maxWidth: 370, color: "#DAF5ED", lineHeight: 1.55, fontSize: 14 }}>
              Manage your digital services, see upcoming renewals, and understand your recurring costs at a glance.
            </Typography>
          </Box>

          <Stack spacing={1.5} sx={{ position: "relative", my: 2 }}>
            <Box sx={{ p: 2.5, bgcolor: "rgba(255,255,255,.96)", color: "#0F172A", borderRadius: 3, boxShadow: "0 18px 48px rgba(0,0,0,.13)" }}>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontSize: 13, color: "#64748B", fontWeight: 600 }}>Monthly subscription overview</Typography>
                <AccountBalanceWalletRoundedIcon sx={{ color: "#0F766E" }} />
              </Stack>
              <Typography sx={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.04em" }}>₱1,247.00</Typography>
              <Typography sx={{ color: "#64748B", fontSize: 13 }}>Across 5 active subscriptions</Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Box sx={{ p: 1.5, flex: 1, bgcolor: "rgba(255,255,255,.13)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 3 }}>
                <CalendarMonthRoundedIcon sx={{ mb: 1, color: "#99F6E4" }} />
                <Typography sx={{ fontWeight: 700 }}>Stay prepared</Typography>
                <Typography sx={{ color: "#D7F5EC", fontSize: 12 }}>Upcoming renewals</Typography>
              </Box>
              <Box sx={{ p: 1.5, flex: 1, bgcolor: "rgba(255,255,255,.13)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 3 }}>
                <CheckCircleRoundedIcon sx={{ mb: 1, color: "#99F6E4" }} />
                <Typography sx={{ fontWeight: 700 }}>Stay in control</Typography>
                <Typography sx={{ color: "#D7F5EC", fontSize: 12 }}>Clear spending insights</Typography>
              </Box>
            </Stack>
            <Typography sx={{ color: "#D7F5EC", fontSize: 11, textAlign: "center" }}>
              Preview values are illustrative demo data.
            </Typography>
          </Stack>

          <Typography sx={{ position: "relative", color: "#C4ECE3", fontSize: 12 }}>
            SubSense · Every subscription, under control.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
