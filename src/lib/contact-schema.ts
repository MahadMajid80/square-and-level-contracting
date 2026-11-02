import { z } from "zod";
import { services } from "@/data/services";

export const serviceOptions = [...services.map((s) => s.title), "Something else"] as const;

export const contactSchema = z.object({
  name: z
    .string({ message: "Please enter your name." })
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),
  email: z
    .string({ message: "Please enter your email address." })
    .trim()
    .toLowerCase()
    .max(200)
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(40, "That phone number is too long.")
    .regex(/^[0-9+().\-\s]*$/, "Please use digits, spaces and + ( ) - only.")
    .optional()
    .or(z.literal("")),
  service: z.enum(serviceOptions, { message: "Please choose the type of project." }),
  message: z
    .string({ message: "Please tell us a little about your project." })
    .trim()
    .min(20, "A sentence or two about your project helps — at least 20 characters.")
    .max(5000, "Please keep your message under 5,000 characters."),
  // Anti-spam fields
  company: z.string().max(0).optional().or(z.literal("")), // honeypot: must stay empty
  startedAt: z.coerce
    .number({ message: "Please reload the page and try again." })
    .int()
    .positive("Please reload the page and try again."),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
