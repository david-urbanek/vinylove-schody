import { defineField, defineType } from "sanity";

export const staircaseSoklType = defineType({
  name: "staircaseSokl",
  title: "Zakončení u stěny",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "typeLabel",
      title: "Kategorie produktu",
      type: "string",
      initialValue: "Zakončení u stěny",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Typ zakončení",
      type: "string",
      options: {
        list: [
          { title: "Pásek z podlahy (4 cm)", value: "pasek" },
          { title: "MDF lišta", value: "mdf" },
          { title: "Bez lišty (silikon)", value: "silikon" },
          { title: "Tmel", value: "tmel" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Je potřeba dodržovat strukturu URL adresy: zakonceni-steny-[název]",
      type: "slug",
      options: {
        source: "title", // Or generate based on type/title
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techParams",
      title: "Technické parametry",
      type: "array",
      initialValue: [
        { label: "Tloušťka", unit: "mm" },
        { label: "Výška", unit: "mm" },
        { label: "Délka", unit: "mm" },
        { label: "Výška pásku", unit: "mm" },
        { label: "Dekor / Barva MDF lišty", unit: "" },
        { label: "Odstín tmelu/silikonu", unit: "" },
      ],
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Název" },
            { name: "value", type: "string", title: "Hodnota" },
            { name: "unit", type: "string", title: "Jednotka" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "pricePerUnit",
      title: "Cena za běžný metr (Kč/bm)/ kus (Kč/ks)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Hlavní obrázek",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
