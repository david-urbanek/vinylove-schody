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
      description:
        "Je potřeba dodržovat strukturu URL adresy: prechodova-lista-[název]",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const current = slug?.current || "";
          if (!current.startsWith("prechodova-lista-")) {
            return 'Slug musí začínat předponou "prechodova-lista-"';
          }
          if (current === "prechodova-lista-") {
            return "Za pomlčkou musí následovat název (např. prechodova-lista-dub-classic)";
          }
          return true;
        }),
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
      type: "array",
      initialValue: [
        { label: "Délka", unit: "mm" },
        { label: "Šířka", unit: "mm" },
        { label: "Výška", unit: "mm" },
        { label: "Montáž", unit: "" },
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
  ],
});
