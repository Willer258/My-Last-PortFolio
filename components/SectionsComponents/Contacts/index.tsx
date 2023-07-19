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
        className="h-screen  place-content-center place-items-center grid bg-black grid-cols-2 text-white relative "
        id="contact"
      >
        <video
          src="/video/1.mp4"
          className=" inset-0 w-full h-full"
          autoPlay
          loop
          muted
        ></video>

        <div className=" h-full w-full flex py-36 px-5 items-start flex-col space-y-16">
          <div className="flex items-start space-y-3 flex-col">
            <BandeTexteAnimation
              whiteBar
              className="text-4xl font-bold"
              text="Un site web ? "
            />
            <BandeTexteAnimation
              whiteBar
              delay={0.5}
              className="text-4xl font-bold"
              text="Une application web ou mobile ? "
            />
            <BandeTexteAnimation
              whiteBar
              delay={1}
              className="text-4xl font-bold"
              text="Je suis a votre service !!!"
            />
          </div>

          <div className="flex items-start flex-col space-y-5 ">
            <BandeTexteAnimation
              whiteBar
              delay={1.5}
              className="text-2xl font-bold"
              text="Coordonnees"
            />
            <div className="flex space-x-2 items-center">
              <span className="font-bold">Email:</span>
              <a
                className="text-xl"
                href="mailto:wilfriedhouinlindjonon91@gmail.com"
              >
                wilfriedhouinlindjonon91@gmail.com
              </a>
            </div>

            <div className="flex space-x-2 items-center">
              <span className="font-bold">Numéro de telephone:</span>
              <a className="text-xl" href="tel:+2250767668478">
                +225 07-67-66-84-78
              </a>{" "}
              <span className="text-xl">/</span>
              <a className="text-xl" href="tel:+2250172598212">
                +225 01-72-59-82-12
              </a>
            </div>

            <div className="flex space-x-2 items-center">
              <span className="font-bold">Habitat :</span>
              <a className="text-xl" href="#">
                Abidjan, Cote d'Ivoire{" "}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start space-y-7">
            <BandeTexteAnimation
              whiteBar
              delay={2}
              className="text-2xl font-bold"
              text="Liens sociaux"
            />

            <div className="flex space-x-5">
              <a href="https://github.com/Willer258"  rel="noreferrer" target="_blank" className="h-16 w-16 p-3 flex items-center justify-center  rounded-full  bg-white">
             <Image src="/social/github.svg" width={100} height={100} className="w-full h-full object-contain" alt="" />
              </a>

              <a href="https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/"  rel="noreferrer" target="_blank" className="h-16 w-16 p-3 flex items-center justify-center  rounded-full  bg-white">
             <Image src="/social/linkedin.svg" width={100} height={100} className="w-full h-full object-contain" alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:w-5/6 mx-auto px-2 md:px-5 h-full hidden inset-0 ">
          {/* <Logo className="h-36 w-36" isWhite /> */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 content-center">
            <div className="space-y-5 flex-col justify-center flex">
              <span className="font-semibold text-2xl">Un site web ? </span>
              <span className="font-semibold text-2xl">
                Une application web ou mobile ?
              </span>
              <span className="font-semibold text-2xl">Je suis paré !!! </span>
            </div>
            <div
              className="w-full h-full p-10
            text-black
           bg-white rounded-xl flex flex-col space-y-5"
            >
              <div className="flex space-x-2">
                <span className="font-bold">Numéro de telephone:</span>
                <a href="tel:+2250767668478">+225 07-67-66-84-78</a>{" "}
                <span>/</span>
                <a href="tel:+2250172598212">+225 01-72-59-82-12</a>
              </div>
              <div className="flex space-x-2">
                <span className="font-bold">Email:</span>
                <a href="mailto:wilfriedhouinlindjonon91@gmail.com">
                  wilfriedhouinlindjonon91@gmail.com
                </a>
              </div>
              {/* <div className="flex space-x-2">
              <span className="font-bold">Social:</span>
              <a href="https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/">
              <FontAwesomeIcon icon="fa-linkedin"/>
              </a>
              <a href="https://www.linkedin.com/in/alain-wilfried-houinlindjonon-929612247/">
              <FontAwesomeIcon icon="fa-linkedin"/>
              </a>
            </div> */}
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127118.28783248975!2d-4.049705013908699!3d5.34861704620972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ea5311959121%3A0x3fe70ddce19221a6!2sAbidjan!5e0!3m2!1sfr!2sci!4v1669573593643!5m2!1sfr!2sci"
                  width="600"
                  height="450"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateCursorTarget>
  );
};

export default Contacts;
