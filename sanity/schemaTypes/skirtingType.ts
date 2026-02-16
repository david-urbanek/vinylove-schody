import { defineField, defineType } from "sanity";

export const skirtingType = defineType({
  name: "skirting",
  title: "Obvodové lišty",
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
      initialValue: "Obvodové lišty",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const current = slug?.current || "";
          if (!current.startsWith("obvodova-lista-")) {
            return 'Slug musí začínat předponou "obvodova-lista-"';
          }
          return true;
        }),
    }),
    defineField({
      name: "pricePerUnit",
      title: "Cena za kus (Kč)",
      type: "number",
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
      name: "description",
      title: "Popis",
      type: "text",
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
      type: "array",
      initialValue: [
        { label: "Délka", unit: "mm" },
        { label: "Výška", unit: "mm" },
        { label: "Hloubka/Šířka", unit: "mm" },
        { label: "Materiál", unit: "" },
        { label: "Kabelový kanálek", unit: "" },
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
      name: "tags",
      title: "Štítky",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Novinka", value: "new" },
          { title: "Akce", value: "sale" },
          { title: "Doprodej", value: "clearance" },
        ],
      },
    }),
  ],
});
