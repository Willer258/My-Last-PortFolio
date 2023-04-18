import { BandeTexteAnimation, TypingAnimation } from "@/components/Shared/TyperText";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface IWork {
  index: number;
  fonction: string;
  entreprise: string;
  date: string;
  description?: string;
  tasks: string[];
}
// const Work = ({
//   fonction,
//   entreprise,
//   date,
//   description,
//   tasks,
//   index,
// }: IWork) => {
//   return (
//     <div className="flex py-5 flex-col space-y-5 items-end md:items-start md:text-left super-border">
//       <div className="flex lg:items-center w-full justify-between flex-col-reverse space-y-3 md:space-y-0 md:flex-row">
//         <span>
//           FONCTION:
//           <span className="font-semibold">{fonction}</span>
//         </span>
//         <h3 className="  text-right font-medium border-black underline md:no-underline md:self-end inline md:pb-1 md:pr-3">
//           {entreprise} <br className="md:hidden " /> ({date})
//         </h3>
//       </div>

//       <p>{description}</p>

//       <div className="w-full">
//         <h3 className="uppercase font-semibold">Travail Effectué</h3>
//         <ul className="font-semibold ">
//           {tasks.map((task, index) => (
//             <li key={index}>- {task}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

const Work = ({
  fonction,
  entreprise,
  date,
  description,
  tasks,
  index,
}: IWork) => {

  const [ref, inView] = useInView();
   const [childAnimationComplete, setChildAnimationComplete] = useState(0);
   const [activate, setActivate] = useState(false);
  
  const controlsBack = useAnimation();

  const variants = {
    hidden: {
    scale:0
    },
    show: {
     scale:1
    ,transition:{
      delay:0.5,
    }
    },

    gomark: {
      width: "100%",
    },

    cometext: {
      opacity: 1,
    },
  };
  useEffect(() => {
    if (inView) {
      controlsBack.start("show");
      setActivate(true);
      // controlsText.start("cometext");
      // controlsMark.start("gomark");
    }
  }, [controlsBack, inView]);

  if(activate){

  }
  return (
    <div
   
      className={`${
        index % 2 != 0 && " flex-row-reverse  "
      } flex grid-cols-2  items-center w-full `}
    >
      
      <motion.div variants={variants} initial={'hidden'} animate={controlsBack} className={`flex justify-center items-center h-[40rem] w-[40rem] rounded-full text-white bg-black`}>
    
      <motion.div  className="flex flex-col space-y-10 items-center text-center px-10">
        <p className="text-3xl font-bold">{entreprise}</p>
        <p className="leading-7"  ref={ref}>{description}</p>
      </motion.div>
      </motion.div>

      {
        activate && <div className={` ${index%2 ==0 ? 'ml-20' : 'mr-20'} w-1/2 flex flex-col items-start  space-y-3`}>
        <p className="text-3xl font-semibold"> <BandeTexteAnimation noLine text={fonction} /></p>
        <p className="text-3xl font-light"> <BandeTexteAnimation noLine text={date} delay={0.5}  /></p>
        <div >
          <span className="text-2xl font-semibold"><BandeTexteAnimation noLine text={'Activités :'} delay={1} /></span>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2 ">
        {tasks.map((task, index) => (
    <p key={index}>
      {index < childAnimationComplete ? (
       <li>{task}</li> 
      ) : (
        index === childAnimationComplete && (
          <TypingAnimation
            onAnimationComplete={() =>
              setChildAnimationComplete(childAnimationComplete + 1)
            }
            isList
            className="text-base"
            text={task}
          />
        )
      )}
    </p>
  ))}
        </div>
      </div>
      }
      
     
    </div>
  );
};
export default Work;
