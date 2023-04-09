
import { atom } from "recoil";
export const cursorState = atom({
    key: "cursor", // unique ID (with respect to other atoms/selectors)
    default: "default", // valeur par défaut (alias valeur initials)
  });


  export const  showProverbs = atom({
    key:'proverbs',
    default: true,
  })