import { OrderSummaryEmail } from "@/emails/orderEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "Vinylove schody test <david.urbanek@virtuio.cz>",
      to: ["urbanek.dav@email.cz"],
      subject: "Testovací email - Vinylové schody",
      react: OrderSummaryEmail({
        items: [
          {
            product_id: "1",
            link: "/products/schody-dub",
            name: "Vinylové schody Dub Přírodní",
            image: "https://ui.shadcn.com/placeholder.svg",
            price: { regular: 12500, currency: "CZK" },
            quantity: 1,
            details: [
              { label: "Typ", value: "Rovné" },
              { label: "Povrch", value: "Lakovaný" },
            ],
          },
          {
            product_id: "2",
            link: "/products/listy",
            name: "Přechodová lišta Stříbrná",
            image: "https://ui.shadcn.com/placeholder.svg",
            price: { regular: 450, currency: "CZK" },
            quantity: 2,
            details: [{ label: "Délka", value: "2m" }],
          },
        ],
        totalPrice: 13400,
        customer: {
          firstName: "Jan",
          lastName: "Novák",
          email: "jan.novak@example.com",
          phone: "+420 123 456 789",
          street: "Dlouhá 123",
          city: "Praha",
          zip: "110 00",
          interestInRealization: true,
          projectDescription: "Mám zájem o komplet schodiště.",
        },
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
