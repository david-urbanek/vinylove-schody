import { About6 } from "@/components/homepage/about6";
import { Hero } from "@/components/homepage/hero";
import { Process1 } from "@/components/homepage/process1";
import { ProductCarousel } from "@/components/product/product-carousel";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  // Fetch floors with balanced distribution
  const clickFloors = await client.fetch(`
    *[_type == "floor" && category == "podlahy-click"] | order(_createdAt desc) [0...8] {
      _id,
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
  `);

  const glueFloors = await client.fetch(`
    *[_type == "floor" && category == "podlahy-lepene"] | order(_createdAt desc) [0...7] {
      _id,
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
  `);

  const floors = [...clickFloors, ...glueFloors];

  // Fetch stairs (~15 products)
  const stairs = await client.fetch(`
    *[_type == "stair"] | order(_createdAt desc) [0...15] {
      _id,
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
  `);

  // Prepare sections for ProductCarousel
  const carouselSections = [
    {
      title: "Vinylové schody",
      value: "stairs",
      promotion: {
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
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
        image:
          "https://images.unsplash.com/photo-1581850518616-bcb8077a2536?auto=format&fit=crop&w=800&q=80",
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
      <ProductCarousel sections={carouselSections} />
      <About6 />
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
