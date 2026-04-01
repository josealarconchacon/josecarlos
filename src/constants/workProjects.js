import dailyInventoryProjectImg from "../assets/daily-inventory-project.png";
import oxalateProjectImg from "../assets/oxalate-project.png";

export const WORK_PROJECTS = [
  {
    id: "oxalate-info",
    eyebrow: "Featured project",
    title: "Oxalate Info",
    description:
      "Oxalates are naturally occurring compounds in many plant-based foods—and sometimes produced in the body. In excess, they are most linked to kidney stones, but sensitive individuals may experience other issues. This app helps people search foods, review oxalate levels, and make clearer dietary choices.",
    tech: "Angular · TypeScript · Firebase",
    image: {
      src: oxalateProjectImg,
      alt: "Oxalate Info — search results UI showing flour-related foods and oxalate levels",
    },
    features: [],
    links: {
      repo: "https://github.com/josealarconchacon/oxalates",
      live: "https://oxalate.info/",
      liveLabel: "Live site",
    },
  },
  {
    id: "daily-inventory",
    eyebrow: "Project",
    title: "Daily Inventory",
    description:
      "Simple internal web app for Oyster Party catering teams to track beginning and end-of-day inventory and export a PDF report.",
    tech: "JavaScript · Tailwind CSS · Vite · IndexedDB",
    image: {
      src: dailyInventoryProjectImg,
      alt: "Daily Inventory — Oyster Party dashboard with start/end-of-day counts, product totals, and PDF download",
    },
    features: [
      "Start of Day and End of Day sections with clear inputs and optional notes",
      "Automatic product totals (sold counts, cash, etc.)",
      "Export to PDF in one click",
      "Auto-save in the browser (IndexedDB with localStorage fallback)",
      "Data survives reloads and full close/reopen",
      "Data is cleared only after a successful PDF export",
      "Light/Dark theme toggle (default is Light)",
    ],
    links: {
      repo: "https://github.com/josealarconchacon/inventory-sheet",
      live: "https://inventory-sheet.vercel.app/",
      liveLabel: "Live site",
    },
  },
];
