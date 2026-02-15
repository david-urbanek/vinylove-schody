"use client";

import { ShoppingBag, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";

import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import QuantityInput from "@/components/shadcnblocks/quantity-input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/store/useCartStore";
import Image from "next/image";
import { CheckoutForm } from "../forms/checkout-form";

interface CartItemProps extends CartItem {
  onRemoveClick: () => void;
  onQuantityChange: (newQty: number) => void;
}

interface CartProps {
  cartItems: CartItem[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

interface Checkout4Props {
  cartItems: CartItem[];
  className?: string;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

const Checkout4 = ({
  cartItems,
  className,
  onRemoveItem,
  onUpdateQuantity,
}: Checkout4Props) => {
  // Early return for empty cart
  if (!cartItems || cartItems.length === 0) {
    return (
      <section
        className={cn(
          "flex min-h-[60vh] flex-col items-center justify-center gap-6 py-12",
          className,
        )}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Váš košík je prázdný
          </h2>
          <p className="text-muted-foreground">
            Prozatím jste do košíku nic nepřidali.
          </p>
        </div>
        <Button asChild size="lg" className="mt-2 text-xl font-bold">
          <Link href="/">Zpět k nákupu</Link>
        </Button>
      </section>
    );
  }

  console.log("cartItems", cartItems);

  return (
    <section className={cn("min-h-screen", className)}>
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center bg-muted/30 lg:order-1 lg:flex-row lg:items-center">
          <div className="mx-auto w-full max-w-xl p-4 sm:p-8 lg:p-12 xl:p-16">
            <h2 className="mb-8 text-xl font-semibold">Shrnutí objednávky</h2>
            <Cart
              cartItems={cartItems}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
            />
          </div>
        </div>

        <div className="order-1 flex flex-col justify-center lg:order-2 lg:flex-row lg:items-center">
          <div className="mx-auto w-full max-w-xl p-4 sm:p-8 lg:p-12 xl:p-16">
            <div className="mb-10">
              <h2 className="text-3xl tracking-tight">Doručení a poptávka</h2>
            </div>

            <CheckoutForm cartItems={cartItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity }: CartProps) => {
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.price?.priceWithVAT ?? 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  const vatAmount = totalPrice - totalPrice / 1.21; // Extract VAT from total price

  const handleRemove = useCallback(
    (productId: string) => () => {
      onRemoveItem?.(productId);
    },
    [onRemoveItem],
  );

  const handleQuantityChange = useCallback(
    (productId: string) => (newQty: number) => {
      onUpdateQuantity?.(productId, newQty);
    },
    [onUpdateQuantity],
  );

  return (
    <div className="space-y-8">
      <ul className="space-y-6">
        {cartItems.map((cartItem, index) => (
          <CartItemComponent
            key={index}
            {...cartItem}
            // Fallback to empty string if link is undefined to match callback signature
            onRemoveClick={handleRemove(cartItem.id)}
            onQuantityChange={handleQuantityChange(cartItem.id)}
          />
        ))}
      </ul>

      <Separator />

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Mezisoučet</span>
          <Price className="font-normal">
            <PriceValue
              price={totalPrice}
              currency={cartItems[0]?.price?.currency || "CZK"}
              variant="regular"
            />
          </Price>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Doprava</span>
          <span>Doprava bude vypočítána na základě poptávky</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">DPH (21%)</span>
          <span>
            {new Intl.NumberFormat("cs-CZ", {
              style: "currency",
              currency: "CZK",
            }).format(vatAmount)}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between">
        <span className="text-xl font-semibold">Celkem (vč. DPH)</span>
        <Price className="text-xl font-semibold">
          <PriceValue
            price={totalPrice}
            currency={cartItems[0]?.price?.currency || "CZK"}
            variant="regular"
          />
        </Price>
      </div>
    </div>
  );
};

const CartItemComponent = (props: CartItemProps) => {
  const {
    image,
    title,
    link,
    price,
    quantity,
    onQuantityChange,
    onRemoveClick,
    isSample,
  } = props;

  const displayPrice = price.priceWithVAT;
  const currency = price.currency;

  // Determine link. If no link/slug, default to #.
  // Store uses link as ID, so removing an item without link might be tricky, but we handle it in Cart

  return (
    <div className="flex gap-5">
      <div className="w-24 shrink-0">
        <Link href={link || "#"} className="block">
          <AspectRatio
            ratio={1}
            className="overflow-hidden rounded-xl bg-background"
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                className="size-full object-cover"
                width={100}
                height={100}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Bez obr.
              </div>
            )}
          </AspectRatio>
        </Link>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <div>
            <Link
              href={link}
              className="line-clamp-2 font-medium hover:underline"
            >
              {title}
            </Link>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="size-8 shrink-0"
            onClick={onRemoveClick}
          >
            <Trash className="size-4" />
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="w-28">
            <QuantityInput
              inputProps={{ value: quantity }}
              onValueChange={onQuantityChange}
              className="rounded-none"
              disabled={isSample}
            />
          </div>
          <Price className="text-lg font-semibold">
            <PriceValue
              price={displayPrice}
              currency={currency}
              variant="regular"
            />
          </Price>
        </div>
      </div>
    </div>
  );
};

export { Checkout4 };
