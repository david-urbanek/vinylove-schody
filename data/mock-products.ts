import { Product } from "@/types/product";

const BASE_IMAGE =
  "https://images.unsplash.com/photo-1581850518616-bcb8077a2536?auto=format&fit=crop&w=800&q=80";

const createProduct = (
  id: string,
  name: string,
  price: number,
  tag?: string,
): Product => ({
  name,
  link: `/produkt/${id}`,
  price: {
    regular: price,
    currency: "CZK",
  },
  stockStatusCode: "IN_STOCK",
  image: {
    src: BASE_IMAGE,
    alt: name,
  },
  badges: tag ? [{ text: tag }] : undefined,
});

export const MOCK_PRODUCTS: Record<string, Product[]> = {
  "podlahy-click": [
    createProduct("dub-prirodni", "Dub Přírodní Click", 890, "Novinka"),
    createProduct("dub-beleny", "Dub Bělený Click", 920, "Akce"),
    createProduct("borovice-rustikal", "Borovice Rustikal", 850),
    createProduct("beton-sedy", "Beton Šedý", 950, "Voděodolné"),
    createProduct("orech-tmavy", "Ořech Tmavý", 980),
    createProduct("dub-medovy", "Dub Medový", 890),
    createProduct("dub-popelavy", "Dub Popelavý", 910),
    createProduct("smrk-seversky", "Smrk Severský", 860),
    createProduct("dub-zlaty", "Dub Zlatý", 930),
    createProduct("buk-parny", "Buk Pařený", 880),
    createProduct("javor-kanadsky", "Javor Kanadský", 940),
    createProduct("tresen-americka", "Třešeň Americká", 960),
    createProduct("dub-sedy", "Dub Šedý", 900),
    createProduct("breza-svetl", "Bříza Světlá", 870),
    createProduct("mahagon-exotic", "Mahagon Exotic", 1100, "Premium"),
    createProduct("wenge-dark", "Wenge Dark", 1150),
    createProduct("teak-natur", "Teak Natur", 1200),
  ],
  "podlahy-lepena": [
    createProduct("dub-klasik-lepeny", "Dub Klasik Lepený", 690),
    createProduct("orech-americky", "Ořech Americký", 750, "Novinka"),
    createProduct("beton-industrial", "Beton Industrial", 720),
    createProduct("dub-rustikal", "Dub Rustikal", 680),
    createProduct("jasan-bily", "Jasan Bílý", 710),
    createProduct("dub-kourovy", "Dub Kouřový", 730),
    createProduct("borovice-lesni", "Borovice Lesní", 670),
    createProduct("dub-parketa", "Dub Parketa", 700),
    createProduct("dlazba-vzor", "Dlažba Vzor", 760),
    createProduct("kamen-bridlice", "Kámen Břidlice", 780),
  ],
  // Add more categories as needed, ensuring they have enough items for testing
  "schody-bez-nosu": Array.from({ length: 12 }).map((_, i) =>
    createProduct(`schod-bez-nosu-${i}`, `Schod Rovný ${i + 1}`, 1200 + i * 10),
  ),
  "schody-s-nosem": Array.from({ length: 10 }).map((_, i) =>
    createProduct(
      `schod-s-nosem-${i}`,
      `Schod Profilovaný ${i + 1}`,
      1350 + i * 10,
    ),
  ),
  "obvodove-listy": Array.from({ length: 15 }).map((_, i) =>
    createProduct(`lista-${i}`, `Soklová lišta ${i + 1}`, 150 + i * 5),
  ),
};
