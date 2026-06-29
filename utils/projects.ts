export interface IProject {
  title: string;
  description: string;
  stack: string[];
  type: "web" | "mobile" | "design" | "fullstack";
  company?: string;
  link?: string;
  screenshots?: string[];
  featured?: boolean;
}

export const projects: Omit<IProject, "title" | "description">[] = [
  // === Featured ===
  {
    stack: ["Next.js", "Symfony", "PostgreSQL", "Docker", "Turborepo"],
    type: "fullstack",
    featured: true,
    screenshots: [
      "/projects/ecommerce-1.png",
      "/projects/ecommerce-2.png",
      "/projects/ecommerce-3.png",
      "/projects/ecommerce-backoffice.png",
    ],
  },
  {
    stack: ["Flutter", "Dart", "Drift", "Riverpod"],
    type: "mobile",
    featured: true,
    screenshots: [
      "/projects/pockii-1.png",
      "/projects/pockii-2.png",
    ],
  },
  {
    stack: ["Next.js", "PHP", "Symfony", "MySQL"],
    type: "fullstack",
    featured: true,
    screenshots: [
      "/projects/crm-1.png",
      "/projects/crm-2.png",
    ],
  },
  {
    stack: ["Next.js", "Firebase", "Framer Motion"],
    type: "web",
    featured: true,
    screenshots: [
      "/projects/ylc-1.png",
      "/projects/ylc-2.png",
    ],
  },

  // === Small cards (masonry) ===
  {
    stack: ["Flutter", "Node.js", "PostgreSQL"],
    type: "fullstack",
    screenshots: [
      "/projects/pixeasy-1.png",
      "/projects/pixeasy-2.png",
      "/projects/pixeasy-3.png",
    ],
  },
  {
    stack: ["Next.js", "Framer Motion", "Tailwind"],
    type: "web",
    company: "WiASSUR",
    link: "https://wiassur.com/ci",
    screenshots: [
      "/projects/wiassur-1.png",
      "/projects/wiassur-2.png",
      "/projects/wiassur-3.png",
    ],
  },
  {
    stack: ["Flutter", "Dart", "Firebase"],
    type: "mobile",
    company: "Magma-tech",
  },
  {
    stack: ["React", "TypeScript", "Tailwind"],
    type: "web",
    company: "Magma-tech",
    link: "https://magmasend.com",
    screenshots: [
      "/projects/magmasend-1.png",
      "/projects/magmasend-2.png",
      "/projects/magmasend-3.png",
    ],
  },
  {
    stack: ["React", "CSS", "JavaScript"],
    type: "web",
    company: "ADGroupe",
  },
  {
    stack: ["Vue.js", "REST API"],
    type: "web",
    company: "WiASSUR",
    link: "https://comparer.wia.ci",
    screenshots: [
      "/projects/comparateur-1.png",
      "/projects/comparateur-2.png",
    ],
  },
  {
    stack: ["Next.js", "PHP", "Symfony", "MySQL"],
    type: "fullstack",
  },

  // === Kizuna Pay (cagnottes en ligne, Mobile Money via JoonaPay) ===
  {
    stack: ["Next.js", "Symfony", "MySQL", "PWA"],
    type: "fullstack",
    featured: true,
    screenshots: [
      "/projects/kizuna-1.png",
      "/projects/kizuna-2.png",
      "/projects/kizuna-3.png",
    ],
  },
];
