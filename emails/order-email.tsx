import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

interface CartItem {
  product_id: string;
  link: string;
  name: string;
  image: string;
  price: ProductPrice;
  quantity: number;
  details: {
    label: string;
    value: string;
  }[];
}

interface OrderEmailProps {
  items: CartItem[];
  totalPrice: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
    interestInRealization: boolean;
    projectDescription?: string;
  };
}

export const OrderEmail = ({
  items,
  totalPrice,
  customer,
}: OrderEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("cs-CZ", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  const formatPrice = (amount: number, currency: string = "CZK") => {
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <Html>
      <Head />
      <Preview>
        Nová poptávka od {customer.firstName} {customer.lastName}
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                border: "#e4e4e7",
                foreground: "#09090b",
                primary: {
                  DEFAULT: "#18181b",
                },
                muted: {
                  foreground: "#71717a",
                },
              },
            },
          },
        }}
      >
        <Body className="bg-white my-auto mx-auto font-sans antialiased text-foreground">
          <Container className="border border-solid border-border rounded my-[40px] mx-auto p-[20px] max-w-xl">
            <Heading className="text-2xl font-bold text-center p-0 my-[30px] mx-0 text-foreground">
              Nová poptávka
            </Heading>
            <Text className="text-foreground text-[14px] leading-[24px]">
              Přijata nová poptávka dne {formattedDate}.
            </Text>

            {/* Items Section */}
            <Section className="mt-[32px]">
              <Heading
                as="h2"
                className="text-lg font-semibold mb-4 text-foreground"
              >
                Objednané položky
              </Heading>

              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product_id} className="mb-3">
                    <Link
                      href={item.link}
                      className="text-[16px] font-medium text-foreground hover:underline"
                    >
                      {item.name}
                    </Link>
                    <Text className="m-0 text-[14px] text-muted-foreground mt-1">
                      {item.details.map((detail, i) => (
                        <span key={i}>
                          {detail.label}: {detail.value}
                          {i < item.details.length - 1 && " · "}
                        </span>
                      ))}
                    </Text>
                    <Text className="m-0 text-[14px] text-foreground">
                      Cena:{" "}
                      {formatPrice(item.price.regular, item.price.currency)} ×{" "}
                      {item.quantity} ks
                    </Text>
                  </div>
                ))}
              </div>

              <Hr className="border-border my-4 mx-0 w-full" />

              <Text className="text-lg font-semibold m-0 text-foreground">
                Celková cena: {formatPrice(totalPrice)}
              </Text>
            </Section>

            <Hr className="border-border my-[26px] mx-0 w-full" />

            {/* Customer Contact Section */}
            <Section className="mb-[32px]">
              <Heading
                as="h2"
                className="text-lg font-semibold mb-4 text-foreground"
              >
                Kontaktní údaje zákazníka
              </Heading>

              <div className="space-y-2">
                <Text className="text-foreground text-[14px] m-0 font-semibold">
                  {customer.firstName} {customer.lastName}
                </Text>

                <Text className="text-foreground text-[14px] m-0">
                  📧 Email:{" "}
                  <Link
                    href={`mailto:${customer.email}`}
                    className="text-primary hover:underline"
                  >
                    {customer.email}
                  </Link>
                </Text>

                <Text className="text-foreground text-[14px] m-0">
                  📞 Telefon:{" "}
                  <Link
                    href={`tel:${customer.phone}`}
                    className="text-primary hover:underline"
                  >
                    {customer.phone}
                  </Link>
                </Text>

                <Text className="text-foreground text-[14px] m-0 mt-3">
                  📍 Adresa:
                </Text>
                <Text className="text-foreground text-[14px] m-0 ml-4">
                  {customer.street}
                  <br />
                  {customer.zip} {customer.city}
                </Text>

                {customer.interestInRealization && (
                  <div className="mt-4 bg-green-50 p-3 rounded border border-green-200">
                    <Text className="text-green-800 font-medium text-[14px] m-0">
                      ✅ Zákazník má zájem o realizaci
                    </Text>
                    {customer.projectDescription && (
                      <Text className="text-green-700 text-[13px] m-0 mt-2 italic">
                        &quot;{customer.projectDescription}&quot;
                      </Text>
                    )}
                  </div>
                )}
              </div>
            </Section>

            <Text className="text-muted-foreground text-[12px] text-center mt-[40px]">
              © {new Date().getFullYear()} Vinylové schody. Interní email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OrderEmail;
