import * as z from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky" }),
  lastName: z.string().min(2, { message: "Příjmení musí mít alespoň 2 znaky" }),
  email: z.string().email({ message: "Neplatný email" }),
  phone: z.string().min(9, { message: "Telefon musí mít alespoň 9 znaků" }),
  address: z.string().min(5, { message: "Adresa musí mít alespoň 5 znaků" }),
  zip: z.string().min(5, { message: "PSČ musí mít alespoň 5 znaků" }),
  message: z.string().min(10, { message: "Zpráva musí mít alespoň 10 znaků" }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
