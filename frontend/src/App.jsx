import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  // 🎬 Initial "VI" animation intro
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
      duration: 1.5,
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 1.5,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() > 0.7) {
          const svg = document.querySelector(".svg");
          if (svg) svg.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, []); // ✅ Run only once


  // 🎮 Parallax mouse movement (only when main content shows)
  useEffect(() => {
    if (!showContent) return;
    gsap.to(".main",{
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.easeInOut",
      delay: -1,
    })
    gsap.to(".sky",{
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.easeInOut",
      delay: -0.8,
    })
    gsap.to(".bg",{
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.easeInOut",
      delay: -0.8,
    })
    gsap.to(".character",{
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.easeInOut",
      delay: -0.8,
    })

    const main = document.querySelector(".main");
    if (!main) return;

    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".main .text", { x: `${xMove * 0.4}%` });
      gsap.to(".sky", { x: xMove });
      gsap.to(".bg", { x: xMove * 1.7 });
    };

    main.addEventListener("mousemove", handleMouseMove);

    // ✅ Cleanup listener on unmount
    return () => {
      main.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showContent]);

  return (
    <>
      {/* === SVG INTRO === */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="/bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* === MAIN CONTENT === */}
      {showContent && (
        <div className="main w-full rotate-[10deg] scale-[1.7]">
          <div className="landing w-full h-screen bg-black relative overflow-hidden">
            {/* Navbar */}
            <div className="navbar w-full py-10 px-10 flex justify-between items-center absolute top-0 left-0 z-10">
              <div className="logo flex gap-7 items-center">
                <div className="lines flex flex-col">
                  <div className="line w-8 h-1 bg-white mb-1"></div>
                  <div className="line w-6 h-1 bg-white mb-1"></div>
                  <div className="line w-4 h-1 bg-white"></div>
                </div>
                <h3 className="text-4xl text-white">Rockstar</h3>
              </div>
            </div>

            {/* Background images */}
            <div className="imagediv overflow-hidden relative w-full h-screen">
              <img
                className="sky scale-[1.5] rotate-[-20deg] absolute top-0 left-0 w-full h-full object-cover"
                src="/sky.png"
                alt="Sky"
              />

              <img
                className="bg scale-[1.8] rotate-[-5deg] absolute top-0 left-0 w-full h-full object-cover"
                src="/bg.png"
                alt="Background"
              />

              {/* Text */}
              <div className="text text-white absolute flex flex-col gap-3 top-0 left-1/2 -translate-x-1/2">
                <h1 className="text-[9rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[9rem] leading-none ml-20">theft</h1>
                <h1 className="text-[9rem] leading-none -ml-40">auto</h1>
              </div>

              {/* Character image */}
              <img
                className="character absolute -bottom-[65%] left-[25%]
                scale-[2] rotate-[10deg]"
                src="/girlbg.png"
                alt="Character"
              />
            </div>

            {/* Bottom bar */}
            <div className="btmbar w-full bg-gradient-to-t from-black py-10 px-10 to-transparent absolute bottom-0 left-0 text-white">
              <div className="flex gap-4 items-center">
                <i className="text-2xl ri-arrow-down-line"></i>
                <h3 className="text-2xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[55px]"
                src="/ps5.png"
                alt="PS5"
              />
            </div>
          </div>
          <div className="w-full h-screen px-10 bg-black overflow-hidden flex items-center justify-center">
            <div className="cntnr flex text-white w-full h-[80%]">
              <div className="left-image relative w-1/2 h-full">
                <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src="./imag.png" alt="" />
              </div>
              <div className="rg w-[40%]">
                <h1 className="text-8xl">Still Running,</h1>
                <h1 className="text-8xl">Not Hunting</h1>
                <p className="text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <button className="bg-yellow-500 px-5 py-5 text-black mt-10 text-4xl">
                  Download Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default App;
