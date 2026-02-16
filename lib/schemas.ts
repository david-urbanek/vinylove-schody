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
  interestInRealization: z.boolean(),
  projectDescription: z.string().optional(),
  products: z
    .object({
      id: z.string(),
      quantity: z.number(),
      price: z.object({
        priceWithVAT: z.number(),
        priceWithoutVAT: z.number(),
        currency: z.string(),
      }),
      title: z.string(),
      image: z.string(),
      url: z.string(),
    })
    .array(),
});

export type CheckoutFormType = z.infer<typeof checkoutFormSchema>;
