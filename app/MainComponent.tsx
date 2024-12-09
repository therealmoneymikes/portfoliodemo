"use client";

import { Theme } from "@radix-ui/themes";
import React, { ReactNode,useState } from "react";
import Navbar from "./Navbar";
import { useCustomThemeContext } from "./providers/theme/useCustomThemeProvider";

interface Props {
  children: ReactNode;
}
// Due to the no access to react hooks
//I have abstracted the nextjs app logic in here so that we can
//as our hooks to pass the global appearance state
const MainComponent = ({ children }: Props) => {
  const { appearance, getAppearance } = useCustomThemeContext();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // const controlNavbar = () => {
  //   if (typeof window !== "undefined") {
  //     if (window.scrollY > lastScrollY) {
  //       // Scroll down
  //       setIsVisible(false);
  //     } else {
  //       // Scroll up
  //       setIsVisible(true);
  //     }
  //     // Update the last scroll position
  //     setLastScrollY(window.scrollY);
  //   }
  // };

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", controlNavbar);

  //     // Cleanup function to remove event listener when the component unmounts
  //     return () => {
  //       window.removeEventListener("scroll", controlNavbar);
  //     };
  //   }
  // }, [lastScrollY]);
  return (
    //issuetracker\app\assets\beauty-dust-global.mp4
    <Theme
      accentColor="iris"
      appearance={appearance}
      // style={{ border: "2px solid red" }}
    >
      <main
        style={{
          width: "100%",
          height: "100%",
          // overflowX: "hidden",
        }}
        className={`${getAppearance(
          "text-white lightmode-background",
          "white darkmode-background"
        )}  `}
      >
        <Navbar appearance={appearance} scrollVisible={isVisible} />
        <div
          style={{
            width: "100%",
            height: "100vh",
            flex: 1,
          }}
          className="mt-20 "
        >
          {children}
        </div>
      </main>
    </Theme>
  );
};

export default MainComponent;
