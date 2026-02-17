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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "typeLabel",
      title: "Kategorie produktu",
      type: "string",
      initialValue: "Příslušenství",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Je potřeba dodržovat strukturu URL adresy: prislusenstvi-[název]",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const current = slug?.current || "";
          if (!current.startsWith("prislusenstvi-")) {
            return 'Slug musí začínat předponou "prislusenstvi-"';
          }
          if (current === "prislusenstvi-") {
            return "Za pomlčkou musí následovat název (např. prislusenstvi-lepidlo-flex)";
          }
          return true;
        }),
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
  ],
});
