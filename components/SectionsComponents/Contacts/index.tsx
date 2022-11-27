import Logo from "@/components/Shared/Logo";
import FontAwesomeIcon from "@/components/SpecialComponent/FontAwesomeIcon";
import React from "react";

const Contacts = () => {
  return (
    <div className="h-screen bg-black flex flex-col text-white " id="contact">
      <div className="lg:w-5/6 mx-auto px-2 md:px-5 h-full ">
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
            <div >
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
  );
};

export default Contacts;
