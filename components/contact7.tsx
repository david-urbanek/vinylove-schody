import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDescription?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  chatLabel?: string;
  chatDescription?: string;
  chatLink?: string;
  className?: string;
}

const Contact7 = ({
  title = "Kontaktujte nás",
  description = "Máte dotaz nebo zájem o nezávaznou poptávku? Ozvěte se nám.",
  emailLabel = "Email",
  emailDescription = "Odpovídáme obvykle do 24 hodin.",
  email = "info@vinylove-schody.cz",
  officeLabel = "Kancelář / Showroom",
  officeDescription = "Navštivte nás po předchozí domluvě.",
  officeAddress = "Pražská 123, Brno",
  phoneLabel = "Telefon",
  phoneDescription = "Jsme k dispozici Po-Pá, 8:00 - 17:00.",
  phone = "+420 123 456 789",
  chatLabel = "WhatsApp",
  chatDescription = "Napište nám rychle přes WhatsApp.",
  chatLink = "Zahájit chat",
  className,
}: Contact7Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="mb-14">
          <h2 className="mt-2 mb-3 text-3xl font-bold text-balance md:text-4xl">
            {title}
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-muted p-6">
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{emailLabel}</p>
            <p className="mb-3 text-muted-foreground">{emailDescription}</p>
            <a
              href={`mailto:${email}`}
              className="font-semibold hover:underline"
            >
              {email}
            </a>
          </div>
          <div className="rounded-lg bg-muted p-6">
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <MapPin className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{officeLabel}</p>
            <p className="mb-3 text-muted-foreground">{officeDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {officeAddress}
            </a>
          </div>
          <div className="rounded-lg bg-muted p-6">
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>
            <p className="mb-3 text-muted-foreground">{phoneDescription}</p>
            <a href={`tel:${phone}`} className="font-semibold hover:underline">
              {phone}
            </a>
          </div>
          <div className="rounded-lg bg-muted p-6">
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <MessageCircle className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{chatLabel}</p>
            <p className="mb-3 text-muted-foreground">{chatDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {chatLink}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact7 };
