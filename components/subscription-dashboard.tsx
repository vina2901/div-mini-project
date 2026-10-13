"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Card, Section, Select, Table } from "@dvnnshmr/web-components";
import { SignOutButton } from "@/components/sign-out-button";

type Category = "Entertainment" | "Productivity" | "Cloud Storage";
type Subscription = {
  id: string;
  service: string;
  category: Category;
  amount: number;
  renewal: string;
  status: "Active";
};

const subscriptions: Subscription[] = [
  { id: "netflix", service: "Netflix", category: "Entertainment", amount: 399, renewal: "Oct 15, 2026", status: "Active" },
  { id: "spotify", service: "Spotify", category: "Entertainment", amount: 199, renewal: "Oct 18, 2026", status: "Active" },
  { id: "canva", service: "Canva", category: "Productivity", amount: 349, renewal: "Oct 25, 2026", status: "Active" },
  { id: "icloud", service: "iCloud+", category: "Cloud Storage", amount: 149, renewal: "Nov 2, 2026", status: "Active" },
  { id: "google", service: "Google One", category: "Cloud Storage", amount: 151, renewal: "Nov 8, 2026", status: "Active" },
];

const categoryColors: Record<Category, string> = {
  Entertainment: "#0F766E",
  Productivity: "#3985B9",
  "Cloud Storage": "#A78BFA",
};

const peso = (amount: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

const total = subscriptions.reduce((sum, item) => sum + item.amount, 0);
const categories: Category[] = ["Entertainment", "Productivity", "Cloud Storage"];

function MetricCard({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: ReactNode }) {
  return (
    <Card variant="outlined" size="medium" content={
      <Box sx={{ minHeight: 118, display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
          <Typography sx={{ color: "text.secondary", fontSize: 13, fontWeight: 600 }}>{label}</Typography>
          <Box sx={{ color: "primary.main", bgcolor: "#E7F6F2", borderRadius: 2, p: 0.8, display: "flex" }}>{icon}</Box>
        </Box>
        <Typography sx={{ fontSize: { xs: 25, lg: 29 }, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.2 }}>{value}</Typography>
        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{detail}</Typography>
      </Box>
    } />
  );
}

function Sidebar() {
  const items = [
    { label: "Overview", icon: <DashboardRoundedIcon fontSize="small" />, active: true },
    { label: "My Subscriptions", icon: <SubscriptionsRoundedIcon fontSize="small" /> },
    { label: "Billing Calendar", icon: <CalendarMonthRoundedIcon fontSize="small" /> },
    { label: "Spending Insights", icon: <InsightsRoundedIcon fontSize="small" /> },
    { label: "Settings", icon: <SettingsRoundedIcon fontSize="small" /> },
  ];
  return (
    <Box component="aside" sx={{ width: { md: 230, lg: 250 }, flexShrink: 0, bgcolor: "#FFFFFF", borderRight: { md: "1px solid #E2E8F0" }, p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
        <Box sx={{ width: 40, height: 40, display: "grid", placeItems: "center", borderRadius: 2.5, bgcolor: "primary.main", color: "white" }}><AccountBalanceWalletRoundedIcon /></Box>
        <Box><Typography sx={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2 }}>SubSense</Typography><Typography sx={{ fontSize: 11, color: "text.secondary" }}>Subscription tracker</Typography></Box>
      </Box>
      <Box component="nav" aria-label="Dashboard navigation" sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, gap: 1, overflowX: "auto", pb: { xs: 1, md: 0 } }}>
        {items.map((item) => (
          <Box key={item.label} aria-current={item.active ? "page" : undefined} title={item.active ? item.label : `${item.label} (coming soon)`} sx={{ display: "flex", alignItems: "center", gap: 1.1, px: 1.4, py: 1.35, borderRadius: 2, whiteSpace: "nowrap", bgcolor: item.active ? "#E7F6F2" : "transparent", color: item.active ? "#0F766E" : "#64748B", fontWeight: item.active ? 800 : 500 }}>
            {item.icon}<Typography sx={{ fontSize: 13, fontWeight: "inherit" }}>{item.label}</Typography>
            {!item.active && <Typography component="span" sx={{ fontSize: 9, color: "#94A3B8", ml: "auto", display: { xs: "none", md: "block" } }}>SOON</Typography>}
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: "auto", display: { xs: "none", md: "block" }, p: 2, bgcolor: "#F0FDF9", borderRadius: 3 }}>
        <Typography sx={{ color: "primary.dark", fontSize: 13, fontWeight: 750 }}>You're in control.</Typography>
        <Typography sx={{ mt: 0.7, color: "text.secondary", fontSize: 12 }}>Your subscriptions, organized in one place.</Typography>
      </Box>
    </Box>
  );
}

export function SubscriptionDashboard({ userName }: { userName: string }) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState("service");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const visibleSubscriptions = useMemo(() => {
    const selected = subscriptions.filter((item) => categoryFilter === "all" || item.category === categoryFilter);
    return [...selected].sort((a, b) => {
      const left = a[sortField as keyof Subscription];
      const right = b[sortField as keyof Subscription];
      const order = typeof left === "number" && typeof right === "number" ? left - right : String(left).localeCompare(String(right));
      return sortDirection === "asc" ? order : -order;
    });
  }, [categoryFilter, sortField, sortDirection]);

  const cols = [
    { id: "service", label: "Service", sortable: true, render: (row: Subscription) => <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{row.service}</Typography> },
    { id: "category", label: "Category", sortable: true },
    { id: "amount", label: "Monthly cost", sortable: true, render: (row: Subscription) => <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{peso(row.amount)}</Typography> },
    { id: "renewal", label: "Next renewal", render: (row: Subscription) => row.renewal },
    { id: "status", label: "Status", render: () => <Chip label="Active" size="small" sx={{ bgcolor: "#DCFCE7", color: "#166534", fontWeight: 700 }} /> },
  ];

  return (
    <Box className="subsense-dashboard" sx={{ minHeight: "100dvh", display: "flex", flexDirection: { xs: "column", md: "row" }, bgcolor: "#F8FAFC" }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 1, minWidth: 0, p: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ maxWidth: 1280, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.13em", color: "primary.main", textTransform: "uppercase" }}>Your subscription space</Typography>
              <Typography component="h1" sx={{ fontWeight: 850, fontSize: { xs: 27, sm: 34 }, letterSpacing: "-0.04em", mt: 0.3 }}>Welcome back, {userName}!</Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 14, mt: 0.5 }}>Here's your subscription overview at a glance.</Typography>
            </Box>
            <SignOutButton />
          </Box>
          <Box sx={{ px: 2, py: 1.2, bgcolor: "#ECFDF5", border: "1px solid #BFE9DB", borderRadius: 2 }}>
            <Typography sx={{ fontSize: 12, color: "#116454" }}><strong>Data:</strong> Subscription amounts, renewals and activities below are illustrative, based on an October 12, 2026 snapshot. No live billing connections.</Typography>
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }, gap: 2 }}>
            <MetricCard label="Monthly spending" value={peso(total)} detail="Combined recurring cost" icon={<PaymentsRoundedIcon fontSize="small" />} />
            <MetricCard label="Active plans" value={String(subscriptions.length)} detail="Digital subscriptions" icon={<CreditCardRoundedIcon fontSize="small" />} />
            <MetricCard label="Annual estimate" value={peso(total * 12)} detail="Monthly cost × 12" icon={<TrendingUpRoundedIcon fontSize="small" />} />
            <MetricCard label="Upcoming renewals" value="2" detail="Within 7 days of Oct 12" icon={<EventRepeatRoundedIcon fontSize="small" />} />
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.4fr) minmax(280px, 0.85fr)" }, gap: 2 }}>
            <Section title="Spending breakdown" description="Estimated monthly costs by category" variant="bordered" spacing="large">
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.6 }}>
                {categories.map((category) => {
                  const sum = subscriptions.filter((item) => item.category === category).reduce((a, b) => a + b.amount, 0);
                  return <Box key={category}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 1 }}><Typography sx={{ fontSize: 13, fontWeight: 650 }}>{category}</Typography><Typography sx={{ fontSize: 13, fontWeight: 800 }}>{peso(sum)} <Typography component="span" sx={{ color: "text.secondary", fontSize: 12, fontWeight: 500 }}>({Math.round((sum / total) * 100)}%)</Typography></Typography></Box>
                    <Box sx={{ height: 11, borderRadius: 10, bgcolor: "#E8EEF2", overflow: "hidden" }}><Box sx={{ width: `${(sum / total) * 100}%`, height: "100%", borderRadius: 10, bgcolor: categoryColors[category] }} /></Box>
                  </Box>;
                })}
              </Box>
            </Section>
            <Section title="Upcoming renewals" description="Next payments in your timeline" variant="bordered" spacing="large">
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[subscriptions[0], subscriptions[1]].map((item, index) => <Box key={item.id} sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <Box sx={{ display: "grid", placeItems: "center", bgcolor: "#E7F6F2", borderRadius: 2, width: 46, height: 46, color: "primary.main", flexShrink: 0 }}><CalendarMonthRoundedIcon /></Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}><Typography sx={{ fontWeight: 750, fontSize: 13 }}>{item.service}</Typography><Typography sx={{ fontSize: 12, color: "text.secondary" }}>{item.renewal}</Typography></Box>
                  <Box sx={{ textAlign: "right" }}><Typography sx={{ fontWeight: 800, fontSize: 13 }}>{peso(item.amount)}</Typography><Typography sx={{ fontSize: 11, color: "text.secondary" }}>{index === 0 ? "3 days" : "6 days"}</Typography></Box>
                </Box>)}
              </Box>
            </Section>
          </Box>
          <Section title="My subscriptions" description="All your sample digital services in one view" variant="bordered" spacing="large" actions={<Box sx={{ width: { xs: "100%", sm: 200 } }}><Select label="Filter category" variant="outlined" size="small" options={[{ label: "All categories", value: "all" }, ...categories.map((item) => ({ label: item, value: item }))]} value={categoryFilter} onChange={(event) => setCategoryFilter(String(event.target.value))} fullWidth /></Box>}>
            <Table<Subscription> columns={cols} data={visibleSubscriptions} rowKey={(row) => row.id} variant="default" size="small" state={visibleSubscriptions.length ? "default" : "empty"} emptyMessage="No subscriptions match the chosen category." sortField={sortField} sortDirection={sortDirection} onSort={(field, direction) => { setSortField(field); setSortDirection(direction); }} caption="Illustrative active subscriptions" />
          </Section>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
            <Section title="Recent activity" description="Example subscription updates" variant="bordered" spacing="large">
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.7 }}>
                {[
                  ["Oct 11", "Updated Spotify monthly amount"],
                  ["Oct 9", "Added Canva to the tracker"],
                  ["Oct 2", "Reviewed cloud storage costs"],
                ].map(([date, item], index) => <Box key={date} sx={{ display: "flex", alignItems: "center", gap: 1.3 }}><Box sx={{ color: "primary.main", display: "flex" }}>{index === 0 ? <HistoryRoundedIcon fontSize="small" /> : <NotificationsActiveRoundedIcon fontSize="small" />}</Box><Typography sx={{ fontSize: 13, flex: 1 }}>{item}</Typography><Typography sx={{ fontSize: 12, color: "text.secondary" }}>{date}</Typography></Box>)}
              </Box>
            </Section>
            <Section title="Potential savings" description="A simple way to rethink recurring costs" variant="bordered" spacing="large">
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}><TipsAndUpdatesRoundedIcon sx={{ color: "primary.main", mt: 0.5 }} /><Box><Typography sx={{ fontSize: 25, fontWeight: 850, letterSpacing: "-0.04em", color: "primary.main" }}>{peso(349 * 12)}/year</Typography><Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.6 }}>If you decide to discontinue a {peso(349)}/month plan you no longer use, you could save this amount annually.</Typography></Box></Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}><ArrowForwardRoundedIcon sx={{ fontSize: 16 }} /><Typography sx={{ fontSize: 12 }}>Illustrative scenario, not a cancellation action.</Typography></Box>
            </Section>
          </Box>
          <Typography component="footer" sx={{ fontSize: 12, color: "text.secondary", pb: 1 }}>SubSense · Personal Subscription Tracker</Typography>
        </Box>
      </Box>
    </Box>
  );
}
