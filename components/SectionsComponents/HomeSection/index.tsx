/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Button from "../../Shared/Button";

function HomeSection() {
  return (
    <div id="home" className="h-screen lg:w-3/4 mx-auto px-2 md:px-5">
      
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
            I'm a software developer based in Buenos Aires AR, specializing in
            building exceptional websites and mobile applications, and
            everything in between.
          </p>

          <Button type="outlined">Prendre contact</Button>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
