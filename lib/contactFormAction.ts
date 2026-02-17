"use server";

import { LeadEmail } from "@/emails/lead-email";
import { contactFormSchema, ContactFormValues } from "@/lib/contactFormSchema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(data: ContactFormValues) {
  // 1. Server-side validation
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Neplatné údaje ve formuláři.",
      details: result.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, phone, address, zip, message } =
    result.data;

  try {
    // 2. Send email notification to business owner
    await resend.emails.send({
      from: `Kontaktní formulář Web <david.urbanek@virtuio.cz>`,
      to: ["david.urbanek@virtuio.cz"],
      subject: `Nová Realizace/Konzultace - ${firstName} ${lastName}`,
      react: LeadEmail({
        firstName,
        lastName,
        email,
        phone,
        address,
        zip,
        message,
      }),
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      error: "Nepodařilo se odeslat zprávu. Zkuste to prosím později.",
    };
  }

  return {
    success: true,
  };
}
