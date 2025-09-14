import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

const Hero = ({ onReady }) => {
  const [videoList, setVideoList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isReadyTriggered, setIsReadyTriggered] = useState(false);

  const nextVdRef = useRef(null);

  useEffect(() => {
    const count = 5;
    const available = [];

    const checkVideo = async (index) => {
      const src = `/videos/hero-${index}.mp4`;
      try {
        const response = await fetch(src, { method: "HEAD" });
        if (response.ok) available.push(index);
      } catch (e) {
        console.warn(`Erro ao verificar vídeo ${index}:`, e);
      }
    };

    (async () => {
      for (let i = 1; i <= count; i++) {
        await checkVideo(i);
      }
      setVideoList(available);
    })();
  }, []);

  // ✅ dispara onReady quando o primeiro vídeo carregar
  const handleVideoLoaded = () => {
    if (!isReadyTriggered) {
      setLoading(false);
      onReady?.();
      setIsReadyTriggered(true);
    }
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  const getVideoSrc = (index) =>
    `/videos/hero-${videoList[index % videoList.length]}.mp4`;

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div id="start" className="relative w-screen overflow-x-hidden h-dvh">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 w-screen overflow-hidden rounded-lg h-dvh bg-blue-75"
      >
        <div>
          <div className="absolute z-50 overflow-hidden rounded-lg cursor-pointer mask-clip-path absolute-center size-64">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="transition-all duration-500 ease-in origin-center scale-50 opacity-0 hover:scale-100 hover:opacity-100"
              >
                {videoList.length > 0 && (
                  <video
                    ref={nextVdRef}
                    src={getVideoSrc((currentIndex + 1) % videoList.length)}
                    loop
                    muted
                    id="current-video"
                    className="object-cover object-center origin-center scale-150 size-64"
                    onLoadedData={handleVideoLoaded}
                  />
                )}
              </div>
            </VideoPreview>
          </div>

          {videoList.length > 0 && (
            <>
              <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex)}
                loop
                muted
                id="next-video"
                className="absolute z-20 invisible object-cover object-center absolute-center size-64"
                onLoadedData={handleVideoLoaded}
              />
              <video
                src={getVideoSrc(
                  currentIndex === videoList.length - 1 ? 0 : currentIndex
                )}
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 object-cover object-center transition-transform duration-500 size-full hover:scale-105"
                onLoadedData={handleVideoLoaded}
              />

              <div className="absolute inset-0 z-40 flex items-center justify-center">
                <div className="relative flex flex-col items-center">
                  <div className="absolute inset-0 transition-opacity duration-500 rounded-md bg-gradient-to-t from-black/60 via-white/20 to-transparent opacity-70 hover:opacity-40"></div>

                  <span className="relative px-4 py-2 text-lg text-white transition-transform duration-300 rounded-md shadow-md z-5 special-font animate-pulse backdrop-blur-sm hover:scale-110">
                    <b>click</b>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <h1 className="absolute z-40 special-font hero-heading bottom-5 right-5 text-blue-75">
          F<b>RA</b>USINO
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full">
          <div className="px-5 mt-24 sm:px-10">
            <h1 className="text-blue-100 special-font hero-heading">
              Da<b>V</b>i
            </h1>

            <p className="mb-5 text-2xl text-blue-100 max-w-100 font-robert-regular">
              Innovations with Social Impact <br /> Scroll down to explore.
            </p>

            <Button
              id="Linkedin-button"
              title="Linkedin"
              leftIcon={<FiLinkedin />}
              containerClass="mt-4 bg-yellow-300 flex-center gap-2 px-8 py-3 rounded-full"
            />

            <Button
              id="GitHub"
              title="GitHub"
              leftIcon={<FiGithub />}
              containerClass="mt-4 bg-yellow-300 flex-center gap-2 px-8 py-3 rounded-full"
            />
          </div>
        </div>
      </div>

      <h1 className="absolute text-black special-font hero-heading bottom-5 right-5">
        F<b>RA</b>USINO
      </h1>
    </div>
  );
};

export default Hero;
