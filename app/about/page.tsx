import React from "react";
import { useCustomThemeContext } from "../providers/theme/useCustomThemeProvider";
import { motion } from "framer-motion";
import BasePage from "../components/basecomponents/BasePage";
import Image from "next/image";
const About = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BasePage
        mainTitle="About Me"
        subtitle="I work with multi-disciplinary teams to achieve technical and business
          goals effectively.
          I bring a well-rounded technical expertise to teams that want to
          provide the best experience for their users and drive business growth"
      ></BasePage>
      <Image
        className="rounded-lg mt-10"
        src="/images/ape.png"
        alt="main-image"
        height={500}
        width={500}
      />
    </div>
  );
};

export default About;
