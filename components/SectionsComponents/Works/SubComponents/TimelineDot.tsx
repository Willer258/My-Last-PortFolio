import { motion } from "framer-motion";
import React from "react";

interface TimelineDotProps {
  active: boolean;
}

const TimelineDot = ({ active }: TimelineDotProps) => {
  return (
    <motion.div
      className="relative flex-none rounded-full"
      animate={{
        width: active ? 14 : 10,
        height: active ? 14 : 10,
        backgroundColor: active ? "#1a1a1a" : "#a3a3a3",
      }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    />
  );
};

export default TimelineDot;
