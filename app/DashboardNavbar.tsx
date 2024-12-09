"use client";
import { motion } from "framer-motion";
import React, { ChangeEvent, useEffect, useState } from "react";
import DashboardDropdown from "./components/DashboardDropdown";
import { Avatar, Box, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { TailwindProps } from "@react-email/components";
import { useCustomThemeContext } from "./providers/theme/useCustomThemeProvider";
import Link from "next/link";
import { useAuthContext } from "./providers/auth/useAuthContext";
import styles from "./config/styles";
import { AiFillSun, AiFillMoon, AiFillRobot } from "react-icons/ai";
import { log } from "./utils/logger";

const fallbackImage =
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop";
const dashboardOptions = [
  "Overview",
  "Products",
  "Settings",
  "Back To Main Site",
];

interface Props {
  tailwindStyling?: HTMLElement["className"];
}

const DashboardNavbar = ({ tailwindStyling }: Props) => {
  const session = useSession();
  const { getAppearance, toggleTheme, currentWindowDimensions, appearance } =
    useCustomThemeContext();
  const { isAuthenticated, byThirdParty, logout } = useAuthContext();
  const [openSearch, setOpenSearch] = useState(false);
  const [inputText, setInputText] = useState("");
  const [animationKey, setAnimationKey] = useState(0);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleInputField = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
    log(e.target.value);
    log(isAuthenticated);
  };
  const restartBugAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  useEffect(() => {
    const nextAuth = localStorage.getItem("jwt");
    const normalAuth = localStorage.getItem("jwt-main");

    if (nextAuth?.length! > 0 || normalAuth?.length! > 0) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <nav
      style={{
        backgroundColor: appearance === "inherit" ? "#0a0a0a" : "#000000",
        color: "white",
        transition: "top 0.3s",
        position: "fixed",
        display: "flex",
        top: "0",
        width: "100%",
        zIndex: 1000,
        height: "5em",
      }}
      className={` justify-between w-full mb-44 items-center p-3 font-extralight`}
      //   className=" mx-5 my-5 flex flex-row items-center justify-between space-x-6 w-full"
    >
      <motion.div className="mx-2 flex flex-row items-center space-x-3">
        {/* <DashboardDropdown /> */}
        <ul className="flex flex-row space-x-4 font-medium text-gray-500">
          {dashboardOptions.map((option, index) => (
            <div key={index}>
              <Link href={index === dashboardOptions.length - 1 ? "/" : ""}>
                <li>{option}</li>
              </Link>
            </div>
          ))}
        </ul>
      </motion.div>

      <motion.div className="flex flex-row items-center space-x-3">
        {session && session.status === "authenticated" && (
          <motion.div className="flex items-center justify-center mr-10">
            <motion.p className="font-extralight">
              Hello {session && <span>{session.data?.user?.name}!, </span>}
            </motion.p>
            <Link
              onClick={logout}
              href={byThirdParty ? "/api/auth/signout" : "/login"}
              className="hover:text-red-500 font-extrabold"
            >
              <span className="ml-1"> Sign Out</span>
            </Link>
          </motion.div>
        )}
        <TextField.Root placeholder="Search…" style={{ width: "350px" }}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <motion.div>
          <Avatar
            fallback=""
            width={25}
            height={25}
            src={session.data?.user?.image! ?? fallbackImage}
            alt="user"
            className="rounded-3xl"
          />
        </motion.div>

        {/* Light Mode Dark Mode Toggle */}
        <motion.div
          onClick={() => setAnimationKey((prev) => prev + 1)}
          key={animationKey}
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            rotate: 360,
            accentColor: styles.indigoTailwind,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* */}
          <Box
            ml="2"
            onClick={() => {
              toggleTheme();
              restartBugAnimation();
            }}
            className="hover:cursor-pointer"
          >
            {appearance === "dark" ? (
              <AiFillSun size={28} color="orange" />
            ) : appearance === "light" ? (
              <AiFillMoon size={28} color={styles.indigoTailwind} />
            ) : (
              appearance === "inherit" && <AiFillRobot size={28} />
            )}
          </Box>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default DashboardNavbar;
