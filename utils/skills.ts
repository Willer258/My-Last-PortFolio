interface Itools {
  name: string;
  type: string;
}

interface IListSubskill {
  framework: string;
  language: string;
  description: string;
  icons: string;
  year: number;
  tools: Itools[];
}

interface ISkill {
  title: string;
  image?: string;
  description: string;
  subSkills: IListSubskill[];
}

export const skills: ISkill[] = [
  {
    title: "En devellopement web ",
    description: "Conception d'application et site web ",
    image: "https://cdn-icons-png.flaticon.com/512/1329/1329016.png",
    subSkills: [
      {
        framework: "React",
        language: "JavaScript",
        icons: "https://cdn-icons-png.flaticon.com/512/1260/1260667.png",
        description: "",
        year: 2,
        tools: [
          {
            name: "Tailwind",
            type: "Librairie de classe CSS",
          },
          {
            name: "Bootstrap",
            type: "Librairie de classe et composants CSS ",
          },
          {
            name: "Ant-design",
            type: "Librairie composants ",
          },
          {
            name: "react-router",
            type: "Librairie de route pour react ",
          },
          {
            name: "Redux",
            type: "Librairie de route pour react ",
          },
          {
            name: "Framer-motion",
            type: "Librairie d'animation",
          },
          {
            name: "Jest/Cypress/React test library",
            type: "Librairie de tests",
          },
        ],
      },
      {
        framework: "Nextjs",
        language: "JavaScript",
        description: "",
        icons:
          "https://cdn1.iconfinder.com/data/icons/akar-vol-1/24/nextjs-fill-256.png",
        year: 2,
        tools: [
          {
            name: "Tailwind",
            type: "Librairie de classe CSS",
          },
          {
            name: "Bootstrap",
            type: "Librairie de classe et composants CSS ",
          },
          {
            name: "Ant-design",
            type: "Librairie composants ",
          },
          {
            name: "Redux",
            type: "Librairie de route pour react ",
          },
          {
            name: "Framer-motion",
            type: "Librairie d'animation",
          },
          {
            name: "Jest/Cypress",
            type: "Librairie de tests",
          },
        ],
      },
    ],
  },

  {
    title: "En devellopement mobile ",
    description: "Conception d'application mobile",
    image: "https://cdn-icons-png.flaticon.com/512/1875/1875043.png",
    subSkills: [
      {
        framework: "Flutter",
        language: "Dart",
        icons:
          "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/flutter-256.png",
        description: "",
        year: 1,
        tools: [
          {
            name: "GetX",
            type: "Gestionnaire d'état",
          },
          {
            name: "http",
            type: "Requettes HTTP",
          },
          {
            name: "Autres...",
            type: "Librairie composants ",
          },
        ],
      },
    ],
  },
];

export const otherskills = {
  title: "Autres chapeau",
  image: "https://cdn-icons-png.flaticon.com/512/3080/3080419.png",
  description: "Autres competence de production utiles pour les metiers du web",
  subSkills: [
    {
      title: "Devellopeur WordPress",
      description: "",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174881.png",
    },
    {
      title: "Scrum master",
      description: "",
      icon: "https://cdn-icons-png.flaticon.com/512/6867/6867246.png",
    },
  ],
};

export const tools = {
  title: "collaboration et production",
  description: "",
  image: "https://cdn-icons-png.flaticon.com/512/2646/2646168.png",
  subSkills: [
    {
      title: "Git,Github & Gitlab",
      description: "",
      icon: "https://cdn1.iconfinder.com/data/icons/bootstrap-fill-vol-2/16/git-512.png",
    },
    {
      title: "Vercel ,Netlify & Heroku",
      description: "",
      icon: "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/netlify-512.png",
    },
    {
      title: "Figma & Adobe XD",
      description: "",
      icon: "https://cdn3.iconfinder.com/data/icons/feather-5/24/figma-512.png",
    },
    {
      title: "Docker",
      description: "",
      icon: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png",
    },
    {
      title: "localtunnel",
      description: "",
      icon: "https://avatars.githubusercontent.com/u/13612933?s=280&v=4",
    },
  ],
};

export const goodPratice = {
  title: "En bonne Pratique",
  description: "",
  image: "https://cdn-icons-png.flaticon.com/512/857/857938.png",
  subSkills: [
    {
      title: "Responsive design",
      icon: "https://cdn1.iconfinder.com/data/icons/web-development-round/128/25-512.png",
      description: "",
    },

    {
      title: "Clean code",
      icon: "https://cdn4.iconfinder.com/data/icons/modern-technologies-1/32/technology_coding_clean_code_laptop_diamond-512.png",
      description: "",
    },
    {
      title: "Testing",
      icon: "https://cdn3.iconfinder.com/data/icons/network-and-communications-8/32/network_TDD_testing-512.png",
      description: "",
    },
    {
      title: "SEO",
      icon: "https://cdn2.iconfinder.com/data/icons/artificial-intelligence-52/48/bl_1645_Search_seo_magnifier_earth_globe_internet-512.png",
      description: "",
    },
  ],
};
