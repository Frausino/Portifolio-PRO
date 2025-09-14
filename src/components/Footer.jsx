"use client";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
const socialLinks = [
  {
    href: "https://www.linkedin.com/in/davi-r-frausino",
    icon: FiLinkedin,
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    href: "https://github.com/Frausino",
    icon: FiGithub,
    label: "GitHub",
    color: "#171515",
  },
];

const Footer = () => {
  return (
    <>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
      <footer
        id="contact"
        className="relative w-full overflow-hidden bg-gradient-to-br from-[#5542ff] via-[#7c6fff] to-[#9b8cff] text-white"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full -left-4 -top-4 size-72 animate-pulse bg-white/10 blur-3xl"></div>
          <div className="absolute rounded-full -bottom-8 -right-8 size-96 animate-pulse bg-purple-300/20 blur-3xl"></div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 size-64 animate-pulse bg-indigo-400/10 blur-3xl"></div>
        </div>

        <div className="relative backdrop-blur-sm">
          <div className="container px-4 py-10 mx-auto">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4">
              <div className="flex flex-col items-center space-y-4 md:items-start">
                <div className="group">
                  <h3 className="text-3xl font-bold text-transparent transition-all duration-300 bg-gradient-to-r from-white to-purple-200 bg-clip-text group-hover:scale-105">
                    x_x
                  </h3>
                  <div className="w-0 h-1 mt-1 transition-all duration-500 bg-gradient-to-r from-purple-300 to-pink-300 group-hover:w-full"></div>
                </div>
                <p className="text-sm text-center text-purple-100 md:text-left">
                  ©2025 DRF. All rights reserved
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <h4 className="text-lg font-semibold text-purple-100">
                  Connect With Us
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group"
                        aria-label={link.label}
                      >
                        <div className="absolute inset-0 transition-all duration-300 rounded-full bg-white/20 blur-md group-hover:bg-white/40 group-hover:blur-lg"></div>
                        <div className="relative flex items-center justify-center transition-all duration-300 rounded-full size-12 bg-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20">
                          <Icon
                            className="text-white transition-all duration-300 size-5 group-hover:scale-110"
                            style={{
                              filter: `drop-shadow(0 0 8px ${link.color}40)`,
                            }}
                          />
                        </div>
                        <span className="absolute px-2 py-1 text-xs text-white transition-all duration-300 -translate-x-1/2 rounded-md opacity-0 -bottom-8 left-1/2 whitespace-nowrap bg-black/80 group-hover:opacity-100">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                {/* Título */}
                <h4 className="text-lg font-semibold text-purple-100">
                  Contact
                </h4>

                {/* Link de e-mail centralizado com ícone */}
                <nav className="flex flex-col items-center space-y-2">
                  <a
                    href="mailto:davi.rosa@sempreceub.com"
                    className="relative flex items-center gap-2 text-base text-purple-100 transition-all duration-300 group hover:text-white"
                  >
                    <FiMail className="text-xl" />
                    <span>davi.rosa@sempreceub.com</span>
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-300 to-pink-300 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="animate-gradient absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_100%]"></div>
      </footer>
    </>
  );
};

export default Footer;
