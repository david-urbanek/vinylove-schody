import { ProductDetail7 } from "@/components/product-detail7";
import { RelatedProducts } from "@/components/related-products";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const query = `*[slug.current == $slug][0]{
    ...,
    pattern->
  }`;

  const product = await client.fetch(query, { slug });

  if (!product) {
    notFound();
  }

  // 1. Fetch Variants (Same Product Type, variants)
  let variantsQuery;
  let variantsParams;

  if (product._type === "stair") {
    // For stairs, filter only by category
    variantsQuery = `*[_type == $type && category == $category]{
      _id,
      title,
      slug,
      pattern->{title, image}
    }`;
    variantsParams = {
      type: product._type,
      category: product.category,
    };
  } else if (
    product._type === "skirting" ||
    product._type === "transitionProfile"
  ) {
    // For skirting and transition profiles, filter by type
    variantsQuery = `*[_type == $type && _id != $id]{
      _id,
      title,
      slug,
      mainImage,
      pattern->{title, image}
    }`;
    variantsParams = {
      type: product._type,
      id: product._id,
    };
  } else if (product._type === "accessory") {
    variantsQuery = null;
    variantsParams = {};
  } else if (product._type === "staircaseSokl") {
    variantsQuery = `*[_type == $type && type == $subtype]{
      _id,
      title,
      slug,
      pattern->{title, image}
    }`;
    variantsParams = {
      type: product._type,
      subtype: product.type,
    };
  } else if (product._type === "floor") {
    // For floors, filter by category and collection
    variantsQuery = `*[_type == $type && category == $category && collection == $collection]{
      _id,
      title,
      slug,
      pattern->{title, image}
    }`;
    variantsParams = {
      type: product._type,
      category: product.category,
      collection: product.collection,
    };
  } else {
    // Fallback for unknown types
    variantsQuery = null;
    variantsParams = {};
  }

  const relatedProducts = variantsQuery
    ? await client.fetch(variantsQuery, variantsParams)
    : [];

  // 2. Fetch Recommendations (Cross-sell)
  const patternId = product.pattern?._id;

  const recommendationsQuery = `{
    "skirtings": *[_type == "skirting" && pattern._ref == $patternId && _id != $id] {
      _id, title, slug, pricePerUnit, mainImage, "category": "Obvodové lišty"
    },
    "transitions": *[_type == "transitionProfile" && pattern._ref == $patternId && _id != $id] {
      _id, title, slug, pricePerUnit, mainImage, "category": "Přechodové lišty"
    },
    "floors": *[_type == "floor" && pattern._ref == $patternId && _id != $id] {
      _id, title, slug, pricePerUnit, mainImage, "category": "Podlahy"
    },
    "accessories": *[_type == "accessory" && _id != $id][0...8] {
       _id, title, slug, pricePerUnit, mainImage, "category": "Příslušenství"
    }
  }`;

  const recommendations = await client.fetch(recommendationsQuery, {
    patternId: patternId || "",
    id: product._id,
  });

  const sections = [];
  const createSection = (title: string, value: string, products: any[]) => ({
    title,
    value,
    products,
  });

  if (product._type === "floor") {
    if (recommendations.skirtings.length)
      sections.push(
        createSection("Obvodové lišty", "skirtings", recommendations.skirtings),
      );
    if (recommendations.transitions.length)
      sections.push(
        createSection(
          "Přechodové lišty",
          "transitions",
          recommendations.transitions,
        ),
      );
    if (recommendations.accessories.length)
      sections.push(
        createSection(
          "Příslušenství",
          "accessories",
          recommendations.accessories,
        ),
      );
  } else if (product._type === "stair") {
    if (recommendations.floors.length)
      sections.push(createSection("Podlahy", "floors", recommendations.floors));
    if (recommendations.skirtings.length)
      sections.push(
        createSection("Obvodové lišty", "skirtings", recommendations.skirtings),
      );
    if (recommendations.accessories.length)
      sections.push(
        createSection(
          "Příslušenství",
          "accessories",
          recommendations.accessories,
        ),
      );
  } else if (product._type === "transitionProfile") {
    if (recommendations.skirtings.length)
      sections.push(
        createSection("Obvodové lišty", "skirtings", recommendations.skirtings),
      );
    if (recommendations.floors.length)
      sections.push(createSection("Podlahy", "floors", recommendations.floors));
    if (recommendations.accessories.length)
      sections.push(
        createSection(
          "Příslušenství",
          "accessories",
          recommendations.accessories,
        ),
      );
  } else if (product._type === "accessory") {
    if (recommendations.accessories.length)
      sections.push(
        createSection(
          "Další příslušenství",
          "accessories",
          recommendations.accessories,
        ),
      );
  } else if (product._type === "skirting") {
    if (recommendations.floors.length)
      sections.push(createSection("Podlahy", "floors", recommendations.floors));
    if (recommendations.transitions.length)
      sections.push(
        createSection(
          "Přechodové lišty",
          "transitions",
          recommendations.transitions,
        ),
      );
    if (recommendations.accessories.length)
      sections.push(
        createSection(
          "Příslušenství",
          "accessories",
          recommendations.accessories,
        ),
      );
  }

  return (
    <>
      <ProductDetail7 product={product} relatedProducts={relatedProducts} />
      <RelatedProducts sections={sections} />
    </>
  );
}
