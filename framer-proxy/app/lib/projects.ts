export type ProjectTone = "kora" | "kyma" | "mugen" | "axiom";

export type Project = {
  id: string;
  title: string;
  category: string;
  href: string;
  image: string;
  /** Soft LaunchFolio-style panel color key */
  tone: ProjectTone;
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
    tone: "kora",
    angle: -8,
  },
  {
    id: "kyma",
    title: "KYMA",
    category: "AI Agency",
    href: "#",
    image: "/card2.png",
    tone: "kyma",
    angle: 4,
  },
  {
    id: "mugen",
    title: "Mugen",
    category: "Design studio",
    href: "#",
    image: "/card3.png",
    tone: "mugen",
    angle: 12,
  },
  {
    id: "axiom",
    title: "Axiom",
    category: "Ecommerce Site",
    href: "#",
    image: "/card1.png",
    tone: "axiom",
    angle: -4,
  },
];
