import { About } from "@/components/homepage/about6";
import { Hero } from "@/components/homepage/hero";
import { Process1 } from "@/components/homepage/process1";
import { ProductCarousel } from "@/components/product/product-carousel";
import { addVat, getTags } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Product } from "@/types/product";

// Transform raw Sanity data into Product[]
function toProduct(item: any): Product {
  return {
    _id: item._id,
    _type: item._type,
    title: item.title,
    description: item.description || "",
    slug: item.slug,
    mainImage: item.mainImage,
    gallery: item.gallery,
    pattern: item.pattern,
    pricePerUnit: item.pricePerUnit,
    price: {
      priceWithoutVAT: item.pricePerUnit,
      priceWithVAT: addVat(item.pricePerUnit),
      currency: "CZK",
    },
    link: `/produkt/${item.slug?.current}`,
    typeLabel: item.typeLabel,
    category: item.category,
    tags: getTags(item.tags),
    m2PerPackage: item.m2PerPackage, // Added
  };
}

export default async function Home() {
  // Fetch floors with balanced distribution
  const clickFloors = await client.fetch(`
    *[_type == "floor" && category == "podlahy-click"] | order(_createdAt desc) [0...8] {
      _id,
      _type,
      title,
      slug,
      mainImage,
      gallery,
      pattern->{title, image},
      pricePerUnit,
      tags,
      typeLabel,
      category,
      m2PerPackage
    }
  `);

  const glueFloors = await client.fetch(`
    *[_type == "floor" && category == "podlahy-lepene"] | order(_createdAt desc) [0...7] {
      _id,
      _type,
      title,
      slug,
      mainImage,
      gallery,
      pattern->{title, image},
      pricePerUnit,
      tags,
      typeLabel,
      category,
      m2PerPackage
    }
  `);

  const floors = [...clickFloors, ...glueFloors].map(toProduct);

  // Fetch stairs (~15 products)
  const stairs = (
    await client.fetch(`
    *[_type == "stair"] | order(_createdAt desc) [0...15] {
      _id,
      _type,
      title,
      slug,
      mainImage,
      gallery,
      pattern->{title, image},
      pricePerUnit,
      tags,
      typeLabel,
      category
    }
  `)
  ).map(toProduct);

  // Prepare sections for ProductCarousel
  const carouselSections = [
    {
      title: "Vinylové schody",
      value: "stairs",
      promotion: {
        image: "/promo/schody-1.png",
        title: "Schody, které Vám vydrží.",
        kicker: "Kvalita",
        cta: {
          label: "Zobrazit realizace",
          link: "/realizace",
        },
      },
      products: stairs,
    },
    {
      title: "Vinylové podlahy",
      value: "floors",
      promotion: {
        image: "/promo/podlaha-1.png",
        title: "Podlaha, která Vás doslova unese.",
        kicker: "Odolnost",
        cta: {
          label: "Zobrazit realizace",
          link: "/realizace",
        },
      },
      products: floors,
    },
  ];

  return (
    <>
      <Hero />
      <ProductCarousel sections={carouselSections} className="pb-10" />
      <About className="pt-10" />
      <Process1
        title="Jak to funguje"
        description="Jednoduchý proces od prvního kontaktu až po finální realizaci. Zakládáme si na rychlé a srozumitelné komunikaci."
        steps={[
          {
            step: "01",
            title: "Výběr zboží",
            description:
              "Prohlédněte si naši nabídku vinylových schodů a podlah. Vyberte si dekor a provedení, které nejlépe ladí s vaším interiérem.",
            color: "#0ea5e9",
          },
          {
            step: "02",
            title: "Zaslání poptávky",
            description:
              "Využijte náš poptávkový formulář. Stačí vyplnit základní údaje a představy o realizaci, o zbytek se postaráme my.",
            color: "#5DCA8A",
          },
          {
            step: "03",
            title: "Ozvěme se do 48 hodin",
            description:
              "Vaši poptávku ihned zpracujeme. Nejpozději do 48 hodin vás budeme kontaktovat s konkrétní nabídkou nebo doplňuj\u00edcími dotazy.",
            color: "#f59e0b",
          },
        ]}
      />
    </>
  );
}
