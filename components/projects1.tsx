"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const projects1prop = [
  {
    title: "Schody s nosem",
    description:
      "Vytvořte si dominantu interiéru. Robustní MDF deska (22 mm) zajišťuje stabilitu, zatímco přesahový nos dodává schodišti klasickou eleganci. Podstupnici můžete sladit s dekorem vinylu pro celistvý vzhled, nebo zvolit bílou variantu pro moderní kontrast. Možnost integrace LED osvětlení podtrhne atmosféru vašeho domova.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ali-moradi-qNic6LXHw-w-unsplash.jpg",
    tag: "Populární",
  },
  {
    title: "Schody bez nosu",
    description:
      "Čisté linie pro milovníky minimalismu. Moderní 'krabicový' vzhled bez přesahů, kde schod plynule přechází v podstupnici. Ideální pro současné interiéry. Nabízíme lepenou i click variantu s precizním zpracováním hran pro dokonalý detail.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/israel-andrade-YI_9SivVt_s-unsplash.jpg",
    tag: "Moderní",
  },
  {
    title: "Nášlap",
    description:
      "Ekonomické a funkční řešení pro renovace. Samostatný nášlapný díl na pevné MDF desce, který jednoduše promění staré schodiště v nové. Rychlá instalace bez bourání se zachováním špičkové kvality povrchu.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg",
    tag: "Ekonomické",
  },
  {
    title: "Vetknuté vinylové schody",
    description:
      "Vrchol designu a technické preciznosti. Schody 'levitující' v prostoru, nasunuté na skrytou ocelovou konstrukci. Toto řešení vyžaduje mistrovskou přípravu, ale odmění se vám dechberoucím vzdušným efektem, který ohromí každou návštěvu.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-lISGL8VWpPE-unsplash.jpg",
    tag: "Luxusní",
  },
  {
    title: "Samonosné ocelové schody",
    description:
      "Investice na celý život. Ocelová konstrukce vyrobená s milimetrovou přesností laserem unese jakoukoliv zátěž. Nabízíme neuvěřitelnou záruku 50 let. Je to páteř vašeho domu, která nikdy nezestárne.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
    tag: "Industriální",
  },
  {
    title: "Samonosné sádro-betonové schody",
    description:
      "Pokrok v materiálech. Unikátní technologie lehké betonové směsi v sádrovém bednění. Výsledkem jsou schody, které nevržou, jsou dokonale pevné a přitom nezatěžují statiku domu jako plný beton. Záruka 30 let na tichou a klidnou chůzi.",
    image:
      "https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    tag: "Odolné",
  },
  {
    title: "Výroba betonových schodů na míru",
    description:
      "Žádný kompromis, jen vaše představa. Realizujeme betonová schodiště jakýchkoliv tvarů – od elegantních točitých až po velkorysá přímočará ramena. Přizpůsobíme se vaší stavbě do posledního detailu.",
    image:
      "https://images.unsplash.com/photo-1628147481068-1bc7d2539074?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    tag: "Na míru",
  },
];

interface Projects1Props {
  className?: string;
}

const Projects1 = ({ className }: Projects1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 flex items-center justify-between border-b border-border pb-6">
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight">
            Typy realizací a služeb
          </h2>
        </div>
        <div className="space-y-12">
          {projects1prop.map((project, index) => (
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

export { Projects1 };
