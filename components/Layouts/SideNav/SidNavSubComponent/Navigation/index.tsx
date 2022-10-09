import React from "react";
import { links } from "../../../../../utils/link";
import PagesLinks from "./PagesLinks";

const Navigation = () => {
  return (
    <div className="flex flex-col space-y-5">
      {links.map((item, index) => (
        <PagesLinks
          key={index}
          icon={item.icon}
          label={item.label}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default Navigation;
