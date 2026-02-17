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

interface LeadEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  message: string;
}

export const LeadEmail = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  zip,
  message,
}: LeadEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("cs-CZ", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  return (
    <Html>
      <Head />
      <Preview>
        Nová poptávka realizace/konzultace od {firstName} {lastName}
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
              Nová poptávka realizace / konzultace
            </Heading>
            <Text className="text-foreground text-[14px] leading-[24px]">
              Přijata nová poptávka dne {formattedDate}.
            </Text>

            <Hr className="border-border my-[26px] mx-0 w-full" />

            {/* Customer Contact Section */}
            <Section className="mb-[16px]">
              <Heading
                as="h2"
                className="text-lg font-semibold mb-4 text-foreground"
              >
                Kontaktní údaje
              </Heading>

              <div className="space-y-2">
                <Text className="text-foreground text-[14px] m-0 font-semibold">
                  {firstName} {lastName}
                </Text>

                <Text className="text-foreground text-[14px] m-0">
                  📧 Email:{" "}
                  <Link
                    href={`mailto:${email}`}
                    className="text-primary underline"
                  >
                    {email}
                  </Link>
                </Text>

                <Text className="text-foreground text-[14px] m-0">
                  📞 Telefon:{" "}
                  <Link
                    href={`tel:${phone}`}
                    className="text-primary underline"
                  >
                    {phone}
                  </Link>
                </Text>

                <Text className="text-foreground text-[14px] m-0 mt-3">
                  📍 Adresa:
                </Text>
                <Text className="text-foreground text-[14px] m-0 ml-4">
                  {address}
                  <br />
                  {zip}
                </Text>
              </div>
            </Section>

            <Hr className="border-border my-[26px] mx-0 w-full" />

            {/* Message Section */}
            <Section className="mb-[32px]">
              <Heading
                as="h2"
                className="text-lg font-semibold mb-4 text-foreground"
              >
                Zpráva od zákazníka
              </Heading>

              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <Text className="text-foreground text-[14px] m-0 whitespace-pre-wrap leading-relaxed">
                  {message}
                </Text>
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

export default LeadEmail;
