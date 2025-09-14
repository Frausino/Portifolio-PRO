// Project.jsx
import { forwardRef, useRef, useState } from "react";
import { FaCertificate } from "react-icons/fa";
import { FiBarChart2, FiCloud, FiCpu, FiShield } from "react-icons/fi";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95,.95,.95)`
    );
  };

  return (
    <div
      id="profile"
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const isVideoSrc = (src) => /\.(mp4|webm|ogg)$/i.test(src || "");

export const BentoCard = forwardRef(function BentoCard(
  {
    src,
    title,
    description,
    isComingSoon,
    comingSoonLink,
    kind,
    alt = "",
    poster,
    className = "",
    ...mediaProps
  },
  ref
) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const renderAsVideo = kind ? kind === "video" : isVideoSrc(src);

  return (
    <div ref={ref} className={`relative size-full ${className}`}>
      {renderAsVideo ? (
        <video
          src={src}
          poster={poster}
          playsInline
          className="absolute inset-0 object-cover object-center size-full"
          {...mediaProps}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 object-cover object-center size-full"
          {...mediaProps}
        />
      )}

      <div className="relative z-10 flex flex-col justify-between p-5 size-full text-blue-50">
        <div>
          {title && <h1 className="bento-title special-font">{title}</h1>}
          {description && (
            <p className="mt-3 text-xs max-w-64 md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && comingSoonLink && (
          <a
            href={comingSoonLink}
            target="_blank"
            rel="noopener noreferrer"
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoverOpacity(1)}
            onMouseLeave={() => setHoverOpacity(0)}
            className="relative flex items-center gap-1 px-5 py-2 overflow-hidden text-xs uppercase bg-black rounded-full cursor-pointer border-hsla w-fit text-white/20"
          >
            <div
              className="absolute transition duration-300 opacity-0 pointer-events-none -inset-px"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Click here</p>
          </a>
        )}
      </div>
    </div>
  );
});

const Project = () => (
  <section className="pb-20 bg-black">
    <div className="container px-3 mx-auto md:px-10">
      <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
        <div className="px-5 py-32">
          <p className="text-2xl font-circular-web text-blue-50">
            PROFESSIONAL PROFILE
          </p>

          <p className="max-w-md mt-4 text-lg font-circular-web text-blue-50 opacity-80">
            Researcher and Developer in Artificial Intelligence and
            Brain-Computer Interfaces (BCI) I work at the intersection of AI,
            biomedical data analysis, and cybersecurity, with a focus on social
            impact solutions. I have experience developing advanced AI
            architectures, including LangChain, RAG, and machine learning
            applied to biomedical signals (EEG, neurology, cardiology, and
            psychoanalysis).
          </p>

          <p className="flex items-center max-w-md gap-2 mt-4 text-lg font-circular-web text-blue-50 opacity-80">
            <FiCpu className="text-yellow-300 text-9xl" />
            Web Development and APIs: Python, Django, FastAPI, React,
            JavaScript, TypeScript, with expertise in advanced front-end
            development (GSAP, WebGL, Three.js – international Three.js Journey
            certification).
          </p>

          <p className="flex items-center max-w-md gap-2 mt-3 text-lg font-circular-web text-blue-50 opacity-80">
            <FiCloud className="text-blue-300 text-8xl" />
            Cloud and DevOps: Google Cloud (BigQuery, Cloud Run, Compute
            Engine), CI/CD pipelines, and Linux administration (Kali, Ubuntu).
          </p>

          <p className="flex items-center max-w-md gap-2 mt-3 text-lg font-circular-web text-blue-50 opacity-80">
            <FiShield className="text-6xl text-red-300" />
            Cybersecurity: Pentesting, secure pipeline and middleware
            development.
          </p>

          <p className="flex items-center max-w-md gap-2 mt-3 text-lg font-circular-web text-blue-50 opacity-80">
            <FiBarChart2 className="text-5xl text-green-300" />
            Data and Analytics: SQL, PostgreSQL, Power BI, Chroma.
          </p>

          <p className="max-w-md mt-4 text-lg font-circular-web text-blue-50 opacity-80">
            I am currently part of a university research group supported by
            CNPq, always seeking innovative projects that connect technology,
            science, and social impact.
          </p>
        </div>

        <BentoTilt className="relative h-[80vh] w-full overflow-hidden rounded-md">
          <BentoCard src="img/1.jpg" alt="Profile cover" />
          <div className="absolute inset-0 pointer-events-none bg-black/40" />
        </BentoTilt>
      </div>
    </div>

    <div className="container px-3 mx-auto md:px-10">
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          kind="video"
          loop
          muted
          autoPlay
          playsInline
          onLoadedMetadata={(e) => {
            console.log("Duração do vídeo:", e.currentTarget.duration);
          }}
          title={
            <>
              E<b>DU</b>CAR
            </>
          }
          description="Educar is a learning system for high school and university students, allowing them to organize and learn from materials chosen by the students themselves. The system uses LangChain and integrates GPT via API to generate contextualized responses."
          isComingSoon
        />
        <div className="absolute inset-0 pointer-events-none bg-black/40" />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="row-span-1 bento-tilt_1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-4.mp4"
            kind="video"
            loop
            muted
            autoPlay
            playsInline
            title={
              <>
                Ethi<b>cal Ha</b>cker
              </>
            }
            description="The Cisco Ethical Hacker course trains professionals to identify, analyze, and mitigate vulnerabilities in systems and networks, combining theory and hands-on penetration testing."
            isComingSoon
            comingSoonLink="https://www.credly.com/badges/8614ae6a-bbbb-4d6f-82bf-9e6b2dd6f758/linked_in_profile"
          />
          <div className="absolute inset-0 pointer-events-none bg-black/40" />
        </BentoTilt>

        <BentoTilt className="row-span-1 bento-tilt_1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            kind="video"
            loop
            muted
            autoPlay
            playsInline
            title={
              <>
                P<b>a</b>dan
              </>
            }
            description="Technology company dedicated to research and development of innovative solutions."
            isComingSoon
          />
          <div className="absolute inset-0 pointer-events-none bg-black/20" />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-2.mp4"
            kind="video"
            loop
            muted
            autoPlay
            playsInline
            title={
              <>
                Thr<b>ee.js</b>
              </>
            }
            description="Interactive and immersive web interfaces with React, GSAP, and WebGL/Three.js."
            isComingSoon
            comingSoonLink="https://threejs.org/manual/#en/creating-a-scene"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex flex-col justify-between p-5 bg-red-600 size-full">
            <h1 className="text-black bento-title special-font max-w-64">
              C<b>E</b>RTIF<b>ICAT</b>ES
            </h1>
            <Button
              id="Credly"
              title="Certificados"
              leftIcon={<FaCertificate />}
              containerClass="mt-4 bg-red-500 flex-center gap-4"
              href="https://www.credly.com/users/davi-rosa-frausino/badges"
            />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="videos/feature-5.mp4"
            kind="video"
            loop
            muted
            autoPlay
            playsInline
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Project;
