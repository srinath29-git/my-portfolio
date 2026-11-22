import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is a little too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .email("Please enter a valid email address.")
    .max(160, "That email is a little too long."),
  subject: z
    .string()
    .trim()
    .min(2, "Please add a short subject.")
    .max(120, "Please keep the subject under 120 characters."),
  message: z
    .string()
    .trim()
    .min(20, "A little more context, please — at least 20 characters.")
    .max(4000, "Please keep the message under 4,000 characters."),
  company: z.string().max(120).optional(),
  website: z.string().max(0, "Spam detected.").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "subject" | "message" | "form", string>
>;
