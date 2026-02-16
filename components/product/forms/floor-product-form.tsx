"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { addVat } from "@/lib/utils";
import { ProductPrice } from "@/types/product";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Quantity } from "./quantity";
import { FieldName, formSchema, FormType, Hinges } from "./schema";

interface FloorProductFormProps {
  availability: boolean;
  hinges: Record<FieldName, Hinges>;
  price: ProductPrice;
  packageSize: number;
  allowSample?: boolean;
  onAddToCart: (quantity: number) => void;
  onOrderSample?: () => void;
}

export const FloorProductForm = ({
  availability,
  hinges,
  price,
  packageSize,
  allowSample = true,
  onAddToCart,
  onOrderSample,
}: FloorProductFormProps) => {
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
          <Price className="text-2xl font-bold">
            <PriceValue
              price={addVat(price.priceWithoutVAT || 0) * quantity}
              currency={price.currency}
            />
          </Price>
          <Price className="text-sm text-muted-foreground">
            <PriceValue
              price={(price.priceWithoutVAT || 0) * quantity}
              currency={price.currency}
            />
            <span>bez DPH</span>
          </Price>
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
