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
  },
  {
    stack: ["Next.js", "PHP", "Symfony", "MySQL"],
    type: "fullstack",
    featured: true,
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
];
