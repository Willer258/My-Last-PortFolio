/* eslint-disable react/no-unescaped-entities */
import { works } from "@/utils/works";
import React from "react";
import Work from "./SubComponents/Work";
import { BandeTexteAnimation } from "@/components/Shared/TyperText";

const Works = () => {
  return (
    <div
      id="works"
      className="lg:min-h-screen mt-56 lg:w-5/6 mx-auto px-2 md:px-5"
    >
      <div className="flex mb-40">
      <BandeTexteAnimation
        className="text-4xl font-bold"
        text="MON PARCOUR PRO"
      />
      </div>
     
      
      <div className=" space-y-20  flex flex-col justify-center w-full h-full">
        {works.map((work, index) => (
          <Work
            index={index}
            date={work.date}
            entreprise={work.entreprise}
            fonction={work.fonction}
            tasks={work.tasks}
            description={work.description}
            key={index}
          />
        ))}
       
      </div>
    </div>
  );
};

export default Works;
