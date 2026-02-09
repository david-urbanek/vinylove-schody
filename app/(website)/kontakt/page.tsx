import { LeadContact } from "@/components/lead-contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Vinylové schody",
  description:
    "Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku realizace vinylových schodů a podlah.",
};

export default function ContactPage() {
  return <LeadContact />;
}
