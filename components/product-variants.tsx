import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface ProductVariantsProps {
  products: any[];
  currentProductId: string;
}

export function ProductVariants({
  products,
  currentProductId,
}: ProductVariantsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {products.map((item) => {
        const isSelected = item._id === currentProductId;
        const image = item.pattern?.image || item.mainImage;
        const imageUrl = image ? urlFor(image).width(100).url() : "";

        return (
          <Link
            key={item._id}
            href={`/produkt/${item.slug.current}`}
            className={cn(
              "relative size-16 overflow-hidden rounded-md border-2 transition-all hover:opacity-100",
              isSelected
                ? "border-primary ring-2 ring-primary/20 ring-offset-1"
                : "border-transparent opacity-80 hover:border-muted-foreground/50",
            )}
            title={item.title}
            scroll={false} // Optional: depends on UX preference, usually good for variants
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={item.title}
                className="size-full object-cover"
                fill
                sizes="64px"
              />
            ) : (
              <div className="size-full bg-muted flex items-center justify-center text-xs">
                ?
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
