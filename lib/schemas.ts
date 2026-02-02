import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, "Jméno je povinné"),
  lastName: z.string().min(2, "Příjmení je povinné"),
  email: z.string().email("Neplatný email"),
  phone: z.string().min(9, "Telefon je povinný"),
  street: z.string().min(2, "Ulice a číslo popisné jsou povinné"),
  city: z.string().min(2, "Město je povinné"),
  zip: z.string().min(5, "PSČ je povinné"),
  orderNote: z.string().optional(),
  interestInRealization: z.boolean().default(false),
  projectDescription: z.string().optional(),
  products: z
    .object({
      product_id: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
    .array(),
});

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;
