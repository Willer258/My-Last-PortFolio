
import { atom, RecoilEnv } from "recoil";

// Next.js ré-évalue ce module en dev (HMR) et en SSR : Recoil verrait alors les
// mêmes clés s'enregistrer deux fois et loguerait "Duplicate atom key" à chaque
// requête. Ce garde-fou ne protège que contre de vrais doublons de clés — inutile ici.
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const cursorState = atom({
    key: "cursor", // unique ID (with respect to other atoms/selectors)
    default: "default", // valeur par défaut (alias valeur initials)
  });


  export const  showProverbs = atom({
    key:'proverbs',
    default: true,
  })