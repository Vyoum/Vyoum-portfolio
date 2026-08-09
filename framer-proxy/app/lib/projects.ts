export type Project = {
  id: string;
  title: string;
  category: string;
  href: string;
  image: string;
  /** Soft LaunchFolio-style panel color */
  tone: string;
  /** Starting pile rotation in degrees */
  angle: number;
};

export const PROJECTS: Project[] = [
  {
    id: "kora",
    title: "Kora",
    category: "Consulting Site",
    href: "#",
    image: "/card1.png",
    tone: "bg-[#c6f45b]",
    angle: -8,
  },
  {
    id: "kyma",
    title: "KYMA",
    category: "AI Agency",
    href: "#",
    image: "/card2.png",
    tone: "bg-[#b6a9ff]",
    angle: 4,
  },
  {
    id: "mugen",
    title: "Mugen",
    category: "Design studio",
    href: "#",
    image: "/card3.png",
    tone: "bg-[#ff806d]",
    angle: 12,
  },
  {
    id: "axiom",
    title: "Axiom",
    category: "Ecommerce Site",
    href: "#",
    image: "/card1.png",
    tone: "bg-[#8cd8ff]",
    angle: -4,
  },
];
