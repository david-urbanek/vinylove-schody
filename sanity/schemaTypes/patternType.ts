import { defineField, defineType } from "sanity";

export const patternType = defineType({
  name: "pattern",
  title: "Dekor",
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
      initialValue: "Dekor",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      description: "Je potřeba dodržovat strukturu URL adresy: dekor-[název]",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const current = slug?.current || "";
          if (!current.startsWith("dekor-")) {
            return 'Slug musí začínat předponou "dekor-"';
          }
          if (current === "dekor-") {
            return "Za pomlčkou musí následovat název (např. dekor-dub-classic)";
          }
          return true;
        }),
    }),
    defineField({
      name: "image",
      title: "Obrázek",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
