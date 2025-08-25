import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
    z.string().email(),
  ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Use letters and numbers"),
  // .max(72, "Password must be at most 72 characters") // if using bcrypt
  username: z.preprocess(
    (v) => (typeof v === "string" ? v.toLowerCase().trim() : v),
    z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(63, "Username must be at most 63 characters")
      .regex(
        /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
        "Username can only contain lowercase letters, numbers, and hyphens. It must start and end with a letter or number.",
      )
      .refine(
        (val) => !val.includes("--"),
        "Username cannot contain double hyphens.",
      ),
  ),
});

export const LoginSchema = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
    z.string().email(),
  ),
  password: z.string(),
});
