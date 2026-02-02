"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBag, Trash } from "lucide-react";
import { useCallback } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import QuantityInput from "@/components/shadcnblocks/quantity-input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
  CheckoutForm,
  checkoutFormSchema,
  CheckoutFormType,
} from "./checkout-form";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

type CartItem = {
  product_id: string;
  link: string;
  name: string;
  image: string;
  price: ProductPrice;
  quantity: number;
  details: {
    label: string;
    value: string;
  }[];
};

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

const CART_ITEMS: CartItem[] = [
  {
    product_id: "product-1",
    link: "#",
    name: "Stylish Maroon Sneaker",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/stylish-maroon-sneaker.png",
    price: {
      regular: 354.0,
      currency: "USD",
    },
    quantity: 1,
    details: [
      { label: "Color", value: "Red" },
      { label: "Size", value: "36" },
    ],
  },
  {
    product_id: "product-2",
    link: "#",
    name: "Bicolor Sweatshirt with Embroidered Logo",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/bicolor-crewneck-sweatshirt-with-embroidered-logo.png",
    price: {
      regular: 499.0,
      currency: "USD",
    },
    quantity: 1,
    details: [
      { label: "Color", value: "Blue & White" },
      { label: "Size", value: "L" },
    ],
  },
  {
    product_id: "product-4",
    link: "#",
    name: "Maroon Leather Handbag",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/ecommerce/clothes/maroon-leather-handbag.png",
    price: {
      regular: 245.0,
      currency: "USD",
    },
    quantity: 1,
    details: [{ label: "Color", value: "Maroon" }],
  },
];

const Checkout4 = ({
  cartItems = CART_ITEMS,
  className,
  onRemoveItem,
  onUpdateQuantity,
}: Checkout4Props) => {
  if (cartItems.length === 0) {
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
          <a href="/">Zpět k nákupu</a>
        </Button>
      </section>
    );
  }

  const defaultProducts = cartItems.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price.sale ?? item.price.regular,
  }));

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

  const onSubmit = (data: CheckoutFormType) => {
    console.log(data);
  };

  return (
    <section className={cn("min-h-screen", className)}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid min-h-screen lg:grid-cols-2">
            <div className="order-2 flex items-center bg-muted/30 lg:order-1">
              <div className="mx-auto w-full max-w-xl p-8 lg:p-12 xl:p-16">
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

            <div className="order-1 flex items-center lg:order-2">
              <div className="mx-auto w-full max-w-xl p-8 lg:p-12 xl:p-16">
                <div className="mb-10">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Doručení a poptávka
                  </h1>
                </div>

                <div className="space-y-6">
                  <CheckoutForm />
                  <Button type="submit" size="lg" className="w-full text-base">
                    Odeslat poptávku
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
          const cartItem = cartItems.find(
            (p) => p.product_id === field.product_id,
          );
          if (!cartItem) return null;
          return (
            <li key={field.id}>
              <CartItemComponent
                {...cartItem}
                onRemoveClick={() => handleRemove(index, cartItem.product_id)()}
                onQuantityChange={(newQty: number) =>
                  handleQuantityChange(index, cartItem.product_id)(newQty)
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
  details,
  price,
  index,
  onQuantityChange,
  onRemoveClick,
}: CartItemProps) => {
  const { regular, currency } = price;

  return (
    <div className="flex gap-5">
      <div className="w-24 shrink-0">
        <AspectRatio
          ratio={1}
          className="overflow-hidden rounded-xl bg-background"
        >
          <img src={image} alt={name} className="size-full object-cover" />
        </AspectRatio>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-3">
          <div>
            <a href={link} className="line-clamp-2 font-medium hover:underline">
              {name}
            </a>
            <ProductDetails details={details} />
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
          <QuantityField index={index} onQuantityChange={onQuantityChange} />
          <Price className="text-lg font-semibold">
            <PriceValue price={regular} currency={currency} variant="regular" />
          </Price>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = ({
  details,
}: {
  details?: { label: string; value: string }[];
}) => {
  if (!details) return null;
  return (
    <p className="mt-1 text-sm text-muted-foreground">
      {details.map((item, index) => (
        <span key={index}>
          {item.label}: {item.value}
          {index < details.length - 1 && " · "}
        </span>
      ))}
    </p>
  );
};

const QuantityField = ({
  index,
  onQuantityChange,
}: {
  index: number;
  onQuantityChange: (n: number) => void;
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
          />
        </Field>
      )}
    />
  );
};

// CheckoutForm moved to ./components/checkout-form.tsx

export { Checkout4 };
