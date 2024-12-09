"use client";
import Link from "next/link";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import {
  AiFillHome,
  AiFillDashboard,
  AiFillAlert,
  AiFillMoon,
  AiFillSun,
  AiOutlineMenu,
  AiFillRobot,
  AiFillGithub,
  AiOutlineUser,
  AiFillCloud,
} from "react-icons/ai";
import {
  Box,
  Flex,
  TextField,
  DropdownMenu,
  Button,
  Avatar,
} from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useCustomThemeContext } from "./providers/theme/useCustomThemeProvider";
import { siteConfig } from "./config/site";
import { useRouter } from "next/navigation";
import styles from "./config/styles";
import { useAuthContext } from "./providers/auth/useAuthContext";
import { useSession } from "next-auth/react";
import { DoorOpen } from "lucide-react";
import UserDropdown from "./components/UserDropdown";

interface Props {
  appearance: string;
  scrollVisible: boolean;
}

const fallbackImg =
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop";

const Navbar = ({ appearance, scrollVisible }: Props) => {
  //usePathname Hook
  const session = useSession();

  const currentPath = usePathname();
  const router = useRouter();
  const { toggleTheme, currentWindowDimensions, getAppearance } =
    useCustomThemeContext();

  const [animationKey, setAnimationKey] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isLeaving, setIsLeaving] = useState<boolean>(false);

  console.log(inputText);

  const { isAuthenticated, logout, login, byThirdParty } = useAuthContext();

  const handleInputField = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
    console.log(e.target.value);
    console.log(isAuthenticated);
  };

  const handleInputFieldSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      router.push("/api/results", {});
      //api/results is the endpoint to trif
    } catch (error) {
      console.error("Error", error);
    }
  };

  const restartBugAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const navlinks = [
    {
      icon: <AiFillHome size={24} />,
      label: "Home",
      href: "/",
    },
    { icon: <AiFillDashboard size={24} />, label: "About Me", href: "/about" },
    { icon: <AiFillCloud size={24} />, label: "Blog", href: "/blog" },

    { icon: <AiFillAlert size={24} />, label: "Let's Talk", href: "/talk" },
    {
      icon:
        (isAuthenticated === false && session.status === "unauthenticated") ||
        session.status === "unauthenticated" ? (
          <AiOutlineUser size={24} />
        ) : (
          <Avatar
            src={
              session.status === "authenticated"
                ? (session.data?.user?.image as string | undefined)
                : fallbackImg
            }
            fallback="A"
            color="indigo"
            size={currentWindowDimensions?.width! < 889 ? "1" : "2"}
            onClick={() => {
              setIsLeaving(true);
              if (!byThirdParty) {
                logout();
              } else if (byThirdParty) {
              }
            }}
          />
        ),
      label:
        session.status === "authenticated"
          ? session.data?.user?.name!
          : isAuthenticated && !byThirdParty
          ? "Logout"
          : "Login",
      href: "/login",
    },
  ];
  // git lfs push --all origin main
  //git config --global http.postBuffer 157286400
  //git config --global http.maxRequestBuffer 200M
  //git config lfs.https://<remote_repo_url>/info/lfs.locksverify false
  //git lfs install
  //git config --global url."https://github.com/".insteadOf git@github.com:
  //Start-Service ssh-agent
  //Set-Service ssh-agent -StartupType Automatic

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 60,
        }}
        style={{
          backgroundColor: appearance === "light" ? "#0a0a0a" : "#000000",
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
      >
        {/* 860px last width where text nav looks good*/}
        <Box className="space-x-4">
          {currentWindowDimensions?.width! < 889 ? (
            <Box>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="solid">
                    {currentWindowDimensions?.width! > 0 &&
                    currentWindowDimensions?.width! < 601 ? (
                      <AiOutlineMenu />
                    ) : (
                      "Navigate"
                    )}
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  {navlinks.map((link, index) => (
                    <>
                      <Link
                        onClick={() => console.log(index)}
                        key={index}
                        href={link.href}
                        className="flex justify-items-center items-center space-x-2 space-y-1 hover:cursor-pointer bg-inherit w-full"
                      >
                        <span
                          // className="hover:cursor-pointer"
                          color={classnames(getAppearance("green", "black"))}
                        >
                          {link.icon}
                        </span>
                        <motion.div
                          className="hover:cursor-pointer "
                          onClick={() => {
                            if (index === navlinks.length - 1) {
                              if (!byThirdParty) {
                                logout();
                              } else if (byThirdParty) {
                                console.log("Logging out by third party");
                              }
                            }
                          }}
                          onMouseEnter={
                            index === navlinks.length - 1
                              ? () => setIsLeaving(true)
                              : () => console.log("")
                          }
                          onMouseLeave={() => {
                            setTimeout(() => setIsLeaving(false), 5000);
                          }}
                        >
                          <DropdownMenu.Item>{link.label}</DropdownMenu.Item>
                        </motion.div>
                      </Link>
                    </>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Box>
          ) : (
            <ul
              className="flex space-x-6 justify-start items-center flex-1 flex-grow"
              style={{ minWidth: "600px" }}
            >
              {navlinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classnames({
                    "text-white bg-indigo-500 p-2 rounded-badge flex":
                      link.href === currentPath &&
                      (appearance === "light" || appearance === "dark") &&
                      index !== navlinks.length - 1,

                    "": link.href !== currentPath && appearance === "light",
                    "text-white":
                      link.href !== currentPath && appearance === "dark",
                    "hover:text-yellow-400 transition-colors flex items-center cursor-pointer":
                      appearance === "light" || appearance === "dark",
                  })}
                >
                  <div className="flex-0">
                    {session.status === "unauthenticated" &&
                    index === navlinks.length - 1 ? (
                      <div className="flex flex-row">
                        <div className="mx-1">{link.icon}</div>
                        <p>{link.label}</p>
                      </div>
                    ) : session.status === "authenticated" &&
                      index === navlinks.length - 1 ? (
                      <UserDropdown
                        name={session.data?.user?.name!}
                        userProfilePicture={
                          session.data?.user?.image
                            ? session.data?.user.image!
                            : fallbackImg
                        }
                      />
                    ) : (
                      <div className="flex flex-row">
                        <div className="mx-1">{link.icon}</div>
                        <p>{link.label}</p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </ul>
          )}
        </Box>

        {session.status === "authenticated" && (
          <motion.div className="flex items-center justify-center">
            <motion.p className="font-extralight">
              Hello {session && <span>{session.data?.user?.name}!, </span>}
            </motion.p>
            <Link
              href="/api/auth/signout"
              className="hover:text-red-500 font-extrabold"
            >
              <span className="ml-1"> Sign Out</span>
            </Link>
          </motion.div>
        )}

        <Flex className="items-center justify-between space-x-4 ">
          {currentWindowDimensions?.width! >= 850 ? (
            <motion.div className="flex-shrink-0 ">
              <TextField.Root
                placeholder="Search Here…"
                onChange={handleInputField}
                value={inputText}
                className={` p-2 ${
                  currentWindowDimensions?.width! > 900 &&
                  openSearch &&
                  inputText.length > 0
                    ? "ml-5 mr-3"
                    : ""
                }`}
              >
                <TextField.Slot className="hover:cursor-pointer">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 50,
                    }}
                  >
                    {inputText.length > 0 &&
                      currentWindowDimensions?.width! > 801 && (
                        <Button
                          onClick={handleInputFieldSearch}
                          className=" hover:cursor-pointer"
                        >
                          Go!
                        </Button>
                      )}
                  </motion.div>
                </TextField.Slot>
              </TextField.Root>
            </motion.div>
          ) : (
            <div className="flex justify-center space-x-4 items-center ">
              {openSearch && currentWindowDimensions?.width! < 850 ? (
                <motion.div className="w-fit">
                  <TextField.Root
                    placeholder="Search Here…"
                    onChange={handleInputField}
                    value={inputText}
                    className={`${
                      currentWindowDimensions?.width! < 900 &&
                      openSearch &&
                      inputText.length > 0
                        ? "ml-5 mr-3"
                        : ""
                    }`}
                  >
                    {/* go button  */}

                    {inputText.length > 0 &&
                      (openSearch ||
                        (!openSearch &&
                          currentWindowDimensions?.width! > 801)) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          exit={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        >
                          {/* No Reaction */}
                          <Button
                            onClick={handleInputFieldSearch}
                            className="hover:cursor-pointer"
                          >
                            Go!
                          </Button>
                        </motion.div>
                      )}
                  </TextField.Root>
                </motion.div>
              ) : (
                openSearch &&
                currentWindowDimensions?.width! < 900 &&
                currentWindowDimensions?.width! && (
                  <motion.div className="w-full">
                    <TextField.Root
                      placeholder="Search Here..."
                      onChange={handleInputField}
                      value={inputText}
                    />
                  </motion.div>
                )
              )}
              <MagnifyingGlassIcon
                onClick={() => setOpenSearch(!openSearch)}
                className={`hover:cursor-pointer transition-opacity ${getAppearance(
                  "text-white rounded-badge bg-indigo-500",
                  "bg-indigo-500 text-white rounded-badge"
                )}
              ${
                currentWindowDimensions?.width! < 900 &&
                openSearch &&
                inputText.length > 0 &&
                "flex-grow-1 flex-1"
              }`}
                height="32"
                width="32"
              />
            </div>
          )}

          {/* Github Logo */}
          <Link href={siteConfig.links.github}>
            <AiFillGithub size={28} />
          </Link>

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
        </Flex>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
