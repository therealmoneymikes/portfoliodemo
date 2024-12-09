"use client";
import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { Button, Spinner } from "@radix-ui/themes";
import { FaArrowCircleRight, FaRegArrowAltCircleRight } from "react-icons/fa";
import { useForm, FieldValues } from "react-hook-form";
import { contactSchema, contactSchemaType } from "../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AiFillMail, AiOutlineLoading } from "react-icons/ai";
import { cn } from "../utils/classmerger";
// MEWO
interface Props {
  appearance: string;
}
const UserForm = ({ appearance }: Props) => {
  const [formData, setFormData] = useState<Partial<contactSchemaType>>();
  const [formError, setFormError] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: {
      errors,
      isLoading,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
    },
  } = useForm<contactSchemaType>({ resolver: zodResolver(contactSchema) });

  //   Watch Value
  const clientType = watch("clientType");



  const inputDivStyle = {
    default: `rounded-full h-10 pl-2 border border-indigo-500 font-medium text-black ${
      appearance === "light" && "bg-slate-200"
    }`,
    errorMessage: "text-red-500 text-sm pt-2 font-extralight",
  };

  const handleFormSubmit = async (data: FieldValues) => {
    setFormData(data);
    console.log(data);
    try {
      const response = await axios.post(
        "http://172.20.10.5:3000/contact",
        data
      );
      if (response.status !== 201) return console.log(response.statusText);
      else return console.log(response.statusText);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div className="border flex flex-col justify-center">
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 260,
        }}
        className={`mt-10 mb-2 text-4xl font-extrabold text-center leading-tight tracking-tighter whitespace-nowrap md:text-3xl lg:text-4xl `}
      >
        Let Me Help You!
      </motion.h1>

      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className={`flex flex-col items-center justify-center rounded-md p-10 m-10 space-y-8`}
        style={{
          //   minWidth: "350px",
          width: "90%",
          height: "90vh",
        }}
      >
        {/* EMAIL */}

        {/* Name */}
        <div className="flex flex-row w-full items-center gap-x-5">
          {/* Firstname */}
          <motion.div className="flex flex-col " style={{ width: "100%" }}>
            <label className="font-extrabold ml-1">First name:</label>
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
            <label className="font-extrabold ml-1">Last name:</label>
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
          className="space-y-3 bg-indigo-500 border rounded-lg p-5"
          style={{ width: "100%" }}
        >
          <label className="font-extrabold">
            Are you a Company or an Individual:
          </label>

          <motion.div className="flex flex-row mt-3">
            {/* Company */}
            <label className="font-extrabold">Company</label>
            <motion.input
              className={`${inputDivStyle.default}`}
              style={{ borderWidth: "3px", width: "100%" }}
              type="radio"
              {...register("clientType", { required: true })}
            />
            {/* {errors.email && (
            <p className={inputDivStyle.errorMessage}>
              Please select an option
            </p>
          )} */}

            {/* Individual */}
            <label className="font-extrabold">Individual</label>
            <motion.input
              className={`${inputDivStyle.default}`}
              style={{ borderWidth: "3px", width: "100%" }}
              type="radio"
              {...register("clientType", { required: true })}
            />
          </motion.div>

          {/* End of radio box div */}
        </motion.div>
        {errors.email && (
          <p className={inputDivStyle.errorMessage}>Please select an option</p>
        )}
        {/* Work Email */}
        <motion.div style={{ width: "100%" }}>
          <label className="font-extrabold">Your email address:</label>
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
          <label className="font-extrabold">Phone:</label>
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
          <label className="font-extrabold">
            Tell me more about your goals:
          </label>
          <motion.textarea
            {...register("message", { required: "Phone is requried" })}
            className="font-bold text-gray-500 border border-indigo-500 rounded-lg h-32 pl-2 pr-1 pb-9 pt-1 w-full text-wrap "
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
          style={{ display: "flex", alignItems: "center" }}
          type="submit"
          className="hover:cursor-pointer"
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
      </form>

      {isSubmitSuccessful && (
        <motion.div>
          <motion.h1>
            {`Thank You ${formData?.firstname}`!}
            <br />
            We will be contact with you as soon as possible
            <motion.span
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "tween",

                stiffness: 60,
                damping: 20,
              }}
            >
              <AiFillMail />
            </motion.span>
          </motion.h1>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserForm;
