"use client";

import {
  LucideIcon,
  MapPin,
  MessageSquareMore,
  Phone,
  Plus,
  Send,
} from "lucide-react";
import { Fragment } from "react";
import { siFacebook, siInstagram, SimpleIcon } from "simple-icons";

import { contactInfo } from "@/data/data";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import { ConsultationForm } from "@/components/forms/consultation-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type NewsletterData = {
  title?: string;
  description?: string;
};

type InfoItem = {
  text: string;
  title: string;
  link?: string;
  icon: LucideIcon;
};

type FooterLink = {
  text: string;
  link?: string;
};

type SocialLink = {
  link: string;
  icon: SimpleIcon;
};

type FooterLinksSection = {
  title: string;
  id: string;
  items: FooterLink[];
};

type FooterDetailsType = {
  image: {
    src: string;
    alt: string;
  };
  homeLink: {
    logo: {
      light: string;
      dark: string;
    };
    link: string;
  };
  title: string;
  description: string;
};

type NewsletterFormProps = NewsletterData;

interface EcommerceFooter19Props {
  newsletter?: NewsletterData;
  infoSectionList?: InfoItem[];
  footerLinks?: FooterLinksSection[];
  footerDetails?: FooterDetailsType;
  paymentMethods?: string[];
  socialLinks?: SocialLink[];
  submenuLinks?: {
    text: string;
    link: string;
  }[];
  className?: string;
}

interface FooterLinksSectionProps {
  sections: FooterLinksSection[];
}

interface SocialMediaSectionProps {
  links: SocialLink[];
}

const CONSULTATION_DATA: NewsletterData = {
  title: "Máte zájem o konzultaci?",
  description: "Nechte nám na sebe kontakt a my se vám ozveme zpět.",
};

const INFO_SECTION_DATA: InfoItem[] = [
  {
    title: "Zákaznická podpora",
    text: "Po–Pá, 8:00–17:00",
    icon: MessageSquareMore,
  },
  {
    title: "Zavolejte nám",
    text: contactInfo.phone,
    link: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  {
    title: "Napište nám",
    text: contactInfo.email,
    link: `mailto:${contactInfo.email}`,
    icon: Send,
  },
  {
    title: "Adresa",
    text: contactInfo.address,
    link: contactInfo.addressLink,
    icon: MapPin,
  },
];

const FOOTER_LINKS: FooterLinksSection[] = [
  {
    title: "Produkty",
    id: "products",
    items: [
      {
        text: "Vinylové schody",
        link: "#",
      },
      {
        text: "Vinylové podlahy",
        link: "#",
      },
      {
        text: "Příslušenství",
        link: "#",
      },
    ],
  },
  {
    title: "Služby",
    id: "services",
    items: [
      {
        text: "Realizace",
        link: "/realizace",
      },
      {
        text: "Ohýbání vinylu na míru",
        link: "/ohybani-vinylu",
      },
    ],
  },
];

const FOOTER_DETAILS = {
  image: {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    alt: "",
  },
  homeLink: {
    logo: {
      light:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
      dark: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark-white.svg",
    },
    link: "#",
  },
  title: "Vinylové schody na míru",
  description:
    "Profesionální výroba a montáž vinylových schodů a podlah s důrazem na detail a kvalitu.",
};

const SOCIAL_MEDIA_LINKS = [
  {
    icon: siFacebook,
    link: contactInfo.socials.facebook,
  },
  {
    icon: siInstagram,
    link: contactInfo.socials.instagram,
  },
];

const SUBMENU = [
  {
    text: "Obchodní podmínky",
    link: "#",
  },
  {
    text: "Ochrana osobních údajů",
    link: "#",
  },
];

const EcommerceFooter19 = ({
  newsletter = CONSULTATION_DATA,
  infoSectionList = INFO_SECTION_DATA,
  footerLinks = FOOTER_LINKS,
  footerDetails = FOOTER_DETAILS,
  socialLinks = SOCIAL_MEDIA_LINKS,
  submenuLinks = SUBMENU,
  className,
}: EcommerceFooter19Props) => {
  return (
    <section className={cn("pt-12.5 pb-30", className)}>
      <div className="container space-y-10">
        <div className="grid items-center gap-x-20 gap-y-5 lg:grid-cols-2">
          <div>
            <AspectRatio ratio={2} className="overflow-hidden rounded-2xl">
              <img
                className="block size-full object-cover object-center"
                src={footerDetails.image.src}
                alt={footerDetails.image.alt}
              />
            </AspectRatio>
          </div>
          <div>
            <NewsletterSection {...newsletter} />
          </div>
        </div>
        <InfoSection list={infoSectionList} />
        <div className="grid grid-cols-1 gap-7.5 lg:grid-cols-5 xl:grid-cols-2">
          <div className="space-y-5 lg:max-xl:col-span-2">
            <a href="/" className="inline-block w-full max-w-80">
              <img
                className="h-10 w-auto"
                src="/logo/full-logo.svg"
                alt="Vinylové schody"
              />
            </a>
            <p className="max-w-100 text-sm leading-relaxed text-muted-foreground">
              {footerDetails.description}
            </p>
          </div>
          <div className="lg:max-xl:col-span-3">
            <FooterLinksSection sections={footerLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-6">
          <div>
            <SocialMediaSection links={socialLinks} />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          <p className="text-sm">
            © 2026 Vinylové schody. Všechna práva vyhrazena.
          </p>
          <FooterSubMenu links={submenuLinks} />
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = ({ title, description }: NewsletterFormProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <h3 className="text-3xl font-bold md:text-4xl">{title}</h3>
        <p className="leading-normal text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4">
        <ConsultationForm />
        <p className="text-sm text-muted-foreground">
          Kliknutím souhlasíte se{" "}
          <a className="underline underline-offset-2" href="#">
            Zásadami ochrany osobních údajů
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const InfoSection = ({ list }: { list: InfoItem[] }) => {
  if (!list) return;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
      {list.map(({ icon: Icon, title, link, text }) => (
        <Card className="rounded-lg px-5 py-6" key={crypto.randomUUID()}>
          <CardContent className="flex items-start gap-3 p-0">
            <div className="shrink-0 basis-7">
              <Icon />
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-sm leading-relaxed">
                <CardTitle className="text-base leading-relaxed font-semibold">
                  {title}
                </CardTitle>
                {link ? (
                  <a
                    className="break-all text-muted-foreground underline"
                    href={link}
                  >
                    {text}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{text}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const FooterLinksSection = ({ sections }: FooterLinksSectionProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (!sections) return;

  const allAccordionIds = sections.map(({ id }) => id);

  if (isDesktop) {
    return (
      <Accordion
        value={allAccordionIds}
        type="multiple"
        className="flex justify-end gap-10 lg:gap-20"
      >
        <AccordionItems sections={sections} />
      </Accordion>
    );
  } else {
    return (
      <Accordion type="multiple">
        <AccordionItems sections={sections} />
      </Accordion>
    );
  }
};

const AccordionItems = ({ sections }: { sections: FooterLinksSection[] }) => {
  return (
    <Fragment>
      {sections.map(({ id, title, items }) => (
        <AccordionItem
          key={id}
          value={id}
          className="border-b lg:border-transparent"
        >
          <AccordionTrigger className="cursor-auto rounded-none pt-0 pb-4 text-base leading-normal font-bold hover:no-underline max-lg:py-4 [&>svg]:hidden">
            {title}
            <div className="lg:hidden">
              <Plus className="size-5" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-1 max-lg:py-4">
            <ul className="space-y-4 lg:space-y-3">
              {items.map(({ link, text }) => (
                <li
                  className="text-sm leading-tight font-light"
                  key={crypto.randomUUID()}
                >
                  <a
                    href={link}
                    className="hover:underline hover:underline-offset-3"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Fragment>
  );
};

const PaymentMethods = ({ cards }: { cards: string[] }) => {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {cards.map((card) => (
        <li key={crypto.randomUUID()}>
          <img className="w-9.5" src={card} alt="card" />
        </li>
      ))}
    </ul>
  );
};

const SocialMediaSection = ({ links }: SocialMediaSectionProps) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {links.map(({ icon, link }) => (
        <li key={crypto.randomUUID()}>
          <Button size="icon-lg" asChild className="rounded-full">
            <a href={link}>
              <img
                className="size-4.5 dark:hidden"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/white`}
              />
              <img
                className="hidden size-4.5 dark:block"
                alt={icon.title}
                src={`https://cdn.simpleicons.org/${icon.slug}/black`}
              />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

const FooterSubMenu = ({ links }: { links: FooterLink[] }) => {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-4">
      {links.map(({ link, text }) => (
        <li key={crypto.randomUUID()}>
          <a href={link} className="text-sm font-light">
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

export { EcommerceFooter19 };
