"use client";

import { urlFor } from "@/sanity/lib/image";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";

import { cn, getImageDimensions } from "@/lib/utils";

import { Price, PriceValue } from "@/components/shadcnblocks/price";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FeaturedPromotion, Product, ProductList } from "@/types/product";
import Link from "next/link";
// ... existing imports

interface ProductList10Props {
  className?: string;
  items?: ProductList;
  title?: string;
  categorySlug?: string;
}

const ProductList10 = ({
  className,
  items,
  title = "Naše nabídka",
  categorySlug,
}: ProductList10Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get("sort") || "default";
  const collectionFilter = searchParams.get("collection") || "all";

  const collections = [
    { label: "Premium", value: "premium" },
    { label: "Classic", value: "classic" },
    { label: "Rigid SPC", value: "rigid-spc" },
  ];

  const showCollectionFilter = categorySlug === "podlahy-click";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCollectionChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("collection");
    } else {
      params.set("collection", value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className={cn("py-20 lg:py-32", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col  md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h2 className="font-serif mb-4 text-3xl md:text-4xl lg:text-5xl text-foreground font-medium tracking-tight">
              {title}
            </h2>
            <p className="mb-6 text-lg text-muted-foreground text-left max-w-2xl text-balance">
              Prohlédněte si naši širokou nabídku produktů v kategorii {title}.
              Vyberte si to nejlepší pro váš domov.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {showCollectionFilter && collections && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  Kolekce:
                </span>
                <div className="w-48">
                  <Select
                    value={collectionFilter}
                    onValueChange={handleCollectionChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Všechny kolekce" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Všechny kolekce</SelectItem>
                      {collections.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Řadit podle:
              </span>
              <div className="w-48">
                <Select value={sortOrder} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seřadit podle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Doporučeno</SelectItem>
                    <SelectItem value="asc">Od nejlevnějšího</SelectItem>
                    <SelectItem value="desc">Od nejdražšího</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {!items || items.length === 0 ? (
          <p className="py-10 text-lg text-muted-foreground text-center md:text-left">
            Bohužel zde zatím žádné produkty nejsou.
          </p>
        ) : (
          <div className="flex flex-col gap-12 lg:gap-20">
            {items.map((item, index) => (
              <div
                className="flex flex-col gap-8 lg:flex-row lg:gap-10 lg:even:flex-row-reverse"
                key={`product-list-10-featured-promo-${index}`}
              >
                {item.featuredPromotion && (
                  <div className="w-full lg:w-1/3 shrink-0">
                    <FeaturedPromotionCard {...item.featuredPromotion} />
                  </div>
                )}
                <div
                  className={
                    item.featuredPromotion ? "w-full lg:w-2/3" : "w-full"
                  }
                >
                  <div
                    className={cn(
                      "grid gap-x-6 gap-y-10",
                      item.featuredPromotion
                        ? "grid-cols-2 md:grid-cols-4"
                        : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6",
                    )}
                  >
                    {item.products.map((product, pIndex) => (
                      <ProductCard
                        {...product}
                        key={`product-10-list-card-${index}-${pIndex}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({
  link,
  mainImage,
  title,
  price,
  description,
  tags,
  category,
  m2PerPackage, // Added
}: Product) => {
  const { currency } = price;

  const dimensions = getImageDimensions(mainImage.asset._ref);

  const packageSize = m2PerPackage || 2.235;
  const isFloor = category?.toLowerCase().startsWith("podlahy");

  const displayPriceWithVAT = isFloor
    ? price.priceWithVAT / packageSize
    : price.priceWithVAT;
  const displayPriceWithoutVAT = isFloor
    ? (price.priceWithoutVAT || 0) / packageSize
    : price.priceWithoutVAT;

  return (
    <Card className="group relative block rounded-none border-none bg-background p-0 shadow-none">
      <Link href={link!} className="absolute inset-0 z-10 size-full" />
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <AspectRatio
            ratio={0.749767365}
            className="overflow-hidden rounded-xl"
          >
            <Image
              src={urlFor(mainImage).url()}
              alt={title}
              width={dimensions ? dimensions[0] : 1000}
              height={dimensions ? dimensions[1] : 1500}
              className="block size-full origin-center object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
          </AspectRatio>
          {tags && tags.length > 0 && (
            <div className="absolute start-2.5 top-2.5 z-60 flex flex-row gap-2 flex-wrap max-w-[80%]">
              {tags.map((tag, index) => (
                <Badge
                  key={`product-10-list-tag-${index}`}
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.text}
                </Badge>
              ))}
            </div>
          )}
          <div className="absolute inset-x-5 bottom-5 z-60 hidden md:block">
            <div className="flex flex-col gap-2 opacity-0 duration-700 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              <Button
                className="w-full bg-white text-black hover:bg-white/90"
                asChild
              >
                <a href={link}>
                  <ShoppingCart className="text-black" />
                  <span className="text-black">Detail</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-3">
          <CardTitle className="leading-normal font-normal underline-offset-3 group-hover:underline">
            {title}
          </CardTitle>
          <div className="mt-1 flex flex-col gap-0.5">
            <Price className="text-lg font-bold leading-none">
              <PriceValue
                price={displayPriceWithVAT}
                currency={currency}
                variant="regular"
              />
              <span className="text-xs font-normal text-muted-foreground ml-1">
                {isFloor ? "za m² vč. DPH" : "za kus vč. DPH"}
              </span>
            </Price>
            {displayPriceWithoutVAT && (
              <Price className="text-sm text-muted-foreground">
                <PriceValue
                  price={displayPriceWithoutVAT}
                  currency={currency}
                  variant="regular"
                  className="text-muted-foreground"
                />
                <span className="text-xs ml-1">
                  {isFloor ? "za m² bez DPH" : "za kus bez DPH"}
                </span>
              </Price>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedPromotionCard = ({
  kicker,
  title,
  cta,
  link,
  image,
}: FeaturedPromotion) => {
  return (
    <Card className="relative flex h-full min-h-[500px] flex-col justify-end overflow-hidden rounded-xl border-none p-6 shadow-xl md:min-h-[600px] md:p-10">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <a href={link} className="absolute inset-0 z-10 size-full">
        <span className="sr-only">Zobrazit {title}</span>
      </a>
      <CardHeader className="relative z-20 gap-3 p-0 text-white">
        <p className="text-sm font-medium tracking-wider uppercase text-white/80">
          {kicker}
        </p>
        <CardTitle className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl text-balance">
          {title}
        </CardTitle>
        <div className="mt-4">
          <Button
            variant="outline"
            size="lg"
            className="border-white bg-transparent text-white hover:bg-white hover:text-black"
            asChild
          >
            <Link href={link} className="relative z-30">
              {cta}
            </Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export { ProductList10 };
