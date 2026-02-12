"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info, LucideIcon, Minus, Plus } from "lucide-react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { Fragment, useEffect, useRef, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import "photoswipe/style.css";
import { toast } from "sonner";

import { useCart } from "@/hooks/useCart";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { addVat, cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { STOCK_STATUS } from "@/types/product";

import { ProductVariants } from "@/components/product/product-variants";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// ... existing code

interface ProductImagesProps {
  images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    sizes: string;
    thumbnail: string;
  }>;
  galleryID: string;
}

interface SustainabilitySectionProps {
  sustainability: Array<{
    text: string;
    icon: LucideIcon;
  }>;
}

interface ProductInfoSectionsProps {
  info: Array<{
    title: string;
    content: React.ReactNode;
  }>;
}

interface QuantityProps {
  field: ControllerRenderProps<FormType>;
  max?: number;
  min?: number;
}

interface Hinges {
  label: string;
  id: string;
  name: FieldName;
  min?: number;
  max?: number;
}

interface ProductFormProps {
  availability: boolean;
  hinges: Record<FieldName, Hinges>;
  pricePerPackage: number;
  packageSize: number;
  onAddToCart: (quantity: number) => void;
}

type FormType = z.infer<typeof formSchema>;
type FieldName = keyof FormType;

// Fallback values if not provided in Sanity
const DEFAULT_PRICE = 0;
// Note: Packaging info is now dynamic, but we keep defaults just in case
const DEFAULT_PACKAGE_SIZE = 2.0;

interface ProductDetail7Props {
  className?: string;
  product: any; // We can type this more strictly later based on Sanity Schema
  relatedProducts?: any[];
}

// ... imports

interface StairProductFormProps {
  availability: boolean;
  pricePerPiece: number;
  allowSample?: boolean;
  onAddToCart: (quantity: number) => void;
  onOrderSample?: () => void;
}

const StairProductForm = ({
  availability,
  pricePerPiece,
  allowSample = true,
  onAddToCart,
  onOrderSample,
}: StairProductFormProps) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = form.watch("quantity");
  const totalPrice = quantity * pricePerPiece;

  function onSubmit(values: FormType) {
    onAddToCart(values.quantity);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 py-4"
      >
        <div className="space-y-2">
          <span className="text-sm font-medium">Počet kusů:</span>
          <div className="flex w-32 items-center">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Quantity field={field} min={1} max={999} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {new Intl.NumberFormat("cs-CZ", {
              style: "currency",
              currency: "CZK",
              maximumFractionDigits: 0,
            }).format(addVat(pricePerPiece) * quantity)}
          </span>
          <span className="text-sm text-muted-foreground">
            {new Intl.NumberFormat("cs-CZ", {
              style: "currency",
              currency: "CZK",
              maximumFractionDigits: 0,
            }).format(totalPrice)}{" "}
            bez DPH
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row w-full">
          <Button
            size="lg"
            type="submit"
            className="flex-1"
            disabled={!availability}
          >
            {availability ? "PŘIDAT DO KOŠÍKU" : "Vyprodáno"}
          </Button>
          {allowSample && (
            <Button
              size="lg"
              variant="outline"
              type="button"
              className="flex-1"
              onClick={onOrderSample}
            >
              OBJEDNAT VZOREK
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

// ... existing ProductDetail7 component ...

const ProductDetail7 = ({
  className,
  product,
  relatedProducts = [],
}: ProductDetail7Props) => {
  // Parsing Sanity Data
  const {
    _id,
    _type,
    title,
    category,
    description,
    mainImage,
    gallery,
    techParams,
    features,
    pattern,
    pricePerUnit,
    typeLabel,
    slug,
  } = product || {};

  console.log(product);

  const { addItem, items } = useCart();

  const productLink = slug?.current
    ? `/produkt/${slug.current}`
    : `/produkt/${_id}`;

  const handleAddToCart = (quantity: number) => {
    const price = pricePerUnit || 0;

    addItem(
      {
        name: title || "Unknown Product",
        id: _id, // Adding ID to help with uniqueness if link is not enough, though interface might not have it strictly
        link: productLink,
        price: {
          regular: addVat(price),
          priceWithoutVat: price,
          currency: "CZK",
        },
        image: {
          src: mainImage ? urlFor(mainImage).url() : "",
          alt: title || "Product Image",
        },
        stockStatusCode: STOCK_STATUS.IN_STOCK,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      quantity,
    );

    toast.success("Produkt byl přidán do košíku", {
      description: `${quantity}x ${title || "Produkt"}`,
      duration: 3000,
    });
  };

  const handleOrderSample = () => {
    const sampleTitle = `Vzorek - ${title || "Produkt"}`;
    const sampleId = `sample-${_id}`;

    // Check if sample is already in cart
    const sameSampleExists = items.some((item) => item.id === sampleId);

    if (sameSampleExists) {
      toast.info("Vzorek již je v košíku", {
        description: "Maximálně 1 kus na vzorek.",
        duration: 3000,
      });
      return;
    }

    addItem(
      {
        name: sampleTitle,
        id: sampleId,
        link: `${productLink}?sample=true`,
        price: {
          regular: 0, // Samples are usually free or specific price. Assuming free for now based on context.
          currency: "CZK",
        },
        image: {
          src: pattern?.image
            ? urlFor(pattern.image).url()
            : mainImage
              ? urlFor(mainImage).url()
              : "",
          alt: sampleTitle,
        },
        stockStatusCode: STOCK_STATUS.IN_STOCK,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      1,
    );

    toast.success("Vzorek přidán do košíku", {
      description: sampleTitle,
      duration: 3000,
    });
  };

  // ... images logic ... (keep existing)
  const rawImages = [mainImage, ...(gallery || []), pattern?.image].filter(
    Boolean,
  );
  const images = rawImages.map((img: any) => ({
    src: urlFor(img).url(),
    thumbnail: urlFor(img).width(200).url(),
    alt: img.alt || title || "Product Image",
    width: 2400,
    height: 1600,
    sizes: "(min-width: 2400px) 2400px, (min-width: 1920px) 1920px, 100vw",
  }));

  // Feature mapping ... (keep existing)
  const FEATURE_MAP: Record<string, string> = {
    waterproof: "Voděodolné",
    "underfloor-heating": "Pro podlahové vytápění",
    "integrated-underlay": "Integrovaná podložka",
    recyclable: "Recyklovatelné",
    phthalateFree: "Bez ftalátů",
  };

  const isStair = _type === "stair";
  const isSkirting = _type === "skirting";
  const isTransitionProfile = _type === "transitionProfile";
  const isAccessory = _type === "accessory";
  const isFloor = _type === "floor";

  // Tech params content construction
  let techContent;
  if (isStair) {
    techContent = techParams ? (
      <ul className="list-disc pl-5 space-y-1">
        {techParams.dimensions && (
          <li>
            <strong>Rozměr:</strong> {techParams.dimensions}
          </li>
        )}
        {techParams.stairLength && (
          <li>
            <strong>Délka:</strong> {techParams.stairLength} mm
          </li>
        )}
        {techParams.stairDepth && (
          <li>
            <strong>Hloubka:</strong> {techParams.stairDepth} mm
          </li>
        )}
        {techParams.stairNoseHeight && (
          <li>
            <strong>Výška nosu:</strong> {techParams.stairNoseHeight} mm
          </li>
        )}
        {techParams.thickness && (
          <li>
            <strong>Tloušťka:</strong> {techParams.thickness} mm
          </li>
        )}
        {techParams.wearLayer && (
          <li>
            <strong>Nášlapná vrstva:</strong> {techParams.wearLayer} mm
          </li>
        )}
      </ul>
    ) : null;
  } else if (isSkirting) {
    techContent = techParams ? (
      <ul className="list-disc pl-5 space-y-1">
        {techParams.length && (
          <li>
            <strong>Délka:</strong> {techParams.length} mm
          </li>
        )}
        {techParams.height && (
          <li>
            <strong>Výška:</strong> {techParams.height} mm
          </li>
        )}
        {techParams.width && (
          <li>
            <strong>Hloubka/Šířka:</strong> {techParams.width} mm
          </li>
        )}
        {techParams.material && (
          <li>
            <strong>Materiál:</strong> {techParams.material}
          </li>
        )}
        {techParams.cableChannel !== undefined && (
          <li>
            <strong>Kabelový kanálek:</strong>{" "}
            {techParams.cableChannel ? "Ano" : "Ne"}
          </li>
        )}
      </ul>
    ) : null;
  } else if (isTransitionProfile) {
    techContent = techParams ? (
      <ul className="list-disc pl-5 space-y-1">
        {techParams.length && (
          <li>
            <strong>Délka:</strong> {techParams.length} mm
          </li>
        )}
        {techParams.width && (
          <li>
            <strong>Šířka:</strong> {techParams.width} mm
          </li>
        )}
        {techParams.elevation && (
          <li>
            <strong>Převýšení:</strong> {techParams.elevation}
          </li>
        )}
        {techParams.mounting && (
          <li>
            <strong>Montáž:</strong> {techParams.mounting}
          </li>
        )}
      </ul>
    ) : null;
  } else if (isAccessory) {
    // Accessories usually don't have detailed tech params or they are in description
    techContent = null;
  } else {
    techContent = techParams ? (
      <ul className="list-disc pl-5 space-y-1">
        {techParams.dimensions && (
          <li>
            <strong>Rozměr lamely:</strong> {techParams.dimensions}
          </li>
        )}
        {techParams.thickness && (
          <li>
            <strong>Tloušťka:</strong> {techParams.thickness} mm
          </li>
        )}
        {techParams.wearLayer && (
          <li>
            <strong>Nášlapná vrstva:</strong> {techParams.wearLayer} mm
          </li>
        )}
        {techParams.piecesInPackage && (
          <li>
            <strong>Kusů v balení:</strong> {techParams.piecesInPackage}
          </li>
        )}
        {techParams.m2InPackage && (
          <li>
            <strong>m² v balení:</strong> {techParams.m2InPackage}
          </li>
        )}
        {techParams.weightPackage && (
          <li>
            <strong>Hmotnost balení:</strong> {techParams.weightPackage} kg
          </li>
        )}
      </ul>
    ) : null;
  }

  // Construct Accordion Data
  const accordionData = [
    {
      title: "Popis produktu",
      content: <p>{description || "Popis není k dispozici."}</p>,
    },
    techContent
      ? {
          title: "Technické parametry",
          content: techContent,
        }
      : null,
  ].filter((item) => item !== null);

  // Pricing & Packaging
  const packageSize = techParams?.m2InPackage || DEFAULT_PACKAGE_SIZE;
  const price = pricePerUnit || 0; // For floors, this is package price
  const pricePerM2 = packageSize > 0 ? price / packageSize : 0;

  // For stairs AND skirting AND transition profiles AND accessories
  const unitPrice = pricePerUnit || 0;

  return (
    <section className={cn("py-10", className)}>
      <div className="mx-auto w-full max-w-375 px-4 font-sans">
        <div className="relative flex w-full flex-col items-start justify-center gap-6 md:flex-row md:gap-8 xl:gap-20">
          <div className="top-4 w-full flex-1 self-start md:sticky lg:top-32">
            <ProductImages
              images={images}
              galleryID={`gallery-${product?._id}`}
            />
          </div>
          <div className="w-full shrink-0 md:w-[42%]">
            <div className="flex flex-col gap-1">
              <div className="text-xs leading-normal tracking-widest text-muted-foreground uppercase">
                {typeLabel || "Produkt"}
              </div>
              <h2 className="text-[2rem] leading-tight">{title}</h2>
            </div>

            <div className="my-6">
              <div className="flex items-center justify-between mb-4">
                {pattern && (
                  <span className="text-sm font-medium">
                    Dekor:{" "}
                    <span className="text-muted-foreground font-normal">
                      {pattern.title}
                    </span>
                  </span>
                )}
              </div>
              {/* Variants / Related Products */}
              <ProductVariants
                products={relatedProducts}
                currentProductId={_id}
              />
            </div>

            <div className="my-6 space-y-2 rounded-lg bg-muted/50 p-4">
              {isFloor ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Cena za 1 balení:
                    </span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                        maximumFractionDigits: 0,
                      }).format(addVat(price))}{" "}
                      vč. DPH
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Cena za 1 balení bez DPH:
                    </span>
                    <span className="font-medium text-muted-foreground">
                      {new Intl.NumberFormat("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                        maximumFractionDigits: 0,
                      }).format(price)}{" "}
                      bez DPH
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cena za m²:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                        maximumFractionDigits: 0,
                      }).format(addVat(pricePerM2))}{" "}
                      vč. DPH
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Cena za m² bez DPH:
                    </span>
                    <span className="font-medium text-muted-foreground">
                      {new Intl.NumberFormat("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                        maximumFractionDigits: 0,
                      }).format(pricePerM2)}{" "}
                      bez DPH
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cena za kus:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                        maximumFractionDigits: 0,
                      }).format(addVat(unitPrice))}{" "}
                      vč. DPH
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Cena za kus bez DPH:
                    </span>
                    <span className="font-medium text-muted-foreground">
                      {new Intl.NumberFormat("cs-CZ", {
                        style: "currency",
                        currency: "CZK",
                        maximumFractionDigits: 0,
                      }).format(unitPrice)}{" "}
                      bez DPH
                    </span>
                  </div>
                </>
              )}
            </div>

            {features && (
              <ul className="mb-6 list-disc pl-5 space-y-1">
                {features.map((text: string, index: number) => (
                  <li key={`product-detail-feature-${index}`}>
                    {FEATURE_MAP[text] || text}
                  </li>
                ))}
              </ul>
            )}

            {isStair && (
              <div className="mb-6 flex gap-3 rounded-md bg-muted/50 p-4 text-sm">
                <Info className="mt-0.5 size-5 shrink-0 text-foreground" />
                <div>
                  <p className="font-medium text-foreground">
                    Potřebujete jiné rozměry?
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Rozměry schodů vám rádi upravíme na míru. Stačí napsat
                    požadované rozměry do poznámky v objednávce.
                  </p>
                </div>
              </div>
            )}

            {isFloor ? (
              <ProductForm
                hinges={{
                  quantity: {
                    label: "Množství",
                    id: "quantity",
                    name: "quantity",
                    min: 1,
                    max: 999,
                  },
                }}
                availability={true}
                pricePerPackage={price}
                packageSize={packageSize}
                onAddToCart={handleAddToCart}
                onOrderSample={handleOrderSample}
              />
            ) : (
              <StairProductForm
                availability={true}
                pricePerPiece={unitPrice}
                allowSample={isStair}
                onAddToCart={handleAddToCart}
                onOrderSample={handleOrderSample}
              />
            )}

            <ProductInfoSections info={accordionData} />
          </div>
        </div>
      </div>
    </section>
  );
};

const formSchema = z.object({
  quantity: z.number().min(1),
});

interface ProductFormProps {
  availability: boolean;
  hinges: Record<FieldName, Hinges>;
  pricePerPackage: number;
  packageSize: number;
  onAddToCart: (quantity: number) => void;
  onOrderSample?: () => void;
}

// ...

const ProductForm = ({
  availability,
  hinges,
  pricePerPackage,
  packageSize,
  onAddToCart,
  onOrderSample,
}: ProductFormProps) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const stickyButtonWrapperRef = useRef<HTMLDivElement>(null);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = form.watch("quantity");
  const totalM2 = quantity * packageSize;
  const totalPrice = quantity * pricePerPackage;

  function onSubmit(values: FormType) {
    onAddToCart(values.quantity);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (stickyButtonWrapperRef.current) {
            stickyButtonWrapperRef.current.classList.toggle(
              "opacity-0",
              entry.isIntersecting,
            );
          }
        });
      },
      {
        threshold: 0.02,
      },
    );
    if (submitButtonRef.current) {
      observer.observe(submitButtonRef.current);
    }
  }, []);

  const quantityHinges = hinges?.quantity;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 py-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8">
          <div className="space-y-2">
            <span className="text-sm font-medium">Počet m²:</span>
            <div className="flex h-10 items-center overflow-hidden rounded-md border shadow-xs bg-muted/50">
              <Button
                onClick={() =>
                  form.setValue(
                    "quantity",
                    Math.max(quantityHinges.min || 1, quantity - 1),
                  )
                }
                variant="ghost"
                type="button"
                size="icon"
                className="size-10 shrink-0 rounded-none bg-background hover:bg-muted"
              >
                <Minus className="size-4" />
              </Button>
              <div className="flex h-full w-24 items-center justify-center border-x bg-background px-2 text-center text-sm font-medium">
                {totalM2.toFixed(3)}
              </div>
              <Button
                onClick={() =>
                  form.setValue(
                    "quantity",
                    Math.min(quantityHinges.max || 999, quantity + 1),
                  )
                }
                variant="ghost"
                type="button"
                size="icon"
                className="size-10 shrink-0 rounded-none bg-background hover:bg-muted"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <div className="pb-3 text-muted-foreground">=</div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Počet balení:</span>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Quantity
                      field={field}
                      min={quantityHinges.min}
                      max={quantityHinges.max}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {new Intl.NumberFormat("cs-CZ", {
              style: "currency",
              currency: "CZK",
              maximumFractionDigits: 0,
            }).format(addVat(pricePerPackage) * quantity)}
          </span>
          <span className="text-sm text-muted-foreground">
            {new Intl.NumberFormat("cs-CZ", {
              style: "currency",
              currency: "CZK",
              maximumFractionDigits: 0,
            }).format(totalPrice)}{" "}
            bez DPH
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row w-full">
          <Button
            size="lg"
            type="submit"
            className="flex-1"
            ref={submitButtonRef}
            disabled={!availability}
          >
            {availability ? "PŘIDAT DO KOŠÍKU" : "Vyprodáno"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            type="button"
            className="flex-1"
            onClick={onOrderSample}
          >
            OBJEDNAT VZOREK
          </Button>
        </div>
        {availability && (
          <div
            ref={stickyButtonWrapperRef}
            className="fixed bottom-0 left-0 z-10 w-full bg-background p-4 opacity-0 transition-opacity duration-300 md:hidden"
          >
            <Button
              size="lg"
              type="submit"
              className="w-full"
              disabled={!availability}
            >
              PŘIDAT DO KOŠÍKU
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

const Quantity = ({ field, max, min }: QuantityProps) => {
  return (
    <div className="flex h-10 w-32 shrink-0 items-center justify-between overflow-hidden rounded-md border shadow-xs bg-muted/50">
      <Button
        onClick={() =>
          field.onChange(Math.max(min || 1, Number(field.value || 1) - 1))
        }
        variant="ghost"
        type="button"
        size="icon"
        className="size-10 shrink-0 rounded-none bg-background hover:bg-muted"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        {...field}
        value={field.value ?? ""}
        onChange={(e) => {
          const raw = e.target.value;
          const parsed = parseInt(raw, 10);
          if (raw === "") {
            field.onChange("");
          } else if (!isNaN(parsed)) {
            field.onChange(parsed);
          }
        }}
        type="number"
        min={min ? min : 1}
        max={max ? max : 999}
        className="h-full w-full rounded-none border-x border-y-0 !bg-background px-1 text-center shadow-none focus-visible:ring-0"
      />
      <Button
        onClick={() =>
          field.onChange(Math.min(max || 999, Number(field.value || 1) + 1))
        }
        variant="ghost"
        type="button"
        size="icon"
        className="size-10 shrink-0 rounded-none bg-background hover:bg-muted"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};

const SustainabilitySection = ({
  sustainability,
}: SustainabilitySectionProps) => {
  if (!sustainability) return;
  return (
    <div className="flex flex-wrap gap-10 pt-1 pb-8">
      {sustainability.map((item, index) => (
        <div
          key={`product-detail-7-sustainability-${index}`}
          className="flex flex-col flex-wrap items-center gap-1"
        >
          <item.icon className="size-9 stroke-foreground stroke-1" />
          <div className="text-xs font-light">{item.text}</div>
        </div>
      ))}
    </div>
  );
};

const ProductInfoSections = ({ info }: ProductInfoSectionsProps) => {
  if (!info) return;

  return (
    <Accordion type="multiple" className="w-full border-t">
      {info.map((item, index) => (
        <AccordionItem
          value={`product-info-${index}`}
          key={`product-detail-7-info-${index}`}
        >
          <AccordionTrigger className="group/trigger py-5 font-merriweather text-xl hover:no-underline [&>svg:last-of-type]:hidden">
            {item.title}
            <div className="relative size-5">
              <Plus className="absolute top-0 left-0 size-full stroke-1 transition-opacity duration-300 group-data-[state=open]/trigger:opacity-0" />
              <Minus className="absolute top-0 left-0 size-full stroke-1 opacity-0 transition-opacity duration-300 group-data-[state=open]/trigger:opacity-100" />
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-base text-balance">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const ProductImages = ({ images, galleryID }: ProductImagesProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const lightboxRef = useRef<PhotoSwipeLightbox | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLUListElement>(null);
  const isDesktop = useMediaQuery("(width >= 900px)");

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryID,
      children: "a",
      bgOpacity: 1,
      wheelToZoom: true,
      mainClass:
        "[&>div:first-child]:!bg-background [&_*]:!text-foreground [&_*]:!text-shadow-none",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    lightboxRef.current = lightbox;
    return () => lightbox.destroy();
  }, [galleryID]);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => setCurrent(api.selectedScrollSnap() + 1);
    updateCurrent();
    api.on("select", updateCurrent);
    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  useEffect(() => {
    if (lightboxRef.current && api) {
      lightboxRef.current.on("change", () => {
        api?.scrollTo(lightboxRef.current?.pswp?.currIndex || 0);
      });
    }
  }, [api, current]);

  useEffect(() => {
    if (!previewRef.current || !thumbnailRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!isDesktop && thumbnailRef.current) {
        thumbnailRef.current.style.height = `${entry.contentRect.height}px`;
      }
    });

    if (!isDesktop) {
      observer.observe(previewRef.current);
    }

    return () => observer.disconnect();
  }, [isDesktop]);

  if (!images || images.length === 0) return null;

  return (
    <Fragment>
      <div className="flex w-full items-start justify-between gap-4">
        <ul
          ref={thumbnailRef}
          className="hidden w-20 shrink-0 grow-0 flex-col gap-2 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] md:flex [::-webkit-scrollbar]:hidden"
        >
          {images.map((img, index) => (
            <li
              className="w-full shrink-0"
              key={`product-detail-7-thumbnail-${index}`}
            >
              <button
                onClick={() => api?.scrollTo(index)}
                data-state={index + 1 === current ? "active" : "inactive"}
                type="button"
                className="relative block size-20 overflow-hidden rounded-[0.875rem] after:pointer-events-none after:absolute after:inset-0 after:z-10 after:block after:size-full after:rounded-[0.875rem] after:inset-ring-2 after:inset-ring-transparent after:transition-shadow after:duration-200 after:content-[''] data-[state=active]:after:inset-ring-current"
              >
                <img
                  src={img.thumbnail}
                  alt={img.alt}
                  className="block size-full object-cover object-center"
                  loading="lazy"
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="w-full md:max-w-2xl">
          <div className="group/product-photos relative h-fit w-full">
            {/* New Badge could be dynamic based on tags */}
            <div className="pswp-gallery" id={galleryID}>
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent className="-ml-2">
                  {images.map((img, index) => (
                    <CarouselItem
                      key={`product-detail-7-image-${index}`}
                      className="w-full pl-2"
                    >
                      <AspectRatio
                        ref={previewRef}
                        ratio={0.8}
                        className="w-full overflow-hidden rounded-[0.875rem] bg-muted"
                      >
                        <a
                          href={img.src}
                          data-pswp-width={img.width}
                          data-pswp-height={img.height}
                          target="_blank"
                          rel="noreferrer"
                          data-cropped="true"
                          className="hover:cursor-zoom-in"
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            width={img.width}
                            height={img.height}
                            sizes={img.sizes}
                            className="block size-full rounded-[0.875rem] object-cover object-center"
                          />
                        </a>
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden opacity-0 group-hover/product-photos:opacity-100 md:block">
                  {current > 1 && (
                    <CarouselPrevious className="left-0 ml-6 size-11 dark:bg-white dark:hover:bg-white dark:[&>svg]:stroke-black" />
                  )}
                  {current < images.length && (
                    <CarouselNext className="right-0 mr-6 size-11 dark:bg-white dark:hover:bg-white dark:[&>svg]:stroke-black" />
                  )}
                </div>
              </Carousel>
            </div>
            <Badge
              className="absolute bottom-4 left-4 rounded-full bg-background py-1.5 text-xs xl:hidden"
              variant="secondary"
            >
              {current || 1} / {images.length}
            </Badge>
          </div>
          <div className="relative my-2 h-[0.1875rem] w-full overflow-hidden rounded-[0.625rem] bg-muted xl:hidden">
            <div
              style={{
                width: `calc(100% / ${images.length})`,
                transform: `translateX(calc(100%*${current - 1}))`,
              }}
              className="absolute h-full bg-foreground transition-transform duration-300"
            ></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { ProductDetail7 };
