import { z } from "zod";
import type { Translations } from "../i18n";

export function createSignupSchema(t: Translations) {
  return z
    .object({
      name: z
        .string()
        .min(1, t.nameRequired)
        .min(2, t.nameMinLength),
      email: z
        .string()
        .min(1, t.emailRequired)
        .email(t.emailInvalid),
      password: z
        .string()
        .min(1, t.passwordRequired)
        .min(6, t.passwordMinLength)
        .regex(/[A-Z]/, t.passwordUppercase)
        .regex(/[a-z]/, t.passwordLowercase)
        .regex(/[0-9]/, t.passwordNumber),
      confirmPassword: z
        .string()
        .min(1, t.confirmPasswordRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.passwordsMustMatch,
      path: ["confirmPassword"],
    });
}

export type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;
