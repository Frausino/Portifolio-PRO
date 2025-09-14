import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="mission" className="w-screen min-h-screen">
      <div className="relative flex flex-col items-center gap-5 mt-4 mb-8">
        <p className="font-general text-sm uppercase md:text-[10px]">
          My mission
        </p>

        <AnimatedTitle
          title="change<b></b> the <br />world through <b>innov</b>ation"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>Researcher in Brain-Computer Interfaces (BCI)</p>
          <p>and Artificial Intelligence.</p>
          <p className="text-gray-500">
            I conduct research and development projects focused on EEG signal
            analysis, transforming data into precise information for
            applications in medicine, particularly in neurology, cardiology, and
            psychoanalysis.
          </p>
        </div>
      </div>

      <div className="w-screen h-dvh" id="clip">
        <div className="mask-clip-path about-image">
          <video
            src="videos/about.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 object-cover size-full"
          />
          <div className="absolute inset-0 pointer-events-none bg-black/20" />
        </div>
      </div>
    </div>
  );
};

export default About;
