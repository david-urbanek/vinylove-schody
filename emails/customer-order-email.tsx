import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

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

interface CustomerOrderSummaryEmailProps {
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

export const CustomerOrderSummaryEmail = ({
  items,
  totalPrice,
  customer,
}: CustomerOrderSummaryEmailProps) => {
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

  const tax = totalPrice * 0.21;

  return (
    <Html>
      <Head />
      <Preview>Děkujeme za Vaši poptávku</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                border: "#e4e4e7",
                input: "#e4e4e7",
                ring: "#18181b",
                background: "#ffffff",
                foreground: "#09090b",
                primary: {
                  DEFAULT: "#18181b",
                  foreground: "#fafafa",
                },
                secondary: {
                  DEFAULT: "#f4f4f5",
                  foreground: "#18181b",
                },
                destructive: {
                  DEFAULT: "#ef4444",
                  foreground: "#fafafa",
                },
                muted: {
                  DEFAULT: "#f4f4f5",
                  foreground: "#71717a",
                },
                accent: {
                  DEFAULT: "#f4f4f5",
                  foreground: "#18181b",
                },
              },
            },
          },
        }}
      >
        <Body className="bg-white my-auto mx-auto font-sans antialiased text-foreground">
          <Container className="border border-solid border-border rounded my-[40px] mx-auto p-[20px] max-w-xl">
            <Heading className="text-2xl font-bold text-center p-0 my-[30px] mx-0 text-foreground">
              Děkujeme za poptávku
            </Heading>
            <Text className="text-foreground text-[14px] leading-[24px]">
              Dobrý den,
            </Text>
            <Text className="text-foreground text-[14px] leading-[24px]">
              Děkujeme za Váš zájem. Ozveme se Vám do 48 hodin. Níže naleznete
              souhrn Vaší poptávky vytvořené dne {formattedDate}.
            </Text>

            <Section className="mt-[32px]">
              <Heading
                as="h2"
                className="text-lg font-semibold mb-4 text-foreground"
              >
                Souhrn objednávky
              </Heading>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <React.Fragment key={item.product_id}>
                    <Row className="mb-4">
                      <Column className="w-[80px] align-top">
                        <Img
                          src={item.image}
                          alt={item.name}
                          width="80"
                          height="80"
                          className="rounded-lg object-cover border border-solid border-border"
                        />
                      </Column>
                      <Column className="pl-4 align-top">
                        <Link
                          href="https://google.com"
                          className="m-0 font-medium text-[16px] text-foreground"
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
                      </Column>
                      <Column className="text-right align-top w-[100px]">
                        <Text className="m-0 font-semibold text-[16px] text-foreground">
                          {formatPrice(item.price.regular, item.price.currency)}
                        </Text>
                        <Text className="m-0 text-[14px] text-muted-foreground mt-1">
                          Množství: {item.quantity}
                        </Text>
                      </Column>
                    </Row>
                    {index < items.length - 1 && (
                      <Hr className="border-border my-4 mx-0 w-full" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Section>

            <Hr className="border-border my-[26px] mx-0 w-full" />

            <Section>
              <Row>
                <Column className="w-1/2">
                  <Text className="text-muted-foreground text-[14px] m-0">
                    Mezisoučet
                  </Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="text-foreground text-[14px] m-0 font-normal">
                    {formatPrice(totalPrice)}
                  </Text>
                </Column>
              </Row>
              <Row className="mt-2">
                <Column className="w-1/2">
                  <Text className="text-muted-foreground text-[14px] m-0">
                    Doprava
                  </Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="text-foreground text-[14px] m-0">
                    Bude vypočítána
                  </Text>
                </Column>
              </Row>
              <Row className="mt-2">
                <Column className="w-1/2">
                  <Text className="text-muted-foreground text-[14px] m-0">
                    Odhadovaná daň
                  </Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="text-foreground text-[14px] m-0">
                    {formatPrice(tax)}
                  </Text>
                </Column>
              </Row>
              <Hr className="border-border my-4 mx-0 w-full" />
              <Row>
                <Column className="w-1/2">
                  <Text className="text-lg font-semibold m-0 text-foreground">
                    Celkem
                  </Text>
                </Column>
                <Column className="w-1/2 text-right">
                  <Text className="text-lg font-semibold m-0 text-foreground">
                    {formatPrice(totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-border my-[26px] mx-0 w-full" />

            <Section className="mb-[32px]">
              <Row>
                <Column className="w-1/2 align-top">
                  <Heading
                    as="h2"
                    className="text-lg font-semibold mb-2 text-foreground"
                  >
                    Doručovací údaje
                  </Heading>
                  <Text className="text-foreground text-[14px] m-0">
                    {customer.firstName} {customer.lastName}
                  </Text>
                  <Text className="text-foreground text-[14px] m-0">
                    {customer.street}
                  </Text>
                  <Text className="text-foreground text-[14px] m-0">
                    {customer.zip} {customer.city}
                  </Text>
                  <Text className="text-foreground text-[14px] m-0 mt-2">
                    {customer.phone}
                  </Text>
                  <Text className="text-foreground text-[14px] m-0">
                    {customer.email}
                  </Text>
                </Column>
                <Column className="w-1/2 align-top">
                  <Heading
                    as="h2"
                    className="text-lg font-semibold mb-2 text-foreground"
                  >
                    Realizace
                  </Heading>
                  {customer.interestInRealization ? (
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <Text className="text-green-800 font-medium text-[14px] m-0 flex items-center">
                        ✅ Má zájem o realizaci
                      </Text>
                      {customer.projectDescription && (
                        <Text className="text-green-700 text-[13px] m-0 mt-2 italic">
                          &quot;{customer.projectDescription}&quot;
                        </Text>
                      )}
                    </div>
                  ) : (
                    <Text className="text-muted-foreground text-[14px] m-0">
                      Bez realizace
                    </Text>
                  )}
                </Column>
              </Row>
            </Section>

            <Text className="text-muted-foreground text-[12px] text-center mt-[40px]">
              © {new Date().getFullYear()} Vinylové schody. Všechna práva
              vyhrazena.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CustomerOrderSummaryEmail;
