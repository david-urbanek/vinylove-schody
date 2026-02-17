import { createClient } from "next-sanity";

const projectId = "dgknp4mt";
const dataset = "production";
const apiVersion = "2026-01-20";

// Ensure a token is provided
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error(
    "Error: SANITY_API_TOKEN is missing. Please run with SANITY_API_TOKEN=your_token_here",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // We are writing data
  token,
});

const DUMMY_IMAGE_URL = "https://placehold.co/800x600.png";

async function uploadImage() {
  console.log("Fetching dummy image...");
  const response = await fetch(DUMMY_IMAGE_URL);
  if (!response.body) throw new Error("Failed to fetch image");
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  console.log("Uploading image asset to Sanity...");
  const asset = await client.assets.upload("image", buffer, {
    filename: "test-vinyl-floor.jpg",
  });
  console.log(`Image uploaded: ${asset._id}`);
  return asset._id;
}

async function seed() {
  try {
    const imageAssetId = await uploadImage();

    const products = Array.from({ length: 30 }).map((_, i) => {
      const num = i + 1;
      return {
        _type: "floor",
        title: `TEST DATA - Click Podlaha ${num}`,
        slug: { _type: "slug", current: `podlaha-test-click-${num}` },
        category: "click", // As requested
        collection: num % 2 === 0 ? "premium" : "classic",
        manufacturer: num % 2 === 0 ? "rigid" : "egibi",
        description: `Toto je testovací produkt číslo ${num} pro kategorii Click. Slouží pouze pro ověření funkčnosti.`,
        pricePerUnit: 800 + num * 10,
        tags: ["new", "test"],
        mainImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAssetId,
          },
        },
        techParams: {
          dimensions: "1220 x 180 mm",
          thickness: 4.5,
          wearLayer: 0.55,
          piecesInPackage: 8,
          weightPackage: 15,
          m2InPackage: 1.76,
        },
      };
    });

    console.log(`Creating ${products.length} products...`);

    const transaction = client.transaction();
    products.forEach((product) => {
      transaction.create(product);
    });

    const result = await transaction.commit();
    console.log("Success! Created products:", result.documentIds);
    console.log(
      "To delete these later, verify their IDs or delete by filtering tags match 'test'.",
    );
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

seed();
