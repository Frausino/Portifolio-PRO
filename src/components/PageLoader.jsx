import gsap from "gsap";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import mascotAnimation from "../assets/mascote.json";

const PageLoader = ({ children }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [navbarLoaded, setNavbarLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const loaderRef = useRef(null);

  const allLoaded = heroLoaded && navbarLoaded && minTimePassed;

  
  useEffect(() => {
    if (!allLoaded) {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.floor(Math.random() * 5) + 1;
        if (current >= 100) {
          current = 100;
          clearInterval(interval);
        }
        setCount(current);
      }, 60);

      return () => clearInterval(interval);
    }
  }, [allLoaded]);


  useEffect(() => {
    gsap.fromTo(
      ".digit",
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, stagger: 0.01, duration: 0.25, ease: "power2.out" }
    );
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allLoaded && loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
        },
      });
    }
  }, [allLoaded]);

  return (
    <>
      {!allLoaded && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black"
        >
          <Lottie
            animationData={mascotAnimation}
            loop
            autoplay
            className="mb-10 size-32"
          />

          <div className="flex space-x-1 font-mono text-5xl text-white sm:text-6xl">
            {count
              .toLocaleString("de-DE")
              .split("")
              .map((digit, i) => (
                <span
                  key={i}
                  className="inline-block w-10 text-center bg-black border border-gray-700 rounded-sm digit sm:w-12"
                >
                  {digit}
                </span>
              ))}
          </div>
        </div>
      )}

      {children({
        onHeroReady: () => setHeroLoaded(true),
        onNavbarReady: () => setNavbarLoaded(true),
      })}
    </>
  );
};

export default PageLoader;
