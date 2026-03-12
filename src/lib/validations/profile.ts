import { z } from "zod";

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .trim(),
  bio: z
    .string()
    .max(500, "Bio must be at most 500 characters")
    .trim()
    .optional()
    .default(""),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const legalOnboardingSchema = z.object({
  role: z.enum(["youth", "business", "creative", "partner"], {
    message: "Please select how you'll use Ecodia",
  }),
  over18Confirmed: z.literal(true, {
    message: "You must confirm you are 18 or older",
  }),
  tosAccepted: z.literal(true, {
    message: "You must accept the Terms of Service",
  }),
  privacyAccepted: z.literal(true, {
    message: "You must accept the Privacy Policy",
  }),
});

export type LegalOnboardingInput = z.infer<typeof legalOnboardingSchema>;

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
