import { ProductList10 } from "@/components/product/product-list10";
import { CATEGORY_MAP } from "@/data/data";
import { addVat, getTags } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Product, ProductList } from "@/types/product";
import { Metadata, ResolvingMetadata } from "next";

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
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });

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

    // Format price
    const priceWithoutVAT = item.pricePerUnit;

    // Construct Link
    const productSlug = item.slug?.current || item.slug || "#";
    const productLink = `/produkt/${productSlug}`;

    return {
      title: item.title || "Unnamed Product",
      mainImage,
      link: productLink,
      price: {
        priceWithVAT: addVat(priceWithoutVAT),
        priceWithoutVAT,
        currency: "CZK",
      },
      //pro tohle napsat funkci
      tags: getTags(item.tags),
    };
  });

  // Sort products based on searchParams
  const sort = await props.searchParams;
  const sortOrder = sort?.sort;

  if (sortOrder === "asc") {
    products.sort((a, b) => {
      const priceA = a.price.priceWithoutVAT;
      const priceB = b.price.priceWithoutVAT;
      return priceA - priceB;
    });
  } else if (sortOrder === "desc") {
    products.sort((a, b) => {
      const priceA = a.price.priceWithoutVAT;
      const priceB = b.price.priceWithoutVAT;
      return priceB - priceA;
    });
  }

  // Split into batches
  const BATCH_SIZE_PROMO = 6; // products next to promo

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
          cta: "Více o realizacích",
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
          cta: "Poptat realizaci",
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
