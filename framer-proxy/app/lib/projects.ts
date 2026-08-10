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

/** Order = pile front → back (index 0 is most in front) */
export const PROJECTS: Project[] = [
  {
    id: "workpunkt",
    title: "Workpunkt",
    category: "Admissions Platform",
    href: "https://workpunkt.com",
    image: "/project-workpunkt.jpg",
    tone: "mugen",
    angle: -8,
  },
  {
    id: "daiorus",
    title: "Daiorus",
    category: "Jewellery Ecommerce",
    href: "https://daiorus.com",
    image: "/project-daiorus.jpg",
    tone: "kora",
    angle: 4,
  },
  {
    id: "indika",
    title: "House of Indika",
    category: "Artisan Brand",
    href: "https://houseofindika.com",
    image: "/project-indika.jpg",
    tone: "kyma",
    angle: 12,
  },
  {
    id: "silver-looms",
    title: "Silver Looms",
    category: "Ecommerce Site",
    href: "https://silverlooms.in",
    image: "/card1.png",
    tone: "axiom",
    angle: -4,
  },
];
