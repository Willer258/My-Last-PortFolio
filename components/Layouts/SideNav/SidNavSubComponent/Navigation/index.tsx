import { links } from "@/utils/links";
import React from "react";
import PagesLinks from "./PagesLinks";
import { motion } from "framer-motion";

const Navigation = () => {
  return (
    <div className="flex flex-col space-y-5">
      {links.map((item, index) => (
        <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 ,  transition: { delay: index * 0.2}}}
          key={index}
        >
          <PagesLinks
            key={index}
         
            icon={item.icon}
            label={item.label}
            link={item.link}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Navigation;
