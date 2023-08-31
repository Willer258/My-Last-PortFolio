import image from "@/assets/profile.jpg";
import AnimateBox from "@/components/Shared/AnimateBox";
import AnimateCursorTarget from "@/components/Shared/AnimateCursorTarget";
import {
  BandeTexteAnimation,
  TypingAnimation,
} from "@/components/Shared/TyperText";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const Profil = () => {
  const [ref, inView] = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);

  const [childAnimationComplete, setChildAnimationComplete] = useState(false);

  const [childAnimationComplete1, setChildAnimationComplete1] = useState(false);

  const [childAnimationComplete2, setChildAnimationComplete2] = useState(false);

  const [childAnimationComplete3, setChildAnimationComplete3] = useState(false);

  const [childAnimationComplete4, setChildAnimationComplete4] = useState(false);

  const handleChildAnimationComplete = (value: number) => {
    switch (value) {
      case 1:
        setChildAnimationComplete(true);
        break;
      case 2:
        setChildAnimationComplete1(true);
        break;
      case 3:
        setChildAnimationComplete2(true);
        break;
      case 4:
        setChildAnimationComplete3(true);
        break;

      default:
        setChildAnimationComplete4(true);
        break;
    }
  };

  return (
    <div
      id="profil"
      className="lg:h-screen   2xl:w-5/6 mx-auto md:my-20 flex px-2 md:px-5 relative "
    >
      <div className="flex flex-col  lg:items-center font-medium w-full h-full lg:flex-row space-y-5 text-xl lg:space-x-10  ">
        <div className="space-y-3 2xl:pr-20 lg:self-center flex flex-col lg:w-1/2 h-full justify-center ">
          <h2
            ref={ref}
            className="text-xl uppercase self-start font-semibold pb-5 md:pb-10"
          >
            <BandeTexteAnimation
              className= "text-2xl md:text-4xl font-bold"
              text=" A propos de moi"
            />
          </h2>

          {show && (
            <div className="relative">
            <div className="absolute space-y-3">
              <TypingAnimation
                duration={30}
                onAnimationComplete={() => handleChildAnimationComplete(1)}
                className="text-base"
                text="Bonjour, je suis Houinlindjonon Alain Wilfried, développeur frontend et designer UI/UX à votre service."
              />

              {childAnimationComplete && (
                <p>
                  <TypingAnimation
                    duration={20}
                    onAnimationComplete={() => handleChildAnimationComplete(2)}
                    className="text-base"
                    text=" En tant que développeur frontend, je m'engage à respecter des
           critères stricts tels que la conception, l'optimisation,
           l'amélioration et la maintenance de sites ou d'applications de
           qualité, tout en veillant au bon fonctionnement des mécaniques (API)
           qui leur sont destinées. Fort de mon expérience et des nombreux
           défis que j'ai relevés, je suis convaincu de pouvoir répondre à ces
           exigences avec succès."
                  />
                </p>
              )}
              {childAnimationComplete1 && (
                <p>
                  <TypingAnimation
                    duration={10}
                    onAnimationComplete={() => handleChildAnimationComplete(3)}
                    className="text-base"
                    text="  En tant que designer UI/UX, j'ai commencé à travailler sur des
          projets de conception de sites web et d'applications mobiles depuis
          peu. Je suis convaincu que mes compétences en matière de design me
          permettront de créer des interfaces utilisateur conviviales,
          intuitives et esthétiquement agréables."
                  />
                </p>
              )}

              {childAnimationComplete2 && (
                <p>
                  <TypingAnimation
                    duration={10}
                    className="text-base"
                    text=" Je suis résident de la Côte d'Ivoire, plus précisément d'Abidjan, et
          je suis en mesure de vous offrir une plateforme agréable, simple et
          optimisée qui répondra à toutes vos exigences, que vous soyez basé
          en Côte d'Ivoire ou n'importe où dans le monde."
                  />
                </p>
              )}
            </div>

            <div className="invisible space-y-3 ">
              <TypingAnimation
                className="text-base"
                text="Bonjour, je suis Houinlindjonon Alain Wilfried, développeur frontend et designer UI/UX à votre service."
              />

                <p>
                  <TypingAnimation
                    duration={20}
                    className="text-base"
                    text=" En tant que développeur frontend, je m'engage à respecter des
           critères stricts tels que la conception, l'optimisation,
           l'amélioration et la maintenance de sites ou d'applications de
           qualité, tout en veillant au bon fonctionnement des mécaniques (API)
           qui leur sont destinées. Fort de mon expérience et des nombreux
           défis que j'ai relevés, je suis convaincu de pouvoir répondre à ces
           exigences avec succès."
                  />
                </p>
            
                <p>
                  <TypingAnimation
                    duration={10}
                    className="text-base"
                    text="  En tant que designer UI/UX, j'ai commencé à travailler sur des
          projets de conception de sites web et d'applications mobiles depuis
          peu. Je suis convaincu que mes compétences en matière de design me
          permettront de créer des interfaces utilisateur conviviales,
          intuitives et esthétiquement agréables."
                  />
                </p>
            <p>
                  <TypingAnimation
                    duration={10}
                    className="text-base"
                    text=" Je suis résident de la Côte d'Ivoire, plus précisément d'Abidjan, et
          je suis en mesure de vous offrir une plateforme agréable, simple et
          optimisée qui répondra à toutes vos exigences, que vous soyez basé
          en Côte d'Ivoire ou n'importe où dans le monde."
                  />
                </p>
            
            </div>
            </div>
            
          )}
        </div>

        <div className="object-contain hover:shadow-md lg:absolute hover:scale-95 duration-1000  grayscale shadow-xl  hover:grayscale-0 -right-52 2xl:-right-80 lg:w-8/12  2xl:-bottom-14 overflow-hidden  ">
          {show && (
            <AnimateCursorTarget type="image">
              <AnimateBox>
                <motion.img
                  src={image.src}
                  alt="Houinlindjonon Alain Wilfried"
                  className="w-full h-full 
          "
                />
              </AnimateBox>
            </AnimateCursorTarget>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profil;
