import React from "react";

interface IWork {
  fonction: string;
  entreprise: string;
  date: string;
  description?: string;
  tasks: string[];
}
const Work = ({ fonction, entreprise, date, description, tasks }: IWork) => {
  return (
    <div className="flex py-5 flex-col space-y-5 items-end md:items-start md:text-left super-border">
      <div className="flex lg:items-center w-full justify-between flex-col-reverse space-y-3 md:space-y-0 md:flex-row">
        <span>
          FONCTION:
          <span className="font-semibold">{fonction}</span>
        </span>
        <h3 className="  text-right font-medium border-black underline md:no-underline md:self-end inline md:pb-1 md:pr-3">
          {entreprise} <br className="md:hidden " /> ({date})
        </h3>
      </div>

      <p>{description}</p>

      <div className="w-full">
        <h3 className="uppercase font-semibold">Travail Effectué</h3>
        <ul className="font-semibold ">
          {tasks.map((task, index) => (
            <li key={index}>- {task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Work;
