"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { ThemeContextType } from "./ThemeContext";
import ThemeContext from "@/app/providers/theme/ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
  deps?: any[];
}

const ThemeProvider = ({ children, deps = [] }: ThemeProviderProps) => {
  //I've added this to provide global context of the light mode and dark mode states
  const [appearance, setAppearance] =
    useState<ThemeContextType["appearance"]>("light");
  //I've added this currentWindowDimensions prop to our context to have global access to the window size
  const [currentWindowDimensions, setCurrentWindowDimensions] = useState<
    ThemeContextType["currentWindowDimensions"]
  >({
    width: 1024,
    height: 768,
  });

  const [isClient, setIsClient] = useState(false); // To track if we're on the client

  const getAppearance = (
    lightModeClass: string | string[] | number,
    darkModeClass: string | string[] | number
  ) => {
    return appearance === "light" ? lightModeClass : darkModeClass;
  };

  const toggleTheme = () => {
    setAppearance((prevAppearance) =>
      prevAppearance === "light" ? "dark" : "light"
    );
  };

  const handleResize = () => {
    setCurrentWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(
    () => {
      if (typeof window !== "undefined") {
        setIsClient(true);
        handleResize();
        setCurrentWindowDimensions({
          width: 0,
          height: 0,
        });
      }

      //I noticed that across pages we having issues with getting the correct width and height data
      //When we navigate to a new page, here's the code
      window.addEventListener("load", handleResize);

      // Add event listener
      window.addEventListener("resize", handleResize);

      handleResize(); //Get the initial load

      // Remember to add the Cleanup event listener guys
      return () => {
        window.removeEventListener("load", handleResize);
        window.removeEventListener("resize", handleResize);

        console.log("Resize event listener removed");
      };
    },
    deps ? deps : []
    //Just in case you want configure the useEffect renders here you can pass deps of
  );

  if (!isClient) return null;
  return (
    <ThemeContext.Provider
      value={{
        appearance,
        toggleTheme,
        currentWindowDimensions,
        getAppearance,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
