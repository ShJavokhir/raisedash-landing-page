import { z } from "zod";
import { getDemoProduct } from "@/data/demo";

export const demoRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Use 100 characters or fewer."),
  email: z.string().trim().toLowerCase().max(254).email("Enter a valid email address."),
  company: z.string().trim().max(150, "Use 150 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((value) => {
      if (!value) return true;
      const digits = value.replace(/\D/g, "");
      return /^[+\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
    }, "Enter a valid phone number, including your country code."),
  interests: z
    .string()
    .trim()
    .min(2, "Tell us which products you’re interested in.")
    .max(1200, "Use 1,200 characters or fewer."),
  companyWebsite: z.string().max(200),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;

export const demoRequestApiSchema = demoRequestSchema.extend({
  product: z.string().max(100).optional(),
  turnstileToken: z.string().max(2048).optional(),
  eventId: z.string().max(100).optional(),
});

/** Plain text, bounded well below Telegram's 4,096-character message limit. */
export function formatProductDemoMessage(data: DemoRequest, product?: string): string {
  return [
    "New product demo request",
    `Date: ${new Date().toISOString()}`,
    "",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Company: ${data.company || "Not provided"}`,
    `Product page: ${getDemoProduct(product)?.name || "General inquiry"}`,
    "",
    "Products interested in / notes:",
    data.interests,
    "",
    "Source: /get-a-demo",
  ].join("\n");
}
