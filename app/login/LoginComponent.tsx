
import React from "react";
import { motion } from "framer-motion";
// import UserLogin from "../components/UserLogin";
import { log } from "../utils/logger";
import dynamic from "next/dynamic";

const UserLoginNoSSR = dynamic(() => import("../components/UserLogin"), {ssr: false})
const Login = () => {
  return (
    <motion.div
      style={{
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
        onLoadedData={() => log("Video loaded successfully")}
        onError={(e) => log("Video error", e)}
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
        <UserLoginNoSSR />
      </motion.div>
    </motion.div>
  );
};

export default Login;
