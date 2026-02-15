import { defineField, defineType } from "sanity";

export const transitionProfileType = defineType({
  name: "transitionProfile",
  title: "Přechodové lišty",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Název lišty",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "typeLabel",
      title: "Kategorie produktu",
      type: "string",
      initialValue: "Přechodové lišty",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pattern",
      title: "Dekor",
      type: "reference",
      to: [{ type: "pattern" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricePerUnit",
      title: "Cena za kus (Kč)",
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
    defineField({
      name: "techParams",
      title: "Technické parametry",
      type: "object",
      fields: [
        defineField({
          name: "length",
          type: "number",
          title: "Délka (mm)",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "width",
          type: "number",
          title: "Šířka (mm)",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "height",
          type: "string",
          title: "Výška (mm)",
          description: "Např. 0-12 mm",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "mounting",
          type: "string",
          title: "Montáž",
          options: { list: ["Samolepicí", "Narážecí", "Šroubovací"] },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
