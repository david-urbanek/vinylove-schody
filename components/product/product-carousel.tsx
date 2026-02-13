"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sanity types
interface SanityImage {
  asset: {
    _ref: string;
  };
}

interface SanityPattern {
  title: string;
  image?: SanityImage;
}

interface SanityProduct {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  gallery?: SanityImage[];
  pattern?: SanityPattern;
  pricePerUnit: number;
  tags?: string[];
  typeLabel: string;
  category: string;
}

interface PromoData {
  image: string;
  title: string;
  kicker: string;
  cta: {
    label: string;
    link: string;
  };
}

interface CarouselSection {
  title: string;
  value: string;
  promotion: PromoData;
  products: SanityProduct[];
}

type PromoCardProps = PromoData;

type BadgeData = {
  text: string;
  color: string;
};

type ProductCardProps = SanityProduct;

interface ProductColorsProps {
  pattern?: SanityPattern;
}

interface BadgesProps {
  badges?: Array<BadgeData>;
}

// Removed hardcoded PRODUCTS_LIST - now passed as props

// Helper to map tags to badge data
const mapTagsToBadges = (tags?: string[]): BadgeData[] => {
  if (!tags) return [];

  const badgeMap: Record<string, { text: string; color: string }> = {
    new: { text: "Novinka", color: "#0ea5e9" },
    sale: { text: "Akce", color: "#ef4444" },
    clearance: { text: "Doprodej", color: "#f59e0b" },
  };

  return tags.map((tag) => badgeMap[tag] || { text: tag, color: "#6b7280" });
};

/* OLD HARDCODED DATA REMOVED - SEE LINES 106-388 IN ORIGINAL FILE */

interface ProductCarouselProps {
  className?: string;
  sections: CarouselSection[];
}

const ProductCarousel = ({ className, sections }: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const onScroll = useCallback((api: CarouselApi) => {
    const progress = Math.max(0, Math.min(1, api?.scrollProgress() ?? 0));
    setScrollProgress(progress + 0.25);
  }, []);

  useEffect(() => {
    if (!api) return;

    // Defer initial call to avoid synchronous state update in effect
    requestAnimationFrame(() => {
      onScroll(api);
    });

    api
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [api, onScroll]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <Tabs defaultValue={sections[0]?.value}>
          <div className="mb-8 grid items-end gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Naše nabídka
              </h2>
              <p className="font-medium text-muted-foreground">
                Prohlédněte si naši nabídku kvalitních vinylových schodů a
                podlah.
              </p>
            </div>
            <TabsList className="md:justify-self-end">
              {sections.map((item) => (
                <TabsTrigger
                  key={`product-carousel-tab-trigger-${item.value}`}
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
              key={`product-carousel-tab-content-${index}`}
              className="data-[state=active]:animate-fade-in"
            >
              <Carousel
                setApi={setApi}
                className="w-full md:[&>div]:overflow-visible"
              >
                <CarouselContent className="ml-0 md:-ml-4 md:gap-0">
                  <CarouselItem className="basis-4/5 pl-3 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5">
                    <PromoCard {...item.promotion} />
                  </CarouselItem>
                  {item.products.map((product, index) => (
                    <CarouselItem
                      className="basis-4/5 pl-3 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
                      key={`product-carousel-item-${product._id}`}
                    >
                      <ProductCard {...product} />
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

const PromoCard = ({ image, title, cta, kicker }: PromoCardProps) => {
  return (
    <Card className="group relative flex size-full min-h-95 min-w-47.5 flex-col justify-between gap-5 overflow-hidden rounded-xl p-6 before:absolute before:inset-0 before:z-10 before:bg-black/20 lg:max-w-80">
      <Image
        src={image}
        alt={title}
        fill
        className="absolute inset-0 z-5 size-full origin-center object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <a href={cta.link} className="absolute inset-0 z-10 size-full"></a>
      <CardHeader className="pointer-events-none z-20 gap-4 p-0">
        <p className="font-bold text-white">{kicker}</p>
        <CardTitle className="text-3xl leading-tight text-white md:text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardAction className="z-20">
        <Button asChild variant="secondary" className="rounded-full">
          <a href={cta.link}>{cta.label}</a>
        </Button>
      </CardAction>
    </Card>
  );
};

const ProductCard = ({
  _id,
  title,
  slug,
  mainImage,
  gallery,
  pricePerUnit,
  typeLabel,
  pattern,
  tags,
}: ProductCardProps) => {
  // Generate image URLs using Sanity's urlFor
  const mainImageUrl = mainImage ? urlFor(mainImage).width(800).url() : "";
  const galleryImages = gallery && gallery.length > 0 ? gallery : [];

  // Map tags to badges
  const badges = mapTagsToBadges(tags);

  // Generate product link
  const productLink = `/produkt/${slug.current}`;

  return (
    <Card className="relative block rounded-none border-none bg-background p-0 shadow-none">
      <CardContent className="p-0">
        <div className="group relative overflow-hidden">
          <a href={productLink}>
            <AspectRatio ratio={1} className="overflow-hidden rounded-xl">
              {/* Main image */}
              <div className="absolute inset-0 size-full transition-opacity duration-700 z-20 group-hover:opacity-0">
                <img
                  src={mainImageUrl}
                  alt={title}
                  className="block size-full object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-100"
                />
              </div>

              {/* Gallery image on hover */}
              {galleryImages.length > 0 && (
                <div className="absolute inset-0 size-full z-10">
                  <img
                    src={urlFor(galleryImages[0]).width(800).url()}
                    alt={title}
                    className="block size-full object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-100"
                  />
                </div>
              )}
            </AspectRatio>
          </a>
          <div className="absolute start-2.5 top-2.5 z-60">
            <Badges badges={badges} />
          </div>
          <div className="absolute end-2.5 bottom-2.5 z-60 md:hidden">
            <Button variant="secondary" size="icon" className="rounded-full">
              <ShoppingBag />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-5">
          <span className="text-xs leading-loose font-bold text-muted-foreground uppercase">
            {typeLabel}
          </span>
          <a href={productLink} className="underline-offset-4 hover:underline">
            <CardTitle className="leading-normal">{title}</CardTitle>
          </a>
          <Price onSale={false} className="text-sm leading-normal font-bold">
            <PriceValue price={pricePerUnit} currency="CZK" variant="regular" />
          </Price>
          {pattern && <ProductColors pattern={pattern} />}
        </div>
      </CardContent>
    </Card>
  );
};

const ProductColors = ({ pattern }: ProductColorsProps) => {
  if (!pattern) return null;

  const patternImageUrl = pattern.image
    ? urlFor(pattern.image).width(100).url()
    : "";

  return (
    <div className="mt-2 flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            {patternImageUrl ? (
              <img
                src={patternImageUrl}
                alt={pattern.title}
                className="size-5.5 border rounded object-cover"
              />
            ) : (
              <div className="size-5.5 border rounded bg-muted" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{pattern.title}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const Badges = ({ badges }: BadgesProps) => {
  if (!badges) return;

  return (
    <div className="flex flex-col gap-1.5">
      {badges.map((item, index) => (
        <Badge
          style={{ backgroundColor: item.color }}
          key={`product-list-9-badge-${index}`}
          className="rounded-full dark:text-white"
        >
          {item.text}
        </Badge>
      ))}
    </div>
  );
};

export { ProductCarousel };
