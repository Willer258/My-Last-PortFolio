/* eslint-disable react/no-unescaped-entities */
import CursorComponent from "@/components/Shared/CursorComponent";
import LoadingAnimatePage from "@/components/Shared/LoadingAnimatePage";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Contacts from "../components/SectionsComponents/Contacts";
import HomeSection from "../components/SectionsComponents/HomeSection";
import Profil from "../components/SectionsComponents/Profil";
import Skills from "../components/SectionsComponents/Skills";
import Works from "../components/SectionsComponents/Works";
import { showProverbs } from "@/utils/atomes";
import { useRecoilState } from "recoil";
import { TypingAnimation } from "@/components/Shared/TyperText";
const Home: NextPage = () => {
  const [showText] = useRecoilState(showProverbs);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-black flex justify-center items-center text-white lg:hidden">
        <motion.span animate={{ fontSize: "35px" }} className="text-center">
          <TypingAnimation text=" Le mode mobile n'est pas encore pret essaie sur PC Désolé" />
        </motion.span>
      </div>
      <div className="space-y-10 hidden overflow-hidden lg:block">
        {showText ? (
       
         
              <LoadingAnimatePage />
         
      
        ) : (
          <div className="space-y-20">
            <CursorComponent />
            <div id="hero-section">
              <HomeSection />
            </div>

            <Profil />
            <Works />
            <Skills />
            <Contacts />
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Home;
