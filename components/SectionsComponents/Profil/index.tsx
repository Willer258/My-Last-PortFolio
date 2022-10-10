/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import ImageProfile from "@/assets/willpic.jpg";
const Profil = () => {
  return (
    <div id="profil" className="lg:h-screen lg:w-5/6 mx-auto px-2 md:px-5">
      <div className="w-full border-b-2 border-black px-2 py-3 ">
        {" "}
        <h2 className="text-xl uppercase font-semibold"> A propos de moi</h2>
      </div>
      <div className="flex flex-col h-full justify-center">
        <div className="flex flex-col font-medium lg:flex-row space-y-5 items-center lg:space-x-10  ">
          <div className="space-y-3 lg:w-3/4 self-center">
            <p>
              Bonjour, Houinlindjonon Alain Wilfried développeur frontend a
              votre service.
            </p>
            <p>
              M'affirmer développeur et au niveau frontal m'incombe de respecter
              certains critères dont la conception, l'optimisation,
              l'amélioration et la maintenance de sites ou application (web ou
              mobile) de qualité tout en permettant la mécanique (API) destiné à
              ces derniers de fonctionner. J’en suis sûr au vu de tous mes
              challenges effectuer pendant mes travaux de respecter tous ces
              critères sans inconvénient.
            </p>
            <p>
              Résident du pays de Côte d'Ivoire spécifiquement à Abidjan, Je
              serais en mesure de vous offrir une plateforme agréable, simple et
              optimisée tout en tenant compte de vos exigences, qu’vienne de mon
              pays ou de n'importe où dans le monde.
            </p>
          </div>

          <div className="object-cover hover:shadow-md  duration-200 overflow-hidden w-3/4 lg:w-3/5 xl:w-2/6 relative radius">
            <img
              src={ImageProfile.src}
              alt="Houinlindjonon Alain Wilfried"
              className="w-full h-full"
            />
            {/* <div className="image-animation w-[120%] bg-black h-[120%] border"></div> */}
          </div>
        </div>
        <div className="w-full hidden mt-10 gap-x-14 lg:grid grid-cols-2">
          <div className="flex flex-col radius overflow-hidden border border-black">
            <div className="bg-black px-5 text-white py-3">
              <span className="font-semibold">FORMATION</span>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                <li className="flex flex-col space-y-2">
                  <span className="font-semibold text-lg">
                    Bachelor en architecture logiciel{" "}
                  </span>
                  <span>
                    Obtenu de l'ESGI (Ecole superieur de genie informatique) en
                    2020
                  </span>
                </li>
                <li className="flex flex-col space-y-2">
                  <span className="font-semibold text-lg">BAC D</span>
                  <span>Obtenu en 2017</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col radius overflow-hidden border border-black">
            <div className="bg-black px-5 text-white py-3">
              <span className="font-semibold">QUALITES</span>
            </div>
            <div className="px-10 py-5">
              <ul className="list-disc">
                <li>Collaboratif</li>
                <li>Pédagogue</li>
                <li>Curieux</li>
                <li>Créatif</li>
                <li>Respectueux</li>
                <li>Discipliné</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
