"use server";

import { CustomerOrderSummaryEmail } from "@/emails/customer-order-email";
import { OrderEmail } from "@/emails/order-email";
import { checkoutFormSchema, CheckoutFormType } from "@/lib/schemas";
import { CartItem } from "@/store/useCartStore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitOrder(
  cartItems: CartItem[],
  prevState: any,
  data: CheckoutFormType,
) {
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
  const enrichedItems = products.map((p) => {
    const originalItem = cartItems.find((ci) => ci.link === p.product_id);
    return {
      product_id: p.product_id,
      name: originalItem?.name || "Unknown Product",
      image: originalItem?.image?.src || "",
      link: originalItem?.link || "",
      quantity: p.quantity,
      price: {
        regular: p.price,
        currency: "CZK",
      },
      details: [],
    };
  });

  const totalPrice = enrichedItems.reduce(
    (sum, item) => sum + item.price.regular * item.quantity,
    0,
  );

  try {
    // 3. Send Email to the businessowner
    await resend.emails.send({
      from: `Nová poptávka Web Vinylové schody <david.urbanek@virtuio.cz>`,
      to: ["david.urbanek@virtuio.cz"],
      subject: `Nová poptávka - ${firstName} ${lastName}`,
      react: OrderEmail({
        items: enrichedItems,
        totalPrice,
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
      react: CustomerOrderSummaryEmail({
        items: enrichedItems,
        totalPrice,
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
