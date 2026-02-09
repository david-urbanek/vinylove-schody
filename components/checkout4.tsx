"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import QuantityInput from "@/components/shadcnblocks/quantity-input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { submitOrder } from "@/lib/cartFormAction";
import { checkoutFormSchema, CheckoutFormType } from "@/lib/schemas";
import { CartItem } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckoutForm } from "./forms/checkout-form";

// Local CartItem definition removed. Using shared one.

interface CartItemProps extends CartItem {
  index: number;
  onRemoveClick: () => void;
  onQuantityChange: (newQty: number) => void;
}

interface CartProps {
  cartItems: CartItem[];
  form: UseFormReturn<CheckoutFormType>;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

interface Checkout4Props {
  cartItems: CartItem[];
  className?: string;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

// Schemas removed, imported from checkout-form

const Checkout4 = ({
  cartItems,
  className,
  onRemoveItem,
  onUpdateQuantity,
}: Checkout4Props) => {
  const defaultProducts =
    cartItems?.map((item) => ({
      product_id: item.link,
      quantity: item.quantity,
      price: item.price.sale ?? item.price.regular,
    })) || [];

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      products: defaultProducts,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      zip: "",
      interestInRealization: false,
      projectDescription: "",
    },
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Early return MUST happen after hooks
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

  const onSubmit = async (data: CheckoutFormType) => {
    setIsSubmitting(true);
    try {
      // Pass both form data and the full cart items (for image/details that aren't in form)
      const res = await submitOrder({ ...data, cartItems });

      if (res.success) {
        // Redirect to success page on success
        router.push("/kosik/dekujeme");
      } else {
        if (res.details) {
          Object.entries(res.details).forEach(([key, messages]) => {
            if (messages && messages.length > 0) {
              form.setError(key as keyof CheckoutFormType, {
                type: "server",
                message: messages[0],
              });
            }
          });
          // Scroll to first error potentially, or just show general alert
          toast.error("Prosím opravte chyby ve formuláři.");
        } else {
          toast.error(
            res.error || "Něco se pokazilo. Zkontrolujte prosím údaje.",
          );
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Nepodařilo se odeslat formulář. Zkuste to prosím později.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={cn("min-h-screen", className)}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid min-h-screen lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center bg-muted/30 lg:order-1 lg:flex-row lg:items-center">
              <div className="mx-auto w-full max-w-xl p-4 sm:p-8 lg:p-12 xl:p-16">
                <h2 className="mb-8 text-xl font-semibold">
                  Shrnutí objednávky
                </h2>
                <Cart
                  form={form}
                  cartItems={cartItems}
                  onRemoveItem={onRemoveItem}
                  onUpdateQuantity={onUpdateQuantity}
                />
              </div>
            </div>

            <div className="order-1 flex flex-col justify-center lg:order-2 lg:flex-row lg:items-center">
              <div className="mx-auto w-full max-w-xl p-4 sm:p-8 lg:p-12 xl:p-16">
                <div className="mb-10">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Doručení a poptávka
                  </h1>
                </div>

                <div className="space-y-6">
                  <CheckoutForm />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Odesílám..." : "Odeslat poptávku"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

const Cart = ({
  cartItems,
  form,
  onRemoveItem,
  onUpdateQuantity,
}: CartProps) => {
  const { fields, remove, update } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const formItems = form.watch("products");
  const totalPrice = formItems?.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );

  const handleRemove = useCallback(
    (index: number, productId: string) => () => {
      remove(index);
      onRemoveItem?.(productId);
    },
    [remove, onRemoveItem],
  );

  const handleQuantityChange = useCallback(
    (index: number, productId: string) => (newQty: number) => {
      update(index, { ...fields[index], quantity: newQty });
      onUpdateQuantity?.(productId, newQty);
    },
    [update, fields, onUpdateQuantity],
  );

  return (
    <div className="space-y-8">
      <ul className="space-y-6">
        {fields.map((field, index) => {
          const cartItem = cartItems.find((p) => p.link === field.product_id);
          if (!cartItem) return null;
          return (
            <li key={field.id}>
              <CartItemComponent
                {...cartItem}
                onRemoveClick={() => handleRemove(index, cartItem.link)()}
                onQuantityChange={(newQty: number) =>
                  handleQuantityChange(index, cartItem.link)(newQty)
                }
                index={index}
              />
            </li>
          );
        })}
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
  index,
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
          <QuantityField
            index={index}
            onQuantityChange={onQuantityChange}
            disabled={isSample}
          />
          <Price className="text-lg font-semibold">
            <PriceValue price={regular} currency={currency} variant="regular" />
          </Price>
        </div>
      </div>
    </div>
  );
};

const QuantityField = ({
  index,
  onQuantityChange,
  disabled,
}: {
  index: number;
  onQuantityChange: (n: number) => void;
  disabled?: boolean;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={`products.${index}.quantity`}
      control={control}
      render={({ field }) => (
        <Field className="w-28">
          <QuantityInput
            inputProps={field}
            onValueChange={(newQty) => {
              field.onChange(newQty);
              onQuantityChange(newQty);
            }}
            className="rounded-none"
            disabled={disabled}
          />
        </Field>
      )}
    />
  );
};

// CheckoutForm moved to ./components/checkout-form.tsx

export { Checkout4 };
