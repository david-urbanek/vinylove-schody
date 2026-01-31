export const STOCK_STATUS = {
  IN_STOCK: "IN_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
} as const;

export type StockStatusCode = keyof typeof STOCK_STATUS;

export interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

export interface Product {
  name: string;
  image: {
    src: string;
    srcset?: string;
    sizes?: string;
    alt: string;
  };
  link: string;
  price: ProductPrice;
  stockStatusCode: StockStatusCode;
  badges?: Array<{
    text: string;
    color?: string;
  }>;
}

export type ProductCardProps = Product;

export interface FeaturedPromotion {
  kicker: string;
  title: string;
  cta: {
    link: string;
    label: string;
  };
  link: string;
  image: string;
}

export type FeaturedPromotionCardProps = FeaturedPromotion;

export type ProductList = Array<{
  featuredPromotion?: FeaturedPromotion;
  products: Array<Product>;
}>;
