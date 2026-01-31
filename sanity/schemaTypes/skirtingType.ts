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
    }),
    defineField({
      name: "pattern",
      title: "Dekor",
      type: "reference",
      to: [{ type: "pattern" }],
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
    defineField({
      name: "techParams",
      title: "Technické parametry",
      type: "object",
      fields: [
        defineField({
          name: "length",
          title: "Délka (mm)",
          type: "number",
          description: "Typicky 2400 mm nebo 2500 mm",
        }),
        defineField({
          name: "height",
          title: "Výška (mm)",
          type: "number",
          description: "Např. 40, 60 nebo 80 mm",
        }),
        defineField({
          name: "width",
          title: "Hloubka/Šířka (mm)",
          type: "number",
          description: "Jak moc lišta odstává od stěny (např. 12–20 mm)",
        }),
        defineField({
          name: "material",
          title: "Materiál",
          type: "string",
          options: {
            list: [
              { title: "MDF", value: "mdf" },
              { title: "PVC", value: "pvc" },
              { title: "Hliník", value: "aluminium" },
              { title: "Dýha", value: "veneer" },
            ],
          },
        }),
        defineField({
          name: "cableChannel",
          title: "Kabelový kanálek",
          type: "boolean",
          initialValue: false,
        }),
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
