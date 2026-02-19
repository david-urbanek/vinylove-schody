"use client";
import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import imgPodlaha1 from "@/public/realizace/podlahy/siroke/podlaha-1.png";
import imgSchody4 from "@/public/realizace/schody/siroke/schody-4.png";
import imgSchody5 from "@/public/realizace/schody/siroke/schody-5.png";
import imgSchody6 from "@/public/realizace/schody/siroke/schody-6.png";
import imgSchody7 from "@/public/realizace/schody/siroke/schody-7.png";
import imgSchody8 from "@/public/realizace/schody/siroke/schody-8.png";

interface RealizationItem {
  title: string;
  description: string;
  image: StaticImageData;
  tag: string;
}

const realizationsData: RealizationItem[] = [
  {
    title: "Schody s nosem",
    description:
      "Proměňte své schodiště v dominantu domova. Kombinace robustní 22mm MDF desky a elegantního přesahu dodá interiéru nadčasový vzhled. Vyberte si mezi celistvým dekorem nebo moderním kontrastem s bílou podstupnicí. A pro dokonalou večerní atmosféru? Doporučujeme integrované LED osvětlení, které schody doslova rozzáří.",
    image: imgSchody5,
    tag: "Populární",
  },
  {
    title: "Schody bez nosu",
    description:
      "Dokonalý minimalismus pro moderní interiér. Čisté, ostré linie a precizní 'krabicový' vzhled bez přesahů vytvoří dojem luxusní celistvosti. Schod plynule přechází v podstupnici a opticky sjednocuje prostor. Ideální volba pro ty, kteří hledají špičkový design bez kompromisů.",
    image: imgSchody6,
    tag: "Moderní",
  },
  {
    title: "Nášlap",
    description:
      "Nejchytřejší způsob, jak dát starým schodům nový život. Zapomeňte na náročné bourání – naše vinylové nášlapy na pevné MDF desce promění vaše schodiště k nepoznání během chvilky. Získáte prémiový povrch, vysokou odolnost a moderní vzhled za zlomek ceny kompletní rekonstrukce.",
    image: imgSchody7,
    tag: "Moderní",
  },
  {
    title: "Vetknuté vinylové schody",
    description:
      "Dechberoucí lehkost a designový vrchol vašeho domu. Levitující schody, které jako by pluly prostorem, okamžitě přitáhnou pozornost každé návštěvy. Skrytá ocelová konstrukce zajišťuje nekompromisní pevnost, zatímco vzdušný design opticky zvětší váš interiér. Dopřejte si exkluzivitu, kterou jen tak někdo nemá.",
    image: imgSchody4,
    tag: "Luxusní",
  },
  {
    title: "Schody na přání",
    description:
      "Máte vlastní představu nebo atypický prostor? Žádný problém. Milujeme výzvy a rádi zrealizujeme i ty nejodvážnější nápady. Ať už jde o netradiční tvary nebo specifické požadavky, společně najdeme cestu, jak vaši vizi proměnit v perfektní realitu.",
    image: imgSchody8,
    tag: "Výzva",
  },
  {
    title: "Podlahy",
    description:
      "Základ vašeho domova, na který se můžete spolehnout. Naše vinylové podlahy v sobě spojují věrnou krásu dřeva či kamene s nekompromisní odolností. Jsou tiché, teplé na dotek a zvládnou i ten nejnáročnější provoz. Ať už zvolíte lepenou klasiku nebo moderní click systém, garantujeme precizní pokládku, která vydrží roky.",
    image: imgPodlaha1,
    tag: "Odolné",
  },
];

interface RealizationsProps {
  className?: string;
}

const Realizations = ({ className }: RealizationsProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 flex flex-col gap-4 border-b border-border pb-6">
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
            Typy realizací a služeb
          </h2>
          <p className="text-lg text-muted-foreground">
            Podívejte se na naše realizace a služby, které nabízíme.
          </p>
        </div>
        <div className="space-y-12">
          {realizationsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col-reverse gap-6 md:grid md:grid-cols-2 md:pt-10"
            >
              <div className="flex flex-col justify-center gap-6">
                <div>
                  <Badge
                    variant="outline"
                    className="mb-4 px-3 py-1 text-xs uppercase tracking-wider"
                  >
                    {project.tag}
                  </Badge>
                  <h3 className="mb-4 font-serif text-3xl font-medium sm:text-5xl leading-tight">
                    {project.title}
                  </h3>
                  <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <motion.div
                className="relative aspect-[3/2] w-full overflow-hidden rounded-sm"
                initial={{ y: -80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Realizations };
