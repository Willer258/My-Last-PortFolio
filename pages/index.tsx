import type { NextPage } from "next";
import Contacts from "../components/SectionsComponents/Contacts";
import HomeSection from "../components/SectionsComponents/HomeSection";
import Profil from "../components/SectionsComponents/Profil";
import Skills from "../components/SectionsComponents/Skills";
import Works from "../components/SectionsComponents/Works";
const Home: NextPage = () => {
  return (
    <div className="space-y-10">
      <HomeSection />
      <Profil />
      <Works />
      <Skills />
      <Contacts />
    </div>
  );
};

export default Home;
