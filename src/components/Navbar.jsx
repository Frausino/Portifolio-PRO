import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

const navItems = ["Start", "Mission", "Profile", "Contact"];

const NavBar = ({ onReady }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // 🔹 avisa ao PageLoader que a Navbar já montou
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 z-50 h-16 transition-all duration-700 border-none top-4 sm:inset-x-6"
      >
        <header className="absolute w-full -translate-y-1/2 top-1/2">
          <nav className="flex items-center justify-between p-4 size-full">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMobileMenu}
                className="relative z-[60] flex size-8 flex-col items-center justify-center space-y-1.5 md:hidden"
                aria-label="Toggle mobile menu"
              >
                <span
                  className={clsx(
                    "block h-0.5 w-6 bg-white transition-all duration-300 ease-out",
                    isMobileMenuOpen && "translate-y-2 rotate-45"
                  )}
                />
                <span
                  className={clsx(
                    "block h-0.5 w-6 bg-blue-50 transition-all duration-300 ease-out",
                    isMobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={clsx(
                    "block h-0.5 w-6 bg-white transition-all duration-300 ease-out",
                    isMobileMenuOpen && "-translate-y-2 -rotate-45"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center h-full">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex size-12 items-center justify-center space-x-0.5 rounded-full bg-white/10 md:ml-10"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "fixed inset-0 z-[55] transition-opacity duration-300 md:hidden",
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        />

        <div
          className={clsx(
            "absolute left-0 top-0 h-full w-72 bg-white/70 backdrop-blur-md transition-transform duration-300 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="px-6 py-20 space-y-6">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 text-lg transition-all duration-200 rounded-lg hover:translate-x-2 hover:bg-white/10"
                onClick={handleNavClick}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
