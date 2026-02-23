export const STOCK_STATUS = {
  IN_STOCK: "IN_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
} as const;

export type StockStatusCode = keyof typeof STOCK_STATUS;

export interface ProductPrice {
  priceWithVAT: number;
  priceWithoutVAT: number;
  currency: string;
  sale?: number;
}

export interface Tag {
  text: string;
  color: string;
}

export interface Product {
  _id: string;
  _type: string;
  title: string;
  category?: string;
  description: string;
  mainImage?: any;
  gallery?: any[];
  techParams?: any;
  features?: string[];
  pattern?: {
    title: string;
    image?: any;
    _id: string;
  };
  pricePerUnit: number;
  price: ProductPrice;
  typeLabel?: string;
  slug: {
    current: string;
  };
  name?: string;
  link: string;
  url?: string;
  tags?: Tag[];
  isSample?: boolean;
  type?: string;
  collection?: string;
  m2PerPackage?: number;
  manufacturer?: string;
}

export interface EmailCartItem {
  id: string;
  quantity: number;
  price: ProductPrice;
  title: string;
  image: string;
  url: string;
}

export type ProductCardProps = Product;

export interface FeaturedPromotion {
  kicker: string;
  title: string;
  cta: string;
  link: string;
  image: string;
}

export type FeaturedPromotionCardProps = FeaturedPromotion;

export type ProductList = Array<{
  featuredPromotion?: FeaturedPromotion;
  products: Array<Product>;
}>;
