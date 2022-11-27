/* eslint-disable react/no-unescaped-entities */
import Logo from "@/components/Shared/Logo";
import React from "react";
import Button from "../../Shared/Button";

function HomeSection() {
  return (
    <div id="home" className="h-screen lg:w-3/4 mx-auto px-2 md:px-5">
      <a
        href="https://firebasestorage.googleapis.com/v0/b/mon-portfolio-7cb39.appspot.com/o/cv.pdf?alt=media&token=35322b94-a4e4-4416-b035-aa4e836f786f"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Logo className="w-32 h-32" />
        <Button className="fixed top-5 right-5 uppercase border border-white">
          Télécharger mon CV
        </Button>
      </a>

      <div className="flex justify-start h-full w-full items-center">
        <div className="space-y-5 md:space-y-8">
          <h3 className="italic font-light text-lg ">Salut !!! </h3>
          <h1 className="text-3xl md:text-5xl lg:text-6xl">
            Wilfried Houinlindjonon
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold ">
            Concepteur de site web, d'appli web et mobile.
          </h2>
          <p className="lg:text-lg w-5/6">
            Je suis un développeur basé à Abidjan CI, spécialisé dans la
            construction de sites Web d'exception, applications mobiles, et tout
            le reste.
          </p>

          <div className="flex space-x-3">
            <a href="mailto:wilfriedhouinlindjonon91@gmail.com">
              <Button type="outlined">Prendre contact</Button>
            </a>
            <a
              href="https://firebasestorage.googleapis.com/v0/b/mon-portfolio-7cb39.appspot.com/o/cv.pdf?alt=media&token=35322b94-a4e4-4416-b035-aa4e836f786f"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="  border ">
                Télécharger mon CV
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
