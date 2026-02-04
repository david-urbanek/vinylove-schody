import { defineField, defineType } from "sanity";

export const accessoryType = defineType({
  name: "accessory",
  title: "Příslušenství",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název",
      type: "string",
    }),
    defineField({
      name: "typeLabel",
      title: "Kategorie produktu",
      type: "string",
      initialValue: "Příslušenství",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Typ příslušenství",
      type: "string",
      options: {
        list: [
          { title: "Lepidla", value: "lepidla" },
          { title: "Stěrky", value: "sterky" },
          { title: "Penetrace", value: "penetrace" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricePerUnit",
      title: "Cena za kus (Kč)",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Popis",
      type: "text",
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
