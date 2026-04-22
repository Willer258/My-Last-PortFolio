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

export const projects: IProject[] = [
  // === Featured ===
  {
    title: "Plateforme E-commerce",
    description: "Plateforme e-commerce complète avec backoffice admin, chatbot IA, paiements mobile money (Orange/Wave), architecture monorepo et API REST.",
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
    title: "Pockii",
    description: "Application mobile de gestion de budget en FCFA. Base de données locale chiffrée, interface en français, suivi des entrées/sorties et vision financière long terme.",
    stack: ["Flutter", "Dart", "Drift", "Riverpod"],
    type: "mobile",
    featured: true,
  },
  {
    title: "CRM Modulaire",
    description: "Outil de gestion client inspiré de Pipedrive. Pipeline commercial, suivi des prospects, tâches, rappels et fiches clients complètes.",
    stack: ["Next.js", "PHP", "Symfony", "MySQL"],
    type: "fullstack",
    featured: true,
  },
  {
    title: "Assistant événementiel",
    description: "Outil intelligent pour événements. Accueil participants via QR code, chronologie, jeux interactifs, avis utilisateurs et panneau admin de configuration.",
    stack: ["Next.js", "Firebase", "Framer Motion"],
    type: "web",
    featured: true,
    screenshots: [
      "/projects/ylc-1.png",
      "/projects/ylc-2.png",
    ],
  },

  // === Petites cartes (masonry) ===
  {
    title: "ImmoFacile",
    description: "Solution de gestion locative en Côte d'Ivoire. App propriétaire, app locataire, paiements mobile money, notifications WhatsApp, gestion loyers et contrats.",
    stack: ["Flutter", "Node.js", "PostgreSQL"],
    type: "fullstack",
  },
  {
    title: "Site web WiASSUR",
    description: "Site vitrine de la compagnie d'assurance. Interface moderne avec animations et formulaires de souscription.",
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
    title: "Application Fintech",
    description: "Application mobile cross-platform pour une fintech. Gestion de paiements, notifications et interface utilisateur fluide.",
    stack: ["Flutter", "Dart", "Firebase"],
    type: "mobile",
    company: "Magma-tech",
  },
  {
    title: "Site web Magma",
    description: "Site vitrine et plateforme web de la fintech. Présentation des services de transfert d'argent et de paiement.",
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
    title: "Site web ADGroupe",
    description: "Site vitrine de l'entreprise de services numériques.",
    stack: ["React", "CSS", "JavaScript"],
    type: "web",
    company: "ADGroupe",
  },
  {
    title: "Comparateur d'assurances",
    description: "Plateforme de comparaison d'offres d'assurance. Filtres par catégorie (Auto, Santé, Voyage, Habitation) et résultats en temps réel.",
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
    title: "Plateforme gestion d'église",
    description: "Plateforme web pour la gestion des membres, événements et finances d'une communauté religieuse.",
    stack: ["Next.js", "PHP", "Symfony", "MySQL"],
    type: "fullstack",
  },
];
