import { defineField, defineType } from "sanity";

export const stairType = defineType({
  name: "stair",
  title: "Schody",
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
      initialValue: "Schody",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      description: "Je potřeba dodržovat strukturu URL adresy: schody-[název]",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const current = slug?.current || "";
          if (!current.startsWith("schody-")) {
            return 'Slug musí začínat předponou "schody-"';
          }
          if (current === "schody-") {
            return "Za pomlčkou musí následovat název (např. schody-dub-classic)";
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      options: {
        list: [
          { title: "Schody bez nosu", value: "schody-bez-nosu" },
          { title: "Schody s nosem", value: "schody-s-nosem" },
          { title: "Nášlap s nosem", value: "naslapy-s-nosem" },
          { title: "Nášlap bez nosu", value: "naslapy-bez-nosu" },
          { title: "Vetknuté schody", value: "schody-vetknute" },
        ],
        layout: "dropdown",
      },
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "collection",
      title: "Kolekce",
      options: {
        list: [
          { title: "Premium", value: "premium" },
          { title: "Classic", value: "classic" },
          { title: "Rigid SPC", value: "rigid-spc" },
        ],
        layout: "dropdown",
      },
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "pattern",
    //   title: "Dekor",
    //   type: "reference",
    //   to: [{ type: "pattern" }],
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "description",
      title: "Popis schodů",
      type: "text",
      initialValue:
        "Ideální volba pro rekonstrukce schodišť. Díky své minimální tloušťce téměř nezvyšuje původní výšku stupňů. Profil je opatřen standardním zaklikávacím systémem, který umožňuje okamžité a plynulé napojení na další podlahové dílce.",
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
        { label: "Nášlapná vrstva", unit: "mm" },
        { label: "Hloubka schodu", unit: "mm" },
        { label: "Šířka schodu", unit: "mm" },
        { label: "Výška nosu", unit: "mm" },
        { label: "Hloubka zpětného ohybu nosu", unit: "mm" },
        { label: "S integrovanou deskou", value: "Ano" },
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
      title: "Cena za kus (Kč)",
      type: "number",
      validation: (Rule) => Rule.required(),
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
