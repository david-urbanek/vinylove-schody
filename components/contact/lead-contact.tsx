import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { LeadContactForm } from "@/components/contact/lead-contact-form";
import { contactInfo } from "@/data/data";
import { cn } from "@/lib/utils";

interface LeadContactProps {
  className?: string;
}

const LeadContact = ({ className }: LeadContactProps) => {
  return (
    <section className={cn("py-12 md:py-20 bg-muted/30", className)}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column: Info */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-left">
                Kontaktujte nás
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg text-left">
                Máte dotaz nebo zájem o realizaci? Vyplňte formulář a my se Vám
                ozveme co nejdříve. Jsme tu pro Vás a rádi Vám pomůžeme.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <MapPin className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Sídlo společnosti
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <a
                      href={contactInfo.addressLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      {contactInfo.address}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <Mail className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Napište nám</h3>
                  <p className="text-muted-foreground">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <Phone className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Zavolejte nám</h3>
                  <p className="text-muted-foreground">
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      {contactInfo.phone}
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Po-Pá 8:00 - 17:00
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <h3 className="font-semibold text-lg mr-4">Sledujte nás:</h3>
                <div className="flex gap-4">
                  <a
                    href={contactInfo.socials.facebook}
                    className="bg-background border p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="size-5" />
                  </a>
                  <a
                    href={contactInfo.socials.instagram}
                    className="bg-background border p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="size-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <LeadContactForm />
        </div>
      </div>
    </section>
  );
};

export { LeadContact };
