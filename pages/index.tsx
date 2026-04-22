import CursorComponent from "@/components/Shared/CursorComponent";
import LoadingAnimatePage from "@/components/Shared/LoadingAnimatePage";
import type { NextPage } from "next";
import Contacts from "../components/SectionsComponents/Contacts";
import HomeSection from "../components/SectionsComponents/HomeSection";
import Profil from "../components/SectionsComponents/Profil";
import Projects from "../components/SectionsComponents/Projects";
import Skills from "../components/SectionsComponents/Skills";
import Works from "../components/SectionsComponents/Works";
import { showProverbs } from "@/utils/atomes";
import { useRecoilState } from "recoil";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

const Home: NextPage = () => {
  const [showText] = useRecoilState(showProverbs);

  return (
    <>
      {showText && <LoadingAnimatePage />}

      <div>
        <CursorComponent />
        <HomeSection />
        <Profil />
        <Projects />
        <Works />
        <Skills />
        <Contacts />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
  };
};

export default Home;
