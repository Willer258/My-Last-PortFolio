/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React from "react";

function SkillCard({ title, description, image, icons }: any) {
  return (
    <button
    
      className="rounded-lg border space-y-5 p-5 hover:shadow-lg duration-200 items-center overflow-hidden flex flex-col "
    >
      <img
        className="w-full h-52 object-contain"
        src={image}
        alt="front end dev"
      />
      <div className="p-6 space-y-3 flex flex-col items-center">
        <h3 className="font-semibold text-xl">{title}</h3>
        <p>{description}</p>
        <div className="border-b border-gray-300 w-full"></div>
        <div className="flex mt-5 space-x-5">
          {icons.map((icon: any,index:number) => (
            <img key={index} className="h-10 w-10  " alt={''} src={icon} />
          ))}
        </div>
      </div>
    </button>
  );
}

export default SkillCard;
