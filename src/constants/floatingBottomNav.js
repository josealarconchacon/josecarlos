import { ExternalLink, LayoutGrid, Mail, User } from "lucide-react";

export const FLOATING_BOTTOM_NAV_ITEMS = [
  { id: "grid", label: "Work", icon: LayoutGrid, panel: "work" },
  { id: "person", label: "About", icon: User, panel: "about" },
  { id: "mail", label: "Email", icon: Mail, panel: "contact" },
  { id: "external", label: "Social", icon: ExternalLink, panel: "social" },
];
