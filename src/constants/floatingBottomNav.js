import { ExternalLink, LayoutGrid, Mail, User } from "lucide-react";

export const FLOATING_BOTTOM_NAV_ITEMS = [
  { id: "grid", label: "Work", icon: LayoutGrid, href: "#work" },
  { id: "person", label: "About", icon: User, href: "#about" },
  { id: "mail", label: "Email", icon: Mail, href: "mailto:hello@example.com" },
  {
    id: "external",
    label: "Social",
    icon: ExternalLink,
    href: "https://example.com",
    external: true,
  },
];
