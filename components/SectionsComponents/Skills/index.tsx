import React, { useEffect, useState } from "react";
import {
  BandeTexteAnimation,
  TypingAnimation,
} from "@/components/Shared/TyperText";
import { motion } from "framer-motion";
import DevWebSection from "./SubComponents/DevWebSection";
import { useInView } from "react-intersection-observer";
import DevMobileSection from "./SubComponents/DevMobileSection";
import DesignUIUX from "./SubComponents/DesignUIUX";
import Autres from "./SubComponents/Autres";
import SkillsMobile from "./SkillsMobile";

const Skills = () => {
  const screens = [
    { name: "Développement web", screen: <DevWebSection /> },
    { name: "Développement mobile", screen: <DevMobileSection /> },
    { name: "Design UI/UX", screen: <DesignUIUX /> },
    { name: "Autres", screen: <Autres /> },
  ];

  const [screenSelected, setScreenSelected] = useState(0);
  const [hover, setHover]: any = useState(null);

  const [ref, inView] = useInView();
  const [view, setView] = useState(false);

  useEffect(() => {
    if (inView) {
      setView(true);
    }
  }, [inView]);

  return (
    <div className=" my-20 lg:my-56 lg:w-5/6 mx-auto px-2 md:px-5 " id="skills">
      <div ref={ref} className="flex lg:justify-center">
        <BandeTexteAnimation
          className="text-2xl md:text-4xl font-bold"
          text=" Mes skills"
        />
      </div>
      {window.screen.width > 1279 ? (
        <div>
          {view && (
            <div className="mt-10 flex flex-col rounded-lg overflow-hidden">
              <div
                style={{
                  gridTemplateColumns: `'repeat(${screens.length}, 1fr)'`,
                }}
                className={`w-full gap-x-3 grid grid-cols-4 `}
              >
                {screens.map((screen, index) => (
                  <motion.div
                    key={index}
                    onClick={() => setScreenSelected(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(null)}
                    animate={{
                      background: screenSelected == index ? "black" : "white",
                      color: screenSelected == index ? "white" : "black",
                    }}
                    className={` cursor-pointer duration-500  flex justify-center py-5 rounded-tl-lg rounded-tr-lg relative items-center flex-col `}
                  >
                    <TypingAnimation
                      className="text-lg font-semibold"
                      text={screen.name}
                    />
                    <motion.div
                      animate={{ scale: hover == index ? 1 : 0 }}
                      className={`bg-black h-0.5 w-1/2 absolute bottom-2 rounded-full`}
                    ></motion.div>
                  </motion.div>
                ))}
              </div>
              {screens[screenSelected].screen && (
                <motion.div
                  key={screenSelected}
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  className="bg-black text-white p-5"
                >
                  {screens[screenSelected].screen}
                </motion.div>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <SkillsMobile skills={screens} />
        </>
      )}
    </div>
  );
};

export default Skills;
