interface Ilinks {
  link: string;
  icon: string;
  label: string;
}

export const links: Ilinks[] = [
  {
    link: "/",
    icon: "fa-house",
    label: "Accueil",
  },
  {
    link: "#profil",
    icon: "fa-user",
    label: "A propos de moi",
  },
  {
    link: "#works",
    icon: "fa-briefcase ",
    label: "Realisations",
  },
  {
    link: "#skills",
    icon: "fa-code",
    label: "Services",
  },

  {
    link: "#contact",
    icon: "fa-phone",
    label: "Me contacter",
  },
];
