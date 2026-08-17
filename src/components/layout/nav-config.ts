import {
  Activity,
  Bot,
  Brain,
  Building2,
  Gauge,
  History,
  Map as MapIcon,
  PlayCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  Zap,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: typeof Gauge;
}

export const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Intelligence",
    items: [
      { to: "/dashboard", label: "Command Center", icon: Gauge },
      { to: "/predictions", label: "Predictions", icon: Sparkles },
      { to: "/agents", label: "AI Agents", icon: Bot },
      { to: "/actions", label: "Action Center", icon: Zap },
    ],
  },
  {
    title: "Context",
    items: [
      { to: "/twin", label: "Digital Twin", icon: UserCircle2 },
      { to: "/map", label: "Environment Map", icon: MapIcon },
      { to: "/city", label: "City Intelligence", icon: Building2 },
      { to: "/memory", label: "LIFEOS Memory", icon: Brain },
    ],
  },
  {
    title: "Evidence",
    items: [
      { to: "/history", label: "Prediction History", icon: History },
      { to: "/analytics", label: "Analytics", icon: Activity },
      { to: "/demo", label: "Investor Demo", icon: PlayCircle },
    ],
  },
  {
    title: "Control",
    items: [
      { to: "/privacy", label: "Privacy Center", icon: ShieldCheck },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export const MOBILE_NAV: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: Gauge },
  { to: "/predictions", label: "Predict", icon: Sparkles },
  { to: "/map", label: "Map", icon: MapIcon },
  { to: "/actions", label: "Actions", icon: Zap },
  { to: "/settings", label: "Profile", icon: UserCircle2 },
];
