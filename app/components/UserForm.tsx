"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@radix-ui/themes";
import { FaArrowCircleRight, FaRegArrowAltCircleRight } from "react-icons/fa";
import { useForm, FieldValues } from "react-hook-form";
import { contactSchema, contactSchemaType } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { MailCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCustomThemeContext } from "../providers/theme/useCustomThemeProvider";
import Link from "next/link";
import { log } from "../utils/logger";
import { apiUrl } from "../utils/urls";
// MEWO
//959
interface Props {
  appearance: string;
}
const UserForm = ({ appearance }: Props) => {
  const [formData, setFormData] = useState<Partial<contactSchemaType>>();
  const [formError, setFormError] = useState(false);
  const [viewButton, setViewButton] = useState(false);
  const { currentWindowDimensions, getAppearance } = useCustomThemeContext();

  console.log("Height: ", currentWindowDimensions?.height!);
  console.log("Width: ", currentWindowDimensions?.width!);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm<contactSchemaType>({ resolver: zodResolver(contactSchema) });

  const handleViewButton = useCallback(() => {
    setTimeout(() => {
      if (isSubmitSuccessful) setViewButton(true);
    }, 1000);
  }, [isSubmitSuccessful]);
  //   Watch Value
  const clientType = watch("clientType");

  useEffect(() => {
    handleViewButton();
  }, [isSubmitSuccessful, handleViewButton]);

  const inputDivStyle = {
    default: `rounded-full h-10 pl-2 font-medium ${
      appearance === "light" ? "text-black" : "text-white"
    } ${appearance === "light" && "bg-slate-200"}`,
    errorMessage: "text-red-500 text-sm pt-2 font-extralight",
  };

  const handleFormSubmit = async (data: FieldValues) => {
    if (!data) {
      console.log("Form submission failed, no data received.");
      return;
    }

    setFormData(data);
    log(data);
    try {
      const response = await axios.post(
        `${apiUrl}/api/contact`,
        data
      );
      if (response.status !== 201) return console.log(response.statusText);
      else return console.log(response.statusText);
    } catch (error) {
      log(error);
    }
  };
  return (
    <motion.div
      className={`flex flex-col justify-center items-center 
        ${
          currentWindowDimensions.width <= 768 ? " space-y-0 " : " space-y-1 "
        }`}
      style={{
        backgroundColor: "none",
        height: "100%",
        boxSizing: "border-box",
        opacity: 1,
        zIndex: currentWindowDimensions.width <= 768 ? 2 : 0,
        maxWidth: "768px",
        minWidth: "360px",
        overflowY: "auto",
        // border: "1px solid red"

        // marginLeft: currentWindowDimensions.width < 959 ? -3 : 0,
      }}
    >
      {!isSubmitSuccessful && (
        <motion.h1
          style={{ marginTop: "0.2em", zIndex: 10 }}
          className="font-extralight underline underline-offset-8 text-3xl -mb-0"
        >
          Contact Form
        </motion.h1>
      )}
      <motion.form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={`flex flex-col justify-start items-center ${
          currentWindowDimensions.width <= 768 &&
          currentWindowDimensions.width > 500
            ? " space-y-2 "
            : currentWindowDimensions.width <= 500
            ? " space-y-1"
            : "space-y-3"
        }`}
        style={{
          padding: currentWindowDimensions.width < 1501 ? "1em" : "3em",
          overflowY: "auto",
          flex: 1,

          height: "80vh",
          width: "95%",
          // marginBottom: "10em",
          display: isSubmitSuccessful ? "none" : "relative",
          backgroundColor: "transparent",
          zIndex: currentWindowDimensions.width <= 768 ? 2 : 0,
          // marginLeft: currentWindowDimensions.width < 959 ? 100 : 0,
        }}
      >
        {/* EMAIL */}

        {/* Name */}
        <div
          className={`flex ${
            currentWindowDimensions.width < 500
              ? "flex-col space-y-2"
              : "flex-row space-x-5"
          } w-full items-center `}
        >
          {/* Firstname */}
          <motion.div className="flex flex-col " style={{ width: "100%" }}>
            <label className="font-extralight ml-1">First name:</label>
            <motion.input
              className={`${inputDivStyle.default} `}
              style={{ borderWidth: "3px", width: "100%" }}
              placeholder="Your first name"
              type="text"
              {...register("firstname", { required: "First name is required" })}
            />
            {errors.firstname && (
              <p className={inputDivStyle.errorMessage}>
                {errors.firstname.message}
              </p>
            )}
          </motion.div>

          {/* Surname */}
          <motion.div className="flex flex-col" style={{ width: "100%" }}>
            <label className="font-extralight ml-1">Last name:</label>
            <motion.input
              className={`${inputDivStyle.default}`}
              style={{ borderWidth: "3px", width: "100%" }}
              placeholder="Your last name"
              type="text"
              {...register("lastname", { required: "Last name is required" })}
            />
            {errors.lastname && (
              <p className={inputDivStyle.errorMessage}>
                {errors.lastname.message}
              </p>
            )}
          </motion.div>
        </div>

        {/* Company or Individual */}
        <motion.div
          className="space-y-1 bg-indigo-500 rounded-lg pt-1 pl-2"
          style={{ width: "100%" }}
        >
          <label className="font-extralight place-items-center">
            Are you a Company or an Individual:
          </label>

          <motion.div
            className={`flex ${
              currentWindowDimensions.width < 552
                ? "flex-row justify-center items-center space-x-12"
                : "flex-row justify-center space-x-4"
            } p-3`}
          >
            {/* Company */}
            <div
              className="flex flex-col items-center justify-center"
              // style={{ border: "1px solid red" }}
            >
              <label className="font-extralight">Company</label>
              <motion.input
                className={`${inputDivStyle.default}`}
                style={{ borderWidth: "3px", width: "100%" }}
                type="radio"
                value="Company"
                checked={clientType === "Company"}
                {...register("clientType", { required: true })}
              />
            </div>
            {/* {errors.email && (
            <p className={inputDivStyle.errorMessage}>
              Please select an option
            </p>
          )} */}

            {/* Individual */}
            <div
              className="flex flex-col items-center justify-center"
              // style={{ border: "1px solid red" }}
            >
              <label className=" font-extralight">Individual</label>
              <motion.input
                className={`${inputDivStyle.default}`}
                style={{ borderWidth: "3px", width: "100%" }}
                type="radio"
                value="Individual"
                checked={clientType === "Individual"}
                {...register("clientType", { required: true })}
              />
            </div>
          </motion.div>

          {/* End of radio box div */}
        </motion.div>
        {errors.email && (
          <p className={inputDivStyle.errorMessage}>Please select an option</p>
        )}
        {/* Work Email */}
        <motion.div style={{ width: "100%" }}>
          <label className="font-extralight">Your email address:</label>
          <motion.input
            className={`${inputDivStyle.default}`}
            placeholder="Work Email"
            style={{ borderWidth: "3px", width: "100%" }}
            type="email"
            {...register("email", { required: "Email is required" })}
          />
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

        <motion.div style={{ width: "100%" }}>
          <label className="font-extralight">
            Tell me more about your goals:
          </label>
          <motion.textarea
            {...register("message", { required: "Phone is required" })}
            className={`font-bold text-gray-500 border border-indigo-500 rounded-lg pl-2 pr-1 pb-9 pt-1 w-full text-wrap ${
              currentWindowDimensions.width < 500 ? "h-22" : "h-32"
            } ${appearance === "light" ? "text-black" : "text-white"}`}
            style={{ borderWidth: "3px", resize: "none", width: "100%" }}
            placeholder="Tell me more about what your goals e.g. We want add blockchain technology to our tech stack"
          />
          {errors.message && (
            <p className={inputDivStyle.errorMessage}>
              {errors.message.message}
            </p>
          )}
        </motion.div>

        <Button
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
          type="submit"
          className=" hover:cursor-pointer"
        >
          Send
          {appearance === "dark" ? (
            <FaArrowCircleRight />
          ) : (
            <FaRegArrowAltCircleRight />
          )}
          {isSubmitting && <Spinner size="1" />}
        </Button>

        {/* Successful Submissions */}
      </motion.form>
      {isSubmitSuccessful && (
        <motion.div className="flex flex-col items-center justify-center text-center p-3 w-full h-full space-y-10">
          <motion.h1 className="text-center tracking-tighter text-3xl flex flex-col items-center justify-center space-y-10 sm:text-4xl lg:text-6xl">
            {`Thank You ${formData?.firstname}!`}

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
            We will be contact with you as soon as possible
          </motion.h2>
          {viewButton && (
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
              <Link
                style={{ zIndex: 100 }}
                target="_blank"
                href="https://calendly.com/csacademymedia"
              >
                <Button
                  onClick={() => router.push("/")}
                  className={`text-nowrap hover:cursor-pointer`}
                  style={{
                    fontSize:
                      currentWindowDimensions?.width! < 512 ? "12px" : "14px",
                  }}
                >
                  View Appointments!
                  {appearance === "dark" ? (
                    <FaArrowCircleRight />
                  ) : (
                    <FaRegArrowAltCircleRight />
                  )}
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserForm;
