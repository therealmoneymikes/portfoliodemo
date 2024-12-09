"use client";
import React, { ChangeEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AiFillApi,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGoogleCircle,
  AiFillLeftCircle,
  AiFillRightCircle,
} from "react-icons/ai";
import { useCustomThemeContext } from "../providers/theme/useCustomThemeProvider";
import { Button } from "@radix-ui/themes";
import { userLoginSchemaType } from "../utils/schema";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserSignUpForm from "./UserSignUpForm";
import { DoorOpenIcon } from "lucide-react";
import { useAuthContext } from "../providers/auth/useAuthContext";

//linear-gradient(155deg, rgb(0, 0, 0) 0%, rgb(11, 0, 74) 38%, rgb(0, 73, 184) 75%, rgb(48, 131, 236) 100%);

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login, logout, setByThirdParty } = useAuthContext();
  const { currentWindowDimensions, appearance, getAppearance } =
    useCustomThemeContext();
  const router = useRouter();
  const [byEmail, setByEmail] = useState<boolean>(false);
  const [byPassword, setByPassword] = useState<boolean>(false);
  const [userData, setUserData] = useState<userLoginSchemaType>({
    email: "",
    username: "",
    password: "",
  });
  const [userExists, setUserExists] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [byUsername, setByUsername] = useState<boolean>(false);
  const [byGoogle, setByGoogle] = useState<boolean | null>(null);

  const fadeAnimation = {
    initial: { opacity: 0 }, //"initial"
    animate: { opacity: 1 }, // "animate"
    exit: { opacity: 0, transition: { duration: 0.7 } }, //"exit"
  };
  const handleUserLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence mode="wait">
      {!showModal ? (
        <motion.div
          key="login"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeAnimation}
          className="flex items-center justify-center rounded-lg "
          style={{
            marginTop: currentWindowDimensions.width < 570 ? "10px" : "0px",
            height: "100%",
            //   minHeight: -webkit-fill-available.
          }}
        >
          <motion.div
            style={{
              zIndex: "0",
              marginLeft: 2,
              position: "relative",
              width: currentWindowDimensions.width < 570 ? "100vw" : "500px",
              height: currentWindowDimensions.width < 570 ? "55vh" : "300px",
              //   zIndex: "1",
              background: "rgba(255, 255, 255, 0.15)",
              //   border: "2px solid green",
            }}
            className="bg-indigo-500 flex flex-col items-center justify-center space-y-3 w-full rounded-lg"
          >
            {(byEmail || byUsername) && (
              <motion.div
                onClick={() => {
                  if (byEmail) {
                    setByEmail(false);
                    setByUsername(false);
                    console.log("option 1");
                  } else if (byUsername) {
                    setByUsername(false);
                    setByEmail(false);
                    console.log("option 2");
                  }
                }}
                className="flex absolute top-10 left-10 hover:cursor-pointer"
              >
                <DoorOpenIcon className="" />
                <motion.p>Go Back</motion.p>
              </motion.div>
            )}
            <AiFillApi size={28} />
            <motion.h1>Welcome</motion.h1>

            <div
              className="flex flex-col mb-2 space-y-3"
              style={{ width: "85%" }}
            >
              {!byEmail && (
                <motion.button
                  // style={{ cursor: "pointer" }}
                  className="bg-indigo-500 border border-indigo-500 flex 
          flex-row items-center justify-center rounded-md space-x-1 p-2 font-normal hover:cursor-pointer"
                >
                  <div
                    className="flex flex-row items-center space-x-1"
                    onClick={() => setByThirdParty(true)}
                  >
                    <AiFillGoogleCircle size={28} />
                    <Link
                      href="/api/auth/signin"
                      onClick={() => setByThirdParty(true)}
                    >
                      <p className="font-bold">Continue with Google</p>
                    </Link>
                  </div>
                </motion.button>
              )}
              {!byEmail && (
                <motion.button
                  onClick={() => setByEmail(true)}
                  style={{
                    background: "rgba(255, 255, 255, 0.15) ",
                    display: byEmail ? "hidden" : "unset",
                  }}
                  className="hover:cursor-pointer border font-bold p-2 w-full rounded-md  bg-slate-600"
                >
                  Continue with email
                </motion.button>
              )}

              {byEmail && !byUsername && !byPassword && (
                <div>
                  <motion.input
                    style={{ zIndex: 10 }}
                    className="hover:cursor-pointer focus:border border-indigo-500 font-bold p-2 w-full rounded-md  bg-slate-600"
                    placeholder="Email"
                    onChange={handleUserLogin}
                    value={userData.email}
                    name="email"
                    type="email"
                  />
                </div>
              )}
              {byUsername && !byPassword && (
                <div>
                  <motion.input
                    style={{ zIndex: 10 }}
                    className="hover:cursor-pointer focus:border border-indigo-500 font-bold p-2 w-full rounded-md  bg-slate-600"
                    placeholder="Username"
                    onChange={handleUserLogin}
                    value={userData.username}
                    name="username"
                    type="text"
                  />
                </div>
              )}

              {byPassword && (
                <div className="relative">
                  <motion.input
                    onClick={() => {
                      if (byPassword) console.log("Logging in...");
                    }}
                    style={{ zIndex: 10 }}
                    className="hover:cursor-pointer focus:border border-indigo-500 font-bold p-2 w-full rounded-md  bg-slate-600"
                    placeholder="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleUserLogin}
                    type={showPassword ? "text" : "password"}
                  />
                  <motion.span
                    style={{ bottom: "0.35rem", right: "1rem" }}
                    className={`absolute  hover:cursor-pointer ${getAppearance(
                      "text-black",
                      "text-white"
                    )}`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEye color="red" size={28} />
                    ) : (
                      <AiFillEyeInvisible color="white" size={28} />
                    )}
                  </motion.span>
                </div>
              )}

              {(userData.email.length > 0 ||
                (userData.username!.length > 0 && byUsername)) && (
                <motion.div
                  className="mt-4 place-items-center space-x-6
                  flex flex-row justify-between
                  "
                >
                  <Button
                    className="hover:cursor-pointer"
                    onClick={() => {
                      if (byPassword)
                        login(
                          userData.password!,
                          byUsername,
                          userData.email,
                          userData.username
                        );
                      else setByPassword(true);
                    }}
                  >
                    Go <AiFillRightCircle />
                  </Button>
                  {byPassword && (
                    <Button
                      style={{ backgroundColor: "#7f1d1d" }}
                      className="bg-red-900 hover:cursor-pointer"
                      onClick={() => setByPassword(false)}
                    >
                      <AiFillLeftCircle />
                      Back
                    </Button>
                  )}
                </motion.div>
              )}
            </div>

            <p className="text-center">
              Don&apos;t have account yet? Click{" "}
              <span className="underline underline-offset-2">
                <a
                  className="hover:cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Here
                </a>
              </span>
            </p>
            {byEmail && (
              <p
                className="text-center font-extrabold hover:cursor-pointer"
                onClick={() => setByUsername(!byUsername)}
              >
                {!byUsername ? "Login by username" : "Login by email"}
              </p>
            )}

            {isAuthenticated === null && (
              <motion.p className="text-red-600">
                Your email does not exist{" "}
                <span className="underline text-indigo-500">
                  Click here to sign up
                </span>
              </motion.p>
            )}
            {/* <motion.div></motion.div> */}
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="signup"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fadeAnimation}
          // className="border border-red-500"
        >
          <UserSignUpForm
            showingModal={showModal}
            onShowModal={handleShowModal}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserLogin;
