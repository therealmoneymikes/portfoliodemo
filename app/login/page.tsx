"use client";
import React from "react";
import { motion } from "framer-motion";
import UserLogin from "../components/UserLogin";


const login = () => {  
  return (
    <motion.div
      style={{
        // width: "100vw",
        // height: "100vh",
        overflowY: "hidden",
      }}
    >
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
        <source src="/videos/nightlake.mp4" />
      </motion.video>

      <motion.div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px",

          // alignItems: currentWindowDimensions.width < 570 ? "center" : "center",
          // justifyContent:
          //   currentWindowDimensions.width < 570 ? "start" : "center",
        }}
      >
        <UserLogin />
      </motion.div>
    </motion.div>
  );
};

export default login;
