"use client";

import { AiFillCode } from "react-icons/ai";
import { Button } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useCustomThemeContext } from "./providers/theme/useCustomThemeProvider";
import Image from "next/image";
import styles from "./config/styles";
import { useEffect, useState } from "react";
import { FaArrowCircleRight, FaRegArrowAltCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function Home() {
  const { appearance, toggleTheme, getAppearance, currentWindowDimensions } =
    useCustomThemeContext();
  console.log("Height: ", currentWindowDimensions?.height!);
  console.log("Width: ", currentWindowDimensions?.width!);

  //575px is 17 inch height
  //422px is 13.3" inch height

  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(false);
  const renderPitch = (): void => {
    setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    setTimeout(() => {
      setIsButtonVisible(true);
    }, 5000);
  };

  useEffect(() => {
    renderPitch();
  }, []);
  // const resizeIcon = () => {
  //   case currentWindowDimensions?.width
  // }
  const keyfeaturesArray = [
    {
      icon: (
        <AiFillCode
          style={{
            height: "10%",
            width: "10%",
            minWidth: "28",
            minHeight: "28",
          }}
          size={28}
          color={appearance === "light" ? styles.indigoFull : "pink"}
        />
      ),
      title: "Web 3",
    },
    {
      icon: (
        <AiFillCode
          style={{
            height: "10%",
            width: "10%",
            minWidth: "28",
            minHeight: "28",
          }}
          size={28}
          color={appearance === "light" ? styles.indigoFull : "pink"}
        />
      ),
      title: "Frontend",
    },
    {
      icon: (
        <AiFillCode
          style={{
            height: "10%",
            width: "10%",
            minWidth: "28",
            minHeight: "28",
          }}
          size={28}
          color={appearance === "light" ? styles.indigoFull : "pink"}
        />
      ),
      title: "Backend",
    },
  ];

  return (
    <main>
      <div style={{ overflowX: "hidden" }}>
        <motion.video
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            zIndex: "0",
            position: "absolute",
            opacity: 0.4,
          }}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => console.log("Video loaded successfully")}
          onError={(e) => console.log("Video error", e)}
        >
          <source src="/videos/global.mp4" />
        </motion.video>
        <div
          className={`flex flex-col justify-start items-center ${
            currentWindowDimensions?.width! < 768 ? "" : ""
          }`}
          style={{
            objectFit: "fill",
            width: "100vw",
            height: "100vh",
            flex: 1,

            padding: 1,
          }}
        >
          <div className={`mx-0 mr-5 ${appearance === "dark" ? "white" : ""}`}>
            <div
              style={{
                textAlign: "left",

                flexDirection: "column",
                alignItems: "center",
                fontKerning: "auto",
                flex: 1,
              }}
              className="flex flex-col gap-2 "
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="pt-2"
              >
                <Image
                  className="rounded-badge border-purple-950 "
                  src="/images/ape.png"
                  alt="main-image"
                  width={350}
                  height={350}
                />
              </motion.div>
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                }}
                // style={{ textAlign: "center" }}
                className={`mt-3 text-5xl font-extrabold text-center leading-tight tracking-tighter whitespace-nowrap md:text-6xl lg:text-8xl`}
              >
                Hi, I&apos;m{" "}
                <motion.span
                  className={
                    getAppearance(
                      "text-gradient-light",
                      "text-gradient-dark"
                    ) as string
                  }
                >
                  Michael
                </motion.span>
              </motion.h1>
              <h1 className="text-xl  text-center font-extralight  leading-tight tracking-tighter md:text-2xl lg:text-3xl ">
                Fullstack Engineer, Tech Consultant, Web3 Enthusiast
                {/* <br className="hidden sm:inline" /> , Solidity, Typescript, Python,
              React */}
              </h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 20,
                  damping: 20,
                }}
                className="flex flex-column space-x-0 w-full items-center justify-center mt-5"
              >
                {keyfeaturesArray.map((data, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-row w-full space-x-2 justify-center items-center"
                  >
                    {data.icon}
                    <p className="font-extrabold leading-tight lg:text-4xl">
                      {data.title}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/*  */}
          {isVisible && (
            <motion.div
              className={`${
                currentWindowDimensions.height < 500 ? "mt-20" : "mt-10"
              } mx-10 text-wrap whitespace-wrap`}
            >
              <motion.h1
                initial={{ scale: 0 }}
                // animate={{ rotate: 0, scale: 1 }}
                animate={{
                  scale: [1, 1.03, 1], // Scaling up and then back to normal
                }}
                transition={{
                  duration: 2, // Total duration of one breathing cycle
                  repeat: Infinity, // Makes it loop infinitely
                  repeatType: "mirror", // Smoothly reverses the animation
                  ease: "easeInOut", // Eases in and out for smooth transitions
                }}
                // style={{ textAlign: "center" }}
                className={` text-3xl font-extrabold text-center leading-tight tracking-tighter text-wrap whitespace-wrap sm:text-4xl md:text-4xl lg:text-6xl`}
              >
                <span
                  className={
                    appearance === "light"
                      ? "text-gradient-light"
                      : "text-gradient-dark"
                  }
                  style={{ textWrap: "wrap" }}
                >
                  Do you have tech challenge your NEED to solve?
                </span>
              </motion.h1>
            </motion.div>
          )}
          {isButtonVisible && (
            <motion.div className="mt-5 z-10" whileHover={{ scale: 1.02 }}>
              <Button
                onClick={() => router.push("/talk")}
                size="4"
                className=" hover:cursor-pointer"
              >
                Solve it!
                {appearance === "dark" ? (
                  <FaArrowCircleRight />
                ) : (
                  <FaRegArrowAltCircleRight />
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
