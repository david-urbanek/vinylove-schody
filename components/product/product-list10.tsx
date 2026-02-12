"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/shadcnblocks/price";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FeaturedPromotionCardProps,
  ProductCardProps,
  ProductList,
  STOCK_STATUS,
} from "@/types/product";
// ... existing imports

interface ProductList10Props {
  className?: string;
  items?: ProductList;
  title?: string;
}

const ProductList10 = ({
  className,
  items,
  title = "Vinylové podlahy a příslušenství",
}: ProductList10Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortOrder = searchParams.get("sort") || "default";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <section className={cn("py-20 lg:py-32", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium tracking-tight">
            {title}
          </h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Řadit podle:
            </span>
            <div className="w-full md:w-48">
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
        {!items || items.length === 0 ? (
          <p className="py-10 text-lg text-muted-foreground text-center md:text-left">
            Bohužel zde zatím žádné produkty nejsou.
          </p>
        ) : (
          <>
            <p className="mb-10 md:mb-16 text-lg text-muted-foreground text-center md:text-left max-w-2xl text-balance">
              Prohlédněte si naši širokou nabídku produktů v kategorii {title}.
              Vyberte si to nejlepší pro váš domov.
            </p>
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
          </>
        )}
      </div>
    </section>
  );
};

const ProductCard = ({
  link,
  image,
  name,
  price,
  stockStatusCode,
}: ProductCardProps) => {
  const { priceWithVAT: regular, sale, currency } = price;

  return (
    <Card className="group relative block rounded-none border-none bg-background p-0 shadow-none">
      <a href={link} className="absolute inset-0 z-10 size-full"></a>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <AspectRatio
            ratio={0.749767365}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={image.src}
              srcSet={image.srcset}
              alt={image.alt}
              sizes={image.sizes}
              className="block size-full origin-center object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
          </AspectRatio>
          {stockStatusCode === STOCK_STATUS.OUT_OF_STOCK && (
            <div className="absolute start-2.5 top-2.5 z-60">
              <Badge>Vyprodáno</Badge>
            </div>
          )}
          {stockStatusCode === STOCK_STATUS.IN_STOCK && price.sale && (
            <div className="absolute start-2.5 top-2.5 z-60">
              <Badge variant="destructive">Akce</Badge>
            </div>
          )}
          <div className="absolute inset-x-5 bottom-5 z-60 hidden md:block">
            <div className="flex flex-col gap-2 opacity-0 duration-700 lg:translate-y-4 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              <Button
                disabled={stockStatusCode === STOCK_STATUS.OUT_OF_STOCK}
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
            {name}
          </CardTitle>
          <div className="mt-1 flex flex-col gap-0.5">
            <Price className="text-lg font-bold leading-none">
              <PriceValue
                price={sale ?? regular}
                currency={currency}
                variant="regular"
              />
              <span className="text-xs font-normal text-muted-foreground ml-1">
                vč. DPH
              </span>
            </Price>
            {price.priceWithoutVat && (
              <Price className="text-sm text-muted-foreground">
                <PriceValue
                  price={price.priceWithoutVat}
                  currency={currency}
                  variant="regular"
                  className="text-muted-foreground"
                />
                <span className="text-xs ml-1">bez DPH</span>
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
}: FeaturedPromotionCardProps) => {
  return (
    <Card
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="relative flex h-full min-h-[500px] flex-col justify-end overflow-hidden rounded-xl border-none bg-cover bg-center bg-no-repeat p-6 shadow-xl md:min-h-[600px] md:p-10"
    >
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
            <a href={cta.link} className="relative z-30">
              {cta.label}
            </a>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export { ProductList10 };
