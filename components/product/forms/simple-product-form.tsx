"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { addVat } from "@/lib/utils";
import { ProductPrice } from "@/types/product";

import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Quantity } from "./quantity";
import { formSchema, FormType } from "./schema";

interface SimpleProductFormProps {
  availability: boolean;
  price: ProductPrice;
  allowSample?: boolean;
  onAddToCart: (quantity: number) => void;
  onOrderSample?: () => void;
}

export const SimpleProductForm = ({
  availability,
  price,
  allowSample = true,
  onAddToCart,
  onOrderSample,
}: SimpleProductFormProps) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = form.watch("quantity");

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
