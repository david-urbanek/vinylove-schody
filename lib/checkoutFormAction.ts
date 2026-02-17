"use server";

import { CustomerOrderEmail } from "@/emails/customer-order-email";
import { OrderEmail } from "@/emails/order-email";
import { checkoutFormSchema, CheckoutFormType } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitOrder(data: CheckoutFormType) {
  // 1. Validation on server side
  const result = checkoutFormSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Neplatné údaje ve formuláři.",
      details: result.error.flatten().fieldErrors,
    };
  }

  const {
    products,
    firstName,
    lastName,
    email,
    phone,
    street,
    city,
    zip,
    interestInRealization,
    projectDescription,
  } = result.data;

  // 2. Prepare data for email

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price.priceWithVAT * item.quantity,
    0,
  );

  const totalPriceWithoutVAT = products.reduce(
    (sum, item) => sum + item.price.priceWithoutVAT * item.quantity,
    0,
  );

  try {
    // 3. Send Email to the businessowner
    await resend.emails.send({
      from: `Nová poptávka Web Vinylové schody <david.urbanek@virtuio.cz>`,
      to: ["david.urbanek@virtuio.cz"],
      subject: `Nová poptávka - ${firstName} ${lastName}`,
      react: OrderEmail({
        products,
        totalPrice,
        totalPriceWithoutVAT,
        customer: {
          firstName,
          lastName,
          email,
          phone,
          street,
          city,
          zip,
          interestInRealization,
          projectDescription,
        },
      }),
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "Nepodařilo se odeslat poptávku. Zkuste to prosím později.",
    };
  }

  try {
    // 4. Send Email to the customer
    await resend.emails.send({
      from: "Vinylové schody <david.urbanek@virtuio.cz>",
      to: [email, "david.urbanek@virtuio.cz"],
      subject: `Potvrzení poptávky - Vinylové schody`,
      react: CustomerOrderEmail({
        products,
        totalPrice,
        totalPriceWithoutVAT,
        customer: {
          firstName,
          lastName,
          email,
          phone,
          street,
          city,
          zip,
          interestInRealization,
          projectDescription,
        },
      }),
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "Nepodařilo se odeslat poptávku. Zkuste to prosím později.",
    };
  }

  // Redirect to thank you page on success (outside try-catch)
  return {
    success: true,
  };
}
