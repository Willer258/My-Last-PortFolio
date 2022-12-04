import CursorComponent from "@/components/Shared/CursorComponent";
import LoadingAnimatePage from "@/components/Shared/LoadingAnimatePage";
import { AnimatePresence } from "framer-motion";
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
    }, 3000);
  }, []);

  return (
    <div className="space-y-10">
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
  );
};

export default Home;
