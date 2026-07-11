export interface IProject {
  title: string;
  description: string;
  stack: string[];
  type: "web" | "mobile" | "design" | "fullstack";
  company?: string;
  link?: string;
  screenshots?: string[];
  /** Démo vidéo (~15 s, muette) de la manipulation réelle du projet — public/projects/demos/ */
  video?: string;
  featured?: boolean;
  // Case-study content (filled from i18n projects.items[i])
  problem?: string;
  solution?: string;
  role?: string;
  features?: string[];
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
    video: "/projects/demos/pockii.mp4",
    screenshots: [
      "/projects/pockii-1.png",
      "/projects/pockii-2.png",
    ],
  },
  {
    stack: ["Next.js", "PHP", "Symfony", "MySQL"],
    type: "fullstack",
    featured: true,
    video: "/projects/demos/crm.mp4",
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
    featured: true,
    video: "/projects/demos/pixeasy.mp4",
    screenshots: [
      "/projects/pixeasy-1.png",
      "/projects/pixeasy-2.png",
      "/projects/pixeasy-3.png",
      "/projects/pixeasy-4.png",
      "/projects/pixeasy-5.png",
    ],
  },
  {
    stack: ["Next.js", "Framer Motion", "Tailwind"],
    type: "web",
    company: "WiASSUR",
    link: "https://wiassur.com/ci",
    video: "/projects/demos/wiassur.mp4",
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
    video: "/projects/demos/magma.mp4",
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
    video: "/projects/demos/comparateur.mp4",
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
    video: "/projects/demos/kizuna.mp4",
    screenshots: [
      "/projects/kizuna-1.png",
      "/projects/kizuna-2.png",
      "/projects/kizuna-3.png",
      "/projects/kizuna-4.png",
      "/projects/kizuna-5.png",
    ],
  },
];
