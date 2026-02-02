"use server";

import { OrderSummaryEmail } from "@/emails/orderEmail";
import { checkoutFormSchema, CheckoutFormType } from "@/lib/schemas";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitOrder(
  data: CheckoutFormType & { cartItems: any[] },
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
  // We need to merge form product data (quantity) with actual cart details (image, name, details)
  // passed from the client as 'cartItems'.
  // Note: In a real app, you should re-fetch prices from DB to prevent tampering.
  // For now, we trust the passed data as per the user's current setup.

  const enrichedItems = products.map((p) => {
    const originalItem = data.cartItems.find(
      (ci) => ci.product_id === p.product_id,
    );
    return {
      ...originalItem,
      quantity: p.quantity,
      price: {
        regular: p.price,
        currency: "CZK", // Assuming CZK for now, or pass it from client
      },
    };
  });

  const totalPrice = enrichedItems.reduce(
    (sum, item) => sum + item.price.regular * item.quantity,
    0,
  );

  try {
    // 3. Send Email
    await resend.emails.send({
      from: "Vinylové schody <david.urbanek@virtuio.cz>", // Or your verified sender
      to: [email, "david.urbanek@virtuio.cz"], // Send to customer and copy to admin (optional)
      subject: `Potvrzení poptávky - Vinylové schody`,
      react: OrderSummaryEmail({
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

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: "Nepodařilo se odeslat poptávku. Zkuste to prosím později.",
    };
  }
}
