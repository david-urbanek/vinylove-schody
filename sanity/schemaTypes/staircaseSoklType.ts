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
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
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
      type: "object",
      fields: [
        defineField({
          name: "thickness",
          title: "Tloušťka (mm)",
          type: "number",
          hidden: ({ document }) => (document as any)?.type !== "mdf",
        }),
        defineField({
          name: "height",
          title: "Výška (mm)",
          type: "number",
          hidden: ({ document }) => (document as any)?.type !== "mdf",
        }),
        defineField({
          name: "length",
          title: "Délka (mm)",
          type: "number",
          hidden: ({ document }) => (document as any)?.type !== "mdf",
        }),
        defineField({
          name: "stripHeight",
          title: "Výška pásku (mm)",
          type: "number",
          initialValue: 40,
          hidden: ({ document }) => (document as any)?.type !== "pasek",
        }),
        defineField({
          name: "mdfDecor",
          title: "Dekor / Barva MDF lišty",
          type: "reference",
          to: [{ type: "pattern" }],
          hidden: ({ document }) => (document as any)?.type !== "mdf",
        }),
        defineField({
          name: "siliconeColor",
          title: "Odstín tmelu/silikonu",
          type: "string",
          hidden: ({ document }) => (document as any)?.type !== "silikon",
        }),
      ],
    }),
    defineField({
      name: "pricePerUnit",
      title: "Cena za běžný metr (Kč/bm)",
      type: "number",
    }),
    defineField({
      name: "mainImage",
      title: "Hlavní obrázek",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
