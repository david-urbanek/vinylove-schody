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
import { CheckoutForm } from "../forms/checkout-form";

interface CartItemProps extends CartItem {
  index: number;
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
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum + (item.price.sale ?? item.price.regular) * item.quantity,
    0,
  );

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
          <li key={cartItem.link}>
            <CartItemComponent
              {...cartItem}
              onRemoveClick={handleRemove(cartItem.link)}
              onQuantityChange={handleQuantityChange(cartItem.link)}
              index={index}
            />
          </li>
        ))}
      </ul>

      <Separator />

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Mezisoučet</span>
          <Price className="font-normal">
            <PriceValue
              price={totalPrice}
              currency={cartItems[0]?.price.currency}
              variant="regular"
            />
          </Price>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Doprava</span>
          <span>Vypočítáno v dalším kroku</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Odhadovaná daň</span>
          <span>
            {new Intl.NumberFormat("cs-CZ", {
              style: "currency",
              currency: "CZK",
            }).format(totalPrice * 0.21)}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between">
        <span className="text-xl font-semibold">Celkem</span>
        <Price className="text-xl font-semibold">
          <PriceValue
            price={totalPrice}
            currency={cartItems[0]?.price.currency}
            variant="regular"
          />
        </Price>
      </div>
    </div>
  );
};

const CartItemComponent = ({
  image,
  name,
  link,
  price,
  quantity,
  onQuantityChange,
  onRemoveClick,
}: CartItemProps) => {
  const { regular, currency } = price;
  const isSample =
    name.toLowerCase().includes("vzorek") || link.includes("sample=true");

  return (
    <div className="flex gap-5">
      <div className="w-24 shrink-0">
        <AspectRatio
          ratio={1}
          className="overflow-hidden rounded-xl bg-background"
        >
          <img
            src={image?.src || ""}
            alt={name}
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <div>
            <a href={link} className="line-clamp-2 font-medium hover:underline">
              {name}
            </a>
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
            <PriceValue price={regular} currency={currency} variant="regular" />
          </Price>
        </div>
      </div>
    </div>
  );
};

export { Checkout4 };
