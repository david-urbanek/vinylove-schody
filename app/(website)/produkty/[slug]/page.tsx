import { ProductList10 } from "@/components/product/product-list10";
import { addVat } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Product, ProductList } from "@/types/product";
import { Metadata, ResolvingMetadata } from "next";

// Define the mapping configurations
const CATEGORY_MAP: Record<
  string,
  { query: string; title: string; params?: Record<string, string> }
> = {
  // Floors
  "podlahy-click": {
    query: `*[_type == "floor" && category == "podlahy-click"]`,
    title: "Vinylové podlahy Click",
  },
  "podlahy-lepena": {
    query: `*[_type == "floor" && category == "podlahy-lepene"]`,
    title: "Lepené vinylové podlahy",
  },

  // Stairs
  "schody-bez-nosu": {
    query: `*[_type == "stair" && category == "schody-bez-nosu"]`,
    title: "Schody bez nosu",
  },
  "schody-s-nosem": {
    query: `*[_type == "stair" && category == "schody-s-nosem"]`,
    title: "Schody s nosem",
  },
  "schody-naslapy": {
    query: `*[_type == "stair" && category == "schody-naslapy"]`,
    title: "Nášlapy",
  },
  "schody-vetknute": {
    query: `*[_type == "stair" && category == "schody-vetknute"]`,
    title: "Vetknuté schody",
  },

  // Others (All items of type)
  "obvodove-listy": {
    query: `*[_type == "skirting"]`,
    title: "Obvodové lišty",
  },
  "prechodove-listy": {
    query: `*[_type == "transitionProfile"]`,
    title: "Přechodové lišty",
  },
  "zakonceni-u-steny": {
    query: `*[_type == "staircaseSokl"]`,
    title: "Zakončení u stěny",
  },
  lepidla: {
    query: `*[_type == "accessory" && type == "lepidla"]`,
    title: "Lepidla",
  },
  sterky: {
    query: `*[_type == "accessory" && type == "sterky"]`,
    title: "Stěrky",
  },
  penetrace: {
    query: `*[_type == "accessory" && type == "penetrace"]`,
    title: "Penetrace",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: string;
  }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const products = CATEGORY_MAP[slug];

  if (!products) {
    return {
      title: "Produkt nenalezen",
    };
  }

  return {
    title: products.title,
    alternates: {
      canonical: `/produkty/${slug}`,
    },
    description: `Prohledněte naše produkty v kategorii ${products.title}. Vyberte si to nejlepší pro Váš domov.`,
  };
}

export default async function ProductsCategoryPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const config = CATEGORY_MAP[slug];
  const isStairs = slug.includes("schody") || slug === "zakonceni-u-steny";
  const promoImage = isStairs ? "/promo/schody-1.png" : "/promo/podlaha-1.png";

  if (!config) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Zatím zde nic není</h2>
        <p className="text-muted-foreground">
          Tato kategorie je momentálně prázdná. Zkuste se podívat později.
        </p>
      </div>
    );
  }

  const { query, title } = config;
  const data = await client.fetch(query);

  const displayData = data || [];

  if (!displayData || displayData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Zatím zde nic není</h2>
        <p className="text-muted-foreground">
          Jejda, zde nic není. Zkuste se podívat později.
        </p>
      </div>
    );
  }

  // Transform data
  const products: Product[] = displayData.map((item: any) => {
    // Check if already in Product shape (mock data)
    if (item.stockStatusCode) return item as Product;

    const mainImage = item.mainImage;

    console.log("tohle je ten spravny item");

    // Format price
    const priceWithoutVAT = item.pricePerUnit;
    const isSale = item.tags?.includes("sale");

    // Construct Link
    const productSlug = item.slug?.current || item.slug || "#";
    const productLink = `/produkt/${productSlug}`;

    return {
      name: item.title || "Unnamed Product",
      mainImage,
      link: productLink,
      price: {
        priceWithVAT: addVat(priceWithoutVAT),
        priceWithoutVAT,
        sale: isSale ? addVat(priceWithoutVAT) : undefined,
        currency: "CZK",
      },
      badges: item.tags?.map((tag: string) => {
        if (tag === "new") return { text: "Novinka", color: "blue" };
        if (tag === "sale") return { text: "Akce", color: "red" };
        if (tag === "clearance") return { text: "Doprodej", color: "orange" };
        return { text: tag };
      }),
    };
  });

  // Sort products based on searchParams
  const sort = await props.searchParams;
  const sortOrder = sort?.sort;

  if (sortOrder === "asc") {
    products.sort((a, b) => {
      const priceA = a.pricePerUnit;
      const priceB = b.pricePerUnit;
      return priceA - priceB;
    });
  } else if (sortOrder === "desc") {
    products.sort((a, b) => {
      const priceA = a.pricePerUnit;
      const priceB = b.pricePerUnit;
      return priceB - priceA;
    });
  }

  // Split into batches
  const BATCH_SIZE_PROMO = 6; // products next to promo
  const BATCH_SIZE_FULL = 10; // products in full width

  const productListItems: ProductList = [];
  let currentIndex = 0;

  // 1. Promo Batch
  if (currentIndex < products.length) {
    const slice = products.slice(currentIndex, currentIndex + BATCH_SIZE_PROMO);
    if (slice.length > 0) {
      productListItems.push({
        featuredPromotion: {
          title: "Nebojte se, že na to budete sami.",
          kicker: "Profesionální realizace",
          image: promoImage,
          cta: { label: "Více o realizacích", link: "/realizace" },
          link: "/realizace",
        },
        products: slice,
      });
      currentIndex += BATCH_SIZE_PROMO;
    }
  }

  // 3. Second Promo Batch (Different Promo)
  if (currentIndex < products.length) {
    const slice = products.slice(currentIndex, currentIndex + BATCH_SIZE_PROMO);
    if (slice.length > 0) {
      productListItems.push({
        featuredPromotion: {
          title: "Přenechte starosti nám.",
          kicker: "Kompletní servis",
          image: promoImage,
          cta: { label: "Poptat realizaci", link: "/realizace" },
          link: "/realizace",
        },
        products: slice,
      });
      currentIndex += BATCH_SIZE_PROMO;
    }
  }

  // 4. Remaining items (Full Width)
  if (currentIndex < products.length) {
    const slice = products.slice(currentIndex);
    if (slice.length > 0) {
      productListItems.push({
        products: slice,
      });
    }
  }

  return <ProductList10 items={productListItems} title={title} />;
}
