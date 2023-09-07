/* eslint-disable react/no-unescaped-entities */
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import Logo from "@/components/Shared/Logo";
import { BandeTexteAnimation } from "@/components/Shared/TyperText";
import FontAwesomeIcon from "@/components/SpecialComponent/FontAwesomeIcon";
import Image from "next/image";
import React from "react";

const Contacts = () => {
  return (
    <AnimateCursorTarget type={"blackBg"}>
      <div
        className="md:h-screen  place-content-center place-items-center grid bg-black lg:grid-cols-2 text-white relative "
        id="contact"
      >
        <video
          src="/video/1.mp4"
          className=" inset-0 absolute lg:relative z-0 w-full h-full"
          autoPlay
          loop
          muted
        ></video>

        <div className=" relative h-full w-full  flex py-5 md:py-36 px-5 items-center  md:items-start flex-col space-y-16">
          <div className="flex md:items-start items-center space-y-3 flex-col">
            <BandeTexteAnimation
              whiteBar
              className=" text-xl md:text-3xl 2xl:text-4xl font-bold"
              text="Un site web ? "
            />

            <BandeTexteAnimation
              whiteBar
              delay={0.5}
              className=" hidden md:inline text-xl md:text-3xl 2xl:text-4xl font-bold"
              text="Une application web ou mobile ?  "
            />
            <BandeTexteAnimation
              whiteBar
              delay={0.5}
              className="md:hidden text-xl md:text-3xl 2xl:text-4xl font-bold"
              text="Une application web ? "
            />
            <BandeTexteAnimation
              whiteBar
              delay={0.7}
              className=" md:hidden text-xl md:text-3xl 2xl:text-4xl font-bold"
              text="mobile ? "
            />
            <BandeTexteAnimation
              whiteBar
              delay={1}
              className=" text-xl md:text-3xl 2xl:text-4xl font-bold"
              text="Je suis a votre service !!!"
            />
          </div>

          <div className="flex items-center md:items-start flex-col space-y-5 ">
            <BandeTexteAnimation
              whiteBar
              delay={1.5}
              className="text-xl 2xl:text-2xl font-bold"
              text="Coordonnees"
            />
            <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 w-10/12 md:w-full items-center">
              <span className="font-bold">Email:</span>
              <a
                className="text-lg 2xl:text-xl text-center  "
                href="mailto:wilfriedhouinlindjonon91@gmail.com"
              >
                wilfriedhouinlindjonon
                <br className="md:hidden" />
                91@gmail.com
              </a>
            </div>

            <div className="flex flex-col md:flex-row  space-y-2 md:space-y-0 w-full md:space-x-2 items-center">
              <span className="font-bold">Numéro de telephone:</span>
              <div className="flex flex-col items-center space-y-2 md:space-y-0 md:flex-row">
                <a className="text-lg 2xl:text-xl" href="tel:+2250767668478">
                  +225 07-67-66-84-78
                </a>{" "}
                <span className="text-lg 2xl:text-xl hidden md:inline">/</span>
                <a className="text-lg 2xl:text-xl" href="tel:+2250172598212">
                  +225 01-72-59-82-12
                </a>
              </div>
            </div>

            <div className="flex flex-col w-full space-y-2 md:space-y-0  md:space-x-2 items-center md:flex-row">
              <span className="font-bold">Habitat :</span>
              <a className="text-lg 2xl:text-xl" href="#">
                Abidjan, Cote d'Ivoire{" "}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start space-y-7">
            <BandeTexteAnimation
              whiteBar
              delay={2}
              className="text-xl 2xl:text-2xl  font-bold"
              text="Liens sociaux"
            />

            <div className="flex space-x-5">
              <a
                href="https://github.com/Willer258"
                rel="noreferrer"
                target="_blank"
                className="h-16 w-16 p-3 hover:scale-125 duration-300 flex items-center justify-center  rounded-full  bg-white"
              >
                <Image
                  src="/social/github.svg"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </a>

              <a
                href="https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/"
                rel="noreferrer"
                target="_blank"
                className="h-16 w-16 p-3 hover:scale-125 duration-300 flex items-center justify-center  rounded-full  bg-white"
              >
                <Image
                  src="/social/linkedin.svg"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimateCursorTarget>
  );
};

export default Contacts;
