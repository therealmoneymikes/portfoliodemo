import { z } from "zod";

export const contactSchema = z.object({
  firstname: z.string().min(2, "First name is required").max(50),
  lastname: z.string().min(2, "Last name is required").max(50),
  clientType: z.enum(["Individual", "Company"]),
  // isCompany: z.boolean(),
  email: z.string().min(5, "Your email is required").email(),
  phone: z.string().min(2, "Your Phone Number is required").max(22),
  message: z.string().min(5, "Description is required").max(500),
});

export type contactSchemaType = z.infer<typeof contactSchema>;

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(8, "Password must be 8 characters long").optional(),
  username: z.string().min(5, "Username must be 5 characters long").optional(),
});

export const userSignUpSchema = z
  .object({
    email: z.string().min(6, "Your email is required").email().max(100),
    confirmEmail: z.string().min(2, "Your email is required").max(100),
    username: z.string().min(2, "Username is required").max(50),
    password: z
      .string()
      .min(8, "Your password must be at least 8 characters long"),
    phone: z.string().min(2, "Your Phone Number is required").max(22),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
  });

export type userLoginSchemaType = z.infer<typeof userLoginSchema>;
export type userSignUpSchemaType = z.infer<typeof userSignUpSchema>;
