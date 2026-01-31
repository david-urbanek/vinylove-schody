"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface RelatedProduct {
  _id: string;
  title: string;
  slug: { current: string };
  pricePerUnit: number;
  mainImage: any;
  category: string;
}

export interface RelatedSection {
  title: string;
  value: string;
  products: RelatedProduct[];
}

interface RelatedProductsProps {
  sections: RelatedSection[];
  className?: string;
}

const RelatedProducts = ({ sections, className }: RelatedProductsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((api: CarouselApi) => {
    const progress = Math.max(0, Math.min(1, api?.scrollProgress() ?? 0));
    setScrollProgress(progress + 0.25);
  }, []);

  useEffect(() => {
    if (!api) return;

    requestAnimationFrame(() => {
      onScroll(api);
    });

    api
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [api, onScroll]);

  if (!sections || sections.length === 0) return null;

  return (
    <section className={cn("overflow-hidden py-16", className)}>
      <div className="container">
        <Tabs defaultValue={sections[0].value}>
          <div className="mb-8 grid items-end gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Doporučujeme si koupit zároveň
              </h2>
              <p className="font-medium text-muted-foreground">
                Vyberte si vhodné doplňky pro dokonalý výsledek vaší realizace.
              </p>
            </div>
            <TabsList className="md:justify-self-end">
              {sections.map((item) => (
                <TabsTrigger
                  key={`related-tab-trigger-${item.value}`}
                  value={item.value}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {sections.map((item, index) => (
            <TabsContent
              value={item.value}
              key={`related-tab-content-${index}`}
              className="data-[state=active]:animate-fade-in"
            >
              <Carousel
                opts={{
                  breakpoints: {
                    "(max-width: 768px)": {
                      active: false,
                      startIndex: 0,
                      align: "start",
                      slidesToScroll: 1,
                    },
                  },
                }}
                setApi={setApi}
                className="w-full md:[&>div]:overflow-visible"
              >
                <CarouselContent className="ml-0 grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:-ml-4 md:flex md:gap-0">
                  {item.products.map((product, idx) => (
                    <CarouselItem
                      className="pl-0 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
                      key={`related-product-${product._id}-${idx}`}
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-6 hidden items-center gap-3 md:flex">
                  <div className="relative h-0.5 w-full overflow-hidden bg-muted">
                    <div
                      style={{
                        transform: `scaleX(${scrollProgress})`,
                      }}
                      className="h-full origin-left bg-primary"
                    ></div>
                  </div>
                  <CarouselPrevious className="static translate-0" />
                  <CarouselNext className="static translate-0" />
                </div>
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: RelatedProduct }) => {
  const { title, slug, pricePerUnit, mainImage, category } = product;
  const [quantity, setQuantity] = useState(0);

  const link = `/produkt/${slug.current}`;

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(1);
    // Logic to add to cart should be implemented here or passed as prop
    console.log("Add to cart:", title);
  };

  const increment = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity((prev) => prev + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const imageUrl = mainImage ? urlFor(mainImage).width(600).url() : "";

  return (
    <Card className="relative block rounded-none border-none bg-background p-0 shadow-none">
      <CardContent className="p-0">
        <div className="group relative overflow-hidden">
          <a href={link}>
            <AspectRatio
              ratio={0.749767365}
              className="overflow-hidden rounded-xl bg-muted"
            >
              {imageUrl && (
                <div className="absolute inset-0 size-full">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="block size-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
            </AspectRatio>
          </a>

          <div className="absolute end-2.5 bottom-2.5 z-60 md:hidden">
            <Button variant="secondary" size="icon" className="rounded-full">
              <ShoppingBag />
            </Button>
          </div>
          {/* Desktop Overlay - Buttons or Quantity Selector */}
          <div
            className={cn(
              "absolute inset-x-4 bottom-4 z-60 hidden md:block transition-all duration-700",
              quantity > 0
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0",
            )}
          >
            {quantity === 0 ? (
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="secondary"
                  className="flex-1 rounded-full bg-white/90 hover:bg-white"
                >
                  <a href={link}>Detail</a>
                </Button>
                <Button
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90"
                  onClick={handleBuy}
                >
                  Koupit
                </Button>
              </div>
            ) : (
              <div className="flex w-full items-center justify-between rounded-full bg-slate-100 p-1 shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full bg-white text-emerald-600 shadow-sm hover:bg-white hover:text-emerald-700"
                  onClick={decrement}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="text-lg font-semibold tabular-nums">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  className="size-8 rounded-full bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                  onClick={increment}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-5">
          <a
            href={link}
            className="text-xs leading-loose font-bold text-muted-foreground uppercase underline-offset-4 hover:underline"
          >
            {category}
          </a>
          <a href={link} className="underline-offset-4 hover:underline">
            <CardTitle className="leading-normal font-normal underline-offset-3 group-hover:underline">
              {title}
            </CardTitle>
          </a>
          <Price className="text-sm leading-normal font-bold">
            <PriceValue price={pricePerUnit} currency="CZK" variant="regular" />
          </Price>
        </div>
      </CardContent>
    </Card>
  );
};

export { RelatedProducts };
