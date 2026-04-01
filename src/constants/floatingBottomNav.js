import { FileDown, LayoutGrid, MessageCircle, User } from "lucide-react";

export const FLOATING_BOTTOM_NAV_ITEMS = [
  { id: "grid", label: "Work", icon: LayoutGrid, panel: "work" },
  { id: "person", label: "About", icon: User, panel: "about" },
  { id: "mail", label: "Contact", icon: MessageCircle, panel: "contact" },
  { id: "resume", label: "Resume", icon: FileDown, panel: "resume" },
];
