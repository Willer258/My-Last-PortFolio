import { goodPratice, otherskills, skills, tools } from "@/utils/skills";
import React from "react";
import SkillCard from "./SubComponents/SkillCard";

const Skills = () => {
  return (
    <div className=" lg:w-5/6 mx-auto px-2 md:px-5" id="skills">
      <div className="w-full border-b-2 border-black px-2 py-3 mb-10 ">
        <h2 className="text-xl uppercase font-semibold">Mes competences</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
        {skills.map((item, index) => (
         <div key={index}> <SkillCard
         key={index}
         image={item.image}
         title={item.title}
         description={item.description}
         icons={item.subSkills.map((item) => item.icons)}
       /></div>
        ))}

        <SkillCard
          image={tools.image}
          title={tools.title}
          description={tools.description}
          icons={tools.subSkills.map((item) => item.icon)}
        />
        <SkillCard
          image={goodPratice.image}
          title={goodPratice.title}
          description={goodPratice.description}
          icons={goodPratice.subSkills.map((item) => item.icon)}
        />
        <SkillCard
          image={otherskills.image}
          title={otherskills.title}
          description={otherskills.description}
          icons={otherskills.subSkills.map((item) => item.icon)}
        />
      </div>
    </div>
  );
};

export default Skills;
