import FontAwesomeIcon from "@/components/SpecialComponent/FontAwesomeIcon";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

function SkillsMobile({ skills }: any) {
  const [screenSelected, setScreenSelected]: any = useState();

  return (
    <div className="flex flex-col w-full mt-10 overflow-hidden rounded-xl">
      {skills.map((skill: any, index: number) => (
        <div key={index}>
          <Link  href={`#skills${index}`}>
            <div
              onClick={() =>
                setScreenSelected(index == screenSelected ? undefined : index)
              }
              className=" pl-3 py-5 uppercase flex justify-between px-3 items-center text-lg md:text-2xl border-b bg-black text-white font-semibold border-white"
            >
              <span>{skill.name}</span>

              <FontAwesomeIcon
                icon={screenSelected == index ? "fa-caret-up" : "fa-caret-down"}
              />
            </div>
          </Link>
          <motion.div

            animate={{
              height: screenSelected == index ? "auto" : "0",
            }}
            className="bg-black text-white h-0 overflow-hidden"
          >
            <div id={`skills${index}`} style={{scrollPaddingTop:'50px'}} className=" p-5">{skill.screen}</div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export default SkillsMobile;
