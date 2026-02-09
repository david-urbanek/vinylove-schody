import { About6 } from "@/components/about6";
import { Contact7 } from "@/components/contact7";
import { Hero } from "@/components/hero";
import { Process1 } from "@/components/process1";
import { ProductList10 } from "@/components/product-list10";
import { ProductList9 } from "@/components/product-list9";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductList9 />
      <ProductList10 />
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
              "Vaši poptávku ihned zpracujeme. Nejpozději do 48 hodin vás budeme kontaktovat s konkrétní nabídkou nebo doplňujícími dotazy.",
            color: "#f59e0b",
          },
        ]}
      />
      <Contact7 />
    </>
  );
}
