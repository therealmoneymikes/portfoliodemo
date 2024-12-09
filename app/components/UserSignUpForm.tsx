import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillRocket,
  AiOutlineAlert,
} from "react-icons/ai";
import { useCustomThemeContext } from "../providers/theme/useCustomThemeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner, Badge } from "@radix-ui/themes";
import {
  contactSchemaType,
  userSignUpSchema,
  userSignUpSchemaType,
} from "../utils/schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { FaArrowCircleRight, FaRegArrowAltCircleRight } from "react-icons/fa";
import { MailCheckIcon, DoorClosedIcon } from "lucide-react";
//linear-gradient(155deg, rgb(0, 0, 0) 0%, rgb(11, 0, 74) 38%, rgb(0, 73, 184) 75%, rgb(48, 131, 236) 100%);
import { apiUrl } from "../utils/urls";
interface Props {
  showingModal: boolean;
  onShowModal: (type?: boolean) => void;
}

const UserSignUpForm = ({ showingModal, onShowModal }: Props) => {
  // const [formData, setFormData] = useState<Partial<contactSchemaType>>();
  // const [formError, setFormError] = useState(false);
  // const [viewButton, setViewButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { currentWindowDimensions, appearance } = useCustomThemeContext();
  const [userData, setUserData] = useState<Partial<userSignUpSchemaType>>();
  // const [userExists, setUserExists] = useState<boolean | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const inputDivStyle = {
    default: `rounded-full h-10 pl-2 font-medium ${
      appearance === "light" ? "text-black" : "text-light"
    } ${appearance === "light" && "bg-slate-200"}`,
    errorMessage: "text-red-500 text-sm pt-2 font-extralight",
  };

  console.log("Height: ", currentWindowDimensions?.height!);
  console.log("Width: ", currentWindowDimensions?.width!);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<userSignUpSchemaType>({
    resolver: zodResolver(userSignUpSchema),
  });

  const handleFormSubmit = async (data: FieldValues) => {
    let response;
    if (!data) {
      console.log("Form submission failed, no data received.");
      return;
    }
    setUserData(data);
    console.log(data);
    try {
      // const data = await response.data;
      response = await axios.post(`${apiUrl}/api/signup"`, data);
      if (response.status !== 409 && response.status === 201) {
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409 && error.response?.data.errors) {
          const errors = error.response.data.errors;
          if (Array.isArray(errors)) {
            errors.forEach(
              (serverError: { field: string; message: string }) => {
                setError(serverError.field as keyof userSignUpSchemaType, {
                  type: "server",
                  message: serverError.message,
                });
              }
            );
          }
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`flex flex-col  justify-center items-center ${
          currentWindowDimensions.width <= 768 ? " space-y-3 " : " space-y-4 "
        } rounded-lg`}
        style={{
          padding: currentWindowDimensions.width < 1501 ? "1em" : "3em",
          flex: 1,
          height: !showingModal ? "100%" : "",
          width: "100%",
          maxWidth: "890px",
          maxHeight: showingModal ? "760px" : "100vh",
          // marginBottom: "10em",
          display: isSubmitSuccessful && isError === false ? "none" : "flex",
          background: "rgba(255, 255, 255, 0.15)",
          zIndex: currentWindowDimensions.width <= 768 ? 2 : 0,
          // marginLeft: currentWindowDimensions.width < 959 ? 100 : 0,
        }}
      >
        {isSubmitSuccessful && isError === true && (
          <Badge className="" color="ruby" size="3">
            User Already Exists
            <AiOutlineAlert color="ruby" size={28} />
          </Badge>
        )}
        <motion.div
          onClick={() => onShowModal()}
          className="flex items-center space-x-1 place-self-start hover:cursor-pointer"
        >
          <DoorClosedIcon className="" size={28} color="white" />
          <motion.h5>Back</motion.h5>
        </motion.div>
        <AiFillRocket size={28} />
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 260,
          }}
          style={{
            display: isSubmitSuccessful && isError === false ? "none" : "",
            textAlign:
              currentWindowDimensions.width <= 768 ? "center" : "unset",
          }}
          className={` mt-1 text-4xl font-extralight leading-tight tracking-tighter whitespace-wrap lg:text-5xl `}
        >
          Join Us!
        </motion.h1>

        {/* EMAIL */}

        {/* Name */}
        <div
          className={`flex ${
            currentWindowDimensions.width < 500
              ? "flex-col space-y-5"
              : "flex-row space-x-5"
          } w-full items-center `}
        >
          {/* Firstname */}
          <motion.div className="flex flex-col " style={{ width: "100%" }}>
            <label className="font-extralight ml-1">Email:</label>
            <motion.input
              className={`${inputDivStyle.default} `}
              style={{ borderWidth: "3px", width: "100%" }}
              placeholder="Enter your email"
              type="text"
              {...register("email", { required: "Your email is required" })}
            />
            {errors.email && (
              <p className={inputDivStyle.errorMessage}>
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Confirm Your Email */}
          <motion.div className="flex flex-col" style={{ width: "100%" }}>
            <label className="font-extralight ml-1">Confirm Your Email:</label>
            <motion.input
              className={`${inputDivStyle.default}`}
              style={{ borderWidth: "3px", width: "100%" }}
              placeholder="Confirm your email"
              type="text"
              {...register("confirmEmail", {
                required: "Last name is required",
              })}
            />
            {errors.confirmEmail && (
              <p className={inputDivStyle.errorMessage}>
                {errors.confirmEmail.message}
              </p>
            )}
          </motion.div>
        </div>

        {/* Username */}
        <motion.div className="flex flex-col" style={{ width: "100%" }}>
          <label className="font-extralight ml-1">Username:</label>
          <motion.input
            className={`${inputDivStyle.default}`}
            style={{ borderWidth: "3px", width: "100%" }}
            placeholder="Create your username"
            type="text"
            {...register("username", { required: "User name is required" })}
          />
          {errors.username && (
            <p className={inputDivStyle.errorMessage}>
              {errors.username?.message}
            </p>
          )}
        </motion.div>

        {/* User Email */}
        <motion.div style={{ width: "100%", position: "relative" }}>
          <label className="font-extralight">Password:</label>
          <motion.input
            className={`${inputDivStyle.default}`}
            placeholder="Create a password"
            style={{ borderWidth: "3px", width: "100%" }}
            type={showPassword ? "text" : "password"}
            aria-label={showPassword ? "Hide password" : "Show password"}
            {...register("password", { required: "Email is required" })}
          />
          <motion.span
            style={{ bottom: "0.35rem", right: "1rem" }}
            className={`absolute  hover:cursor-pointer ${
              appearance === "light" ? "text-black" : "text-white"
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEye size={28} />
            ) : (
              <AiFillEyeInvisible size={28} />
            )}
          </motion.span>
          {errors.email && (
            <p className={inputDivStyle.errorMessage}>{errors.email.message}</p>
          )}
        </motion.div>

        {/* Phone Number */}
        <motion.div style={{ width: "100%" }}>
          <label className="font-extralight">Phone:</label>
          <motion.input
            className={`${inputDivStyle.default}`}
            placeholder="Phone Number"
            type="text"
            style={{ borderWidth: "3px", width: "100%" }}
            {...register("phone", { required: "Phone is required" })}
          />
          {errors.phone && (
            <p className={inputDivStyle.errorMessage}>{errors.phone.message}</p>
          )}
        </motion.div>

        <Button
          style={{ display: "flex", alignItems: "center" }}
          type="submit"
          className="hover:cursor-pointer "
          onClick={() => {
            console.log("Submit");
          }}
        >
          Submit
          {appearance === "dark" ? (
            <FaArrowCircleRight />
          ) : (
            <FaRegArrowAltCircleRight />
          )}
          {isSubmitting && <Spinner size="1" />}
        </Button>
      </motion.form>

      {/* Successful Submissions */}
      {isSubmitSuccessful && isError === false && (
        <motion.div className="flex flex-col items-center justify-center text-center p-3 w-full h-full space-y-10">
          <motion.h1 className="text-center tracking-tighter text-3xl flex flex-col items-center justify-center space-y-10 sm:text-4xl lg:text-6xl">
            {`Thank You`}

            <motion.span
              className="place-items-center mt-4"
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "tween",

                stiffness: 60,
                damping: 20,
              }}
            >
              <MailCheckIcon size={120} />
            </motion.span>
          </motion.h1>
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",

              stiffness: 60,
              damping: 20,
            }}
            className="text-2xl font-extralight"
          >
            Your confirmation email will be in your inbox shortly
          </motion.h2>
          {isSubmitSuccessful && isError === false && (
            //512px
            <motion.div
              style={{ zIndex: 1000 }}
              className="mt-10"
              animate={{
                scale: [1, 1.05, 1], // Scaling up and then back to normal
              }}
              transition={{
                duration: 2, // Total duration of one breathing cycle
                repeat: Infinity, // Makes it loop infinitely
                repeatType: "mirror", // Smoothly reverses the animation
                ease: "easeInOut", // Eases in and out for smooth transitions
              }}
            >
              <Button
                onClick={() => onShowModal(false)}
                className={`text-nowrap hover:cursor-pointer`}
                style={{
                  fontSize:
                    currentWindowDimensions?.width! < 512 ? "12px" : "14px",
                }}
              >
                Back To Login
                {appearance === "dark" ? (
                  <FaArrowCircleRight />
                ) : (
                  <FaRegArrowAltCircleRight />
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default UserSignUpForm;
