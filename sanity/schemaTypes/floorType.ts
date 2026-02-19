import { defineField, defineType } from "sanity";

export const floorType = defineType({
  name: "floor",
  title: "Podlahy",
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
      initialValue: "Podlahy",
    }),
    defineField({
      name: "slug",
      description: "Je potřeba dodržovat strukturu URL adresy: podlaha-[název]",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const current = slug?.current || "";
          if (!current.startsWith("podlaha-")) {
            return 'Slug musí začínat předponou "podlaha-"';
          }
          if (current === "podlaha-") {
            return "Za pomlčkou musí následovat název (např. podlaha-dub-classic)";
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      options: {
        list: [
          { title: "Click", value: "podlahy-click" },
          { title: "Lepená", value: "podlahy-lepene" },
        ],
        // 'radio' zobrazí přepínače místo rozbalovacího seznamu
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
          { title: "Classic", value: "classic" },
          { title: "Premium", value: "premium" },
          { title: "Canadian", value: "canadian" },
        ],
        // 'radio' zobrazí přepínače místo rozbalovacího seznamu
        layout: "dropdown",
      },
      type: "string",
    }),
    defineField({
      name: "pattern",
      title: "Dekor",
      type: "reference",
      to: [{ type: "pattern" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "manufacturer",
      title: "Výrobce",
      type: "string",
      options: {
        list: [
          { title: "Rigid", value: "rigid" },
          { title: "Egibi", value: "egibi" },
        ],
        // 'radio' zobrazí přepínače místo rozbalovacího seznamu
        layout: "dropdown",
      },
    }),
    defineField({
      name: "description",
      title: "Popis podlahy",
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
      // Tady definujeme, co tam bude hned po kliknutí na "Create new"
      initialValue: [
        { label: "Rozměr lamely", unit: "mm" },
        { label: "Celková tloušťka", unit: "mm" },
        { label: "Nášlapná vrstva", unit: "mm" },
        { label: "Kusů v balení", unit: "ks" },
        { label: "Hmotnost balení", unit: "kg" },
        { label: "Počet m² v balení", unit: "m²" },
      ],
      validation: (Rule) => Rule.required(),
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
      name: "features",
      title: "Vlastnosti",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Voděodolné", value: "waterproof" },
          { title: "Pro podlahové vytápění", value: "underfloor-heating" },
          { title: "Integrovaná podložka", value: "integrated-underlay" },
        ],
      },
    }),
    defineField({
      name: "pricePerUnit",
      title: "Cena za balení (Kč)",
      type: "number",
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
