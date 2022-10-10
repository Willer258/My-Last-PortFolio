/* eslint-disable react/no-unescaped-entities */
import { works } from "@/utils/works";
import React from "react";
import Work from "./SubComponents/Work";

const Works = () => {
  return (
    <div id="works" className="lg:h-screen  lg:w-5/6 mx-auto px-2 md:px-5">
      <div className="w-full border-b-2 border-black px-2 py-3 ">
        {" "}
        <h2 className="text-xl uppercase font-semibold">
          Mes travaux et parcours
        </h2>
      </div>
      <div className="space-y-16  flex flex-col justify-center  h-full">
        {works.map((work, index) => (
          <Work
            date={work.date}
            entreprise={work.entreprise}
            fonction={work.fonction}
            tasks={work.tasks}
            description={work.description}
            key={index}
          />
        ))}
        {/* <div className="flex flex-col space-y-5 items-end md:items-start md:text-left">
          <div className="flex lg:items-center w-full justify-between flex-col-reverse space-y-3 md:space-y-0 md:flex-row">
            <span>
              FONCTION:{" "}
              <span className="font-semibold">Devellopeur Frontend</span>
            </span>
            <h3 className="md:border-b   text-right font-medium border-black underline md:no-underline md:self-end inline md:pb-1 md:pr-3">
              ADGroupe <br className="md:hidden " /> (Mars 2021 et toujours
              present )
            </h3>
          </div>

          <p>
            Responsable du département des développeurs Frontend j’ai pour
            mission de diriger la construction des application clientes et sites
            web dont l’entreprise a la charge. En 2021 j’ai eu la chance
            d’intégrer une équipe pleine de vivacité d’entrain et de créativité,
            j’ai nommé ADGroupe, après plusieurs défis dont on a été confronté
            j’ai pu apprendre autant que possible et de cette opportunité reçue
            je m’adonne au développement et au grandissement de l’entreprise en
            retour.
          </p>

          <div className="w-full">
            <h3 className="uppercase font-semibold">Travail Effectué</h3>
            <ul className="font-semibold ">
              <li>- Collaboration a la conception du site de l'entreprise.</li>
              <li>
                - Collaboration et supervisation de l'equipe frontend pour une
                application de gestion notarial.
              </li>
              <li>
                - Collaboration pour la conception d'une application pour la
                visite medicale.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col space-y-5 items-end md:items-start md:text-left">
          <div className="flex lg:items-center w-full justify-between flex-col-reverse space-y-3 md:flex-row">
            <span>
              FONCTION:{" "}
              <span className="font-semibold">Devellopeur Web Stagiaire</span>
            </span>
            <h3 className="md:border-b   text-right font-medium border-black underline md:no-underline md:self-end inline md:pb-1 md:pr-3">
              Allo Docteur PC <br className="md:hidden " /> (JUIL. 2020 - OCT.
              2020 )
            </h3>
          </div>

          <p>
            Responsable du département des développeurs Frontend j’ai pour
            mission de diriger la construction des application clientes et sites
            web dont l’entreprise a la charge. En 2021 j’ai eu la chance
            d’intégrer une équipe pleine de vivacité d’entrain et de créativité,
            j’ai nommé ADGroupe, après plusieurs défis dont on a été confronté
            j’ai pu apprendre autant que possible et de cette opportunité reçue
            je m’adonne au développement et au grandissement de l’entreprise en
            retour.
          </p>

          <div className="w-full">
            <h3 className="uppercase font-semibold">Travail Effectué</h3>
            <ul className="font-semibold ">
              <li>- Collaboration a la conception du site de l'entreprise.</li>
              <li>
                - Collaboration et supervisation de l'equipe frontend pour une
                application de gestion notarial.
              </li>
              <li>
                - Collaboration pour la conception d'une application pour la
                visite medicale.
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Works;
