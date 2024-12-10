"use client";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { useCustomThemeContext } from "../../../app/providers/theme/useCustomThemeProvider";
import classNames from "classnames";
import { cn } from "../../../app/utils/classmerger"

interface Props {
  children?: ReactNode;
  mainTitle: string;
  subtitle?: string;
  mainTitleStyle?: string;
  subtitleStyle?: string;
  image?: ReactNode
}
const BasePage = ({
  children,
  mainTitle,
  subtitle,
  mainTitleStyle,
  subtitleStyle,
  image
}: Props) => {
  const { appearance, getAppearance, currentWindowDimensions } =
    useCustomThemeContext();

    
  return (
    <div>
      <motion.div>
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
          }}
          className={`${cn(
            mainTitleStyle
          )} mt-10 mb-2 text-5xl font-extrabold text-center leading-tight tracking-tighter whitespace-nowrap md:text-6xl lg:text-8xl `}
        >
          {mainTitle}
        </motion.h1>
        <motion.h2
          
          className={`${cn(
            mainTitleStyle
          )} mt-10 mx-10 text-center font-extralight text-wrap whitespace-nowrap tracking-wide text-xl md:text-2xl lg:text-3xl  `}
        >
          {subtitle}
        </motion.h2>
        {children}

        
      </motion.div>
    </div>
  );
};

export default BasePage;
