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
import { useTranslation } from 'next-i18next';

const Profil = () => {
  const { t } = useTranslation('common');
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
              text={` ${t('about.title')}`}
            />
          </h2>

          {show && (
            <div className="relative">
            <div className="absolute space-y-3">
              <TypingAnimation
                duration={10  }
                onAnimationComplete={() => handleChildAnimationComplete(1)}
                className="text-base"
                text={t('about.intro')}
              />

              {childAnimationComplete && (
                <p>
                  <TypingAnimation
                    duration={5}
                    onAnimationComplete={() => handleChildAnimationComplete(2)}
                    className="text-base"
                    text={` ${t('about.paragraph1')}`}
                  />
                </p>
              )}
              {childAnimationComplete1 && (
                <p>
                  <TypingAnimation
                    duration={5}
                    onAnimationComplete={() => handleChildAnimationComplete(3)}
                    className="text-base"
                    text={`  ${t('about.paragraph2')}`}
                  />
                </p>
              )}

              {childAnimationComplete2 && (
                <p>
                  <TypingAnimation
                    duration={5}
                    className="text-base"
                    text={` ${t('about.paragraph3')}`}
                  />
                </p>
              )}
            </div>

            <div className="invisible space-y-3 ">
              <TypingAnimation
                className="text-base"
                text={t('about.intro')}
              />

                <p>
                  <TypingAnimation
                    duration={20}
                    className="text-base"
                    text={` ${t('about.paragraph1')}`}
                  />
                </p>

                <p>
                  <TypingAnimation
                    duration={10}
                    className="text-base"
                    text={`  ${t('about.paragraph2')}`}
                  />
                </p>
            <p>
                  <TypingAnimation
                    duration={10}
                    className="text-base"
                    text={` ${t('about.paragraph3')}`}
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
                  alt={t('about.imageAlt')}
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
