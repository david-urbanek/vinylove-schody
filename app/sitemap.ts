import { CATEGORY_MAP } from "@/data/data";
import { client } from "@/sanity/lib/client";
import type { MetadataRoute } from "next";

const BASE_URL = "https://vinylove-schody.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all product slugs from Sanity (all document types that have a slug)
  const products: { slug: string; _updatedAt: string }[] = await client.fetch(`
    *[_type in ["floor", "stair", "skirting", "transitionProfile", "staircaseSokl", "accessory"] && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }
  `);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/realizace`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ohybani-vinylu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Category pages (/produkty/[slug])
  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORY_MAP).map(
    (slug) => ({
      url: `${BASE_URL}/produkty/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  // Product detail pages (/produkt/[slug])
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/produkt/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
