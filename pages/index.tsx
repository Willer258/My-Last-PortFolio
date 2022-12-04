/* eslint-disable react/no-unescaped-entities */
import CursorComponent from "@/components/Shared/CursorComponent";
import LoadingAnimatePage from "@/components/Shared/LoadingAnimatePage";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Contacts from "../components/SectionsComponents/Contacts";
import HomeSection from "../components/SectionsComponents/HomeSection";
import Profil from "../components/SectionsComponents/Profil";
import Skills from "../components/SectionsComponents/Skills";
import Works from "../components/SectionsComponents/Works";
const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4400);
  }, []);

  return (
    <>
      <div className="h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-black flex justify-center items-center text-white lg:hidden">
        <motion.span animate={{ fontSize: "35px" }} className="text-center">
          Le mode mobile n'est pas encore pret essaie sur PC <br /> <br />{" "}
          <br />
          Désolé
        </motion.span>
      </div>
      <div className="space-y-10 hidden lg:block">
        <AnimatePresence exitBeforeEnter>
          {loading ? <LoadingAnimatePage /> : null}
        </AnimatePresence>
        <CursorComponent />
        <HomeSection />
        <Profil />
        <Works />
        <Skills />
        <Contacts />
      </div>
    </>
  );
};

export default Home;
