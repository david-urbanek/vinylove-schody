import { LeadContact } from "@/components/contact/lead-contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt'",
  description:
    "Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku realizace vinylových schodů a podlah.",
  alternates: {
    canonical: `/kontakt`,
  },
};

export default function ContactPage() {
  return <LeadContact />;
}
