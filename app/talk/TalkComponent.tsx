"use client";
import { motion } from "framer-motion";
import React from "react";
import UserForm from "../components/UserForm";
import { useCustomThemeContext } from "../providers/theme/useCustomThemeProvider";
import { log } from "../utils/logger";

const Talk = () => {
  const { appearance, currentWindowDimensions } = useCustomThemeContext();
  // const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);
  return (
    <motion.div
      style={{
        flex: 1,
        // border: "1px solid red",
        maxWidth: "100vw",
        height: "100vh",
        position: "relative",

        flexDirection: currentWindowDimensions.width <= 768 ? "column" : "row",
      }}
    >
      {currentWindowDimensions.width < 768 && (
        <motion.video
          style={{
            width: "100%",

            height: "100vh",
            position: "absolute",
            objectFit: "cover",
            display: currentWindowDimensions.width > 768 ? "none" : "relative",
            zIndex: 1,
            opacity: 0.3,
          }}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => log("Video loaded successfully")}
          onError={(e) => log("Video error", e)}
        >
          <source src="/videos/spacewalk.mp4" type="video/mp4" />
        </motion.video>
      )}
      {/* <motion.h1
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        // style={{padding: 20}}

        style={{
          fontSize: currentWindowDimensions.width < 445 ? "2.5rem" : "",
        }}
        className=" font-extrabold text-center leading-tight 
          tracking-tighter whitespace-nowrap text-6xl absolute"
      >
        Let Me Help You!
      </motion.h1> */}

      <motion.div
        className="flex flex-row"
        style={{
          maxWidth: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255,255,255,0.15)",
        }}
      >
        {currentWindowDimensions.width >= 768 && (
          <motion.video
            style={{ width: "80vw", height: "100vh", objectFit: "cover" }}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => log("Video loaded successfully")}
            onError={(e) => log("Video error", e)}
          >
            <source src="/videos/spacewalk.mp4" type="video/mp4" />
          </motion.video>
        )}
        <motion.div
          className="flex flex-col items-center justify-center"
          style={{
            overflowY: "auto",
            scrollBehavior: "smooth",
            height: "100vh",
            position: "relative",
            padding: "0em",

            width: currentWindowDimensions.width < 768 ? "100vw" : "",
          }}
        >
          <UserForm appearance={appearance} />
        </motion.div>
        {/* <DemoForm/> */}
      </motion.div>
    </motion.div>
  );
};
// 888px
// 823px
export default Talk;
