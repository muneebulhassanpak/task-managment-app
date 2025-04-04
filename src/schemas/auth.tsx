import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password must be provided" }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name must be provided" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password must be provided" })
      .refine((val) => val.length >= 6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password must be provided",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type registerSchemaType = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "OTP must be 6 characters long",
  }),
});

export type otpSchemaType = z.infer<typeof otpSchema>;

export const emailVerification = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export type emailVerificationSchemaType = z.infer<typeof emailVerification>;

export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password must be provided" })
      .refine((val) => val.length >= 6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password must be provided",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type passwordResetSchemaType = z.infer<typeof passwordResetSchema>;
