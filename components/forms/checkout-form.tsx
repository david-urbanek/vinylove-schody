"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { submitOrder } from "@/lib/checkoutFormAction";
import { checkoutFormSchema, CheckoutFormType } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { CartItem } from "@/store/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "next/form";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Checkbox Implementation
const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Checkbox.displayName = "Checkbox";

// Textarea Implementation
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

interface CheckoutFormProps {
  cartItems: CartItem[];
}

export const CheckoutForm = ({ cartItems }: CheckoutFormProps) => {
  const [isPending, setIsPending] = React.useState(false);

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
      orderNote: "",
      interestInRealization: false,
      projectDescription: "",
    },
  });

  const interestInRealization = form.watch("interestInRealization");

  const onSubmit = async (data: CheckoutFormType) => {
    setIsPending(true);
    try {
      // Call server action
      const result = await submitOrder(cartItems, null, data);

      // If result is returned, it means there was an error (success redirects)
      if (result && !result.success) {
        if (result.details) {
          // Set field errors from server validation
          Object.entries(result.details).forEach(([key, messages]) => {
            if (messages && messages.length > 0) {
              form.setError(key as keyof CheckoutFormType, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }
        // Show error toast
        toast.error(
          result.error || "Něco se pokazilo. Zkuste to prosím znovu.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Nepodařilo se odeslat formulář. Zkuste to prosím později.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form
      action=""
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-8">
        {/* Osobní údaje */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Osobní údaje</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="firstName">Jméno:</FieldLabel>
                  <Input
                    id="firstName"
                    placeholder="Jan"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="lastName">Příjmení:</FieldLabel>
                  <Input
                    id="lastName"
                    placeholder="Novák"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email:</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jan.novak@example.com"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Telefon:</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+420 123 456 789"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        {/* Adresa */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Doručovací adresa</h3>
          <Controller
            control={form.control}
            name="street"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="street">Ulice a číslo popisné:</FieldLabel>
                <Input
                  id="street"
                  placeholder="Dlouhá 123"
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              control={form.control}
              name="city"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="city">Město:</FieldLabel>
                  <Input
                    id="city"
                    placeholder="Praha"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="zip"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="zip">PSČ:</FieldLabel>
                  <Input
                    id="zip"
                    placeholder="110 00"
                    {...field}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </div>

        {/* Poznámka k objednávce */}
        <Controller
          control={form.control}
          name="orderNote"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState && fieldState.invalid}>
              <FieldLabel htmlFor="orderNote">
                Poznámka k objednávce:
              </FieldLabel>
              <Textarea
                id="orderNote"
                placeholder="Zde napište požadované rozměry schodů nebo jakékoliv jiné požadavky týkající se vašeho nákupu..."
                className="resize-none"
                {...field}
              />
              {fieldState && fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Realizace */}
        <div className="space-y-4 rounded-lg border p-4">
          <div className="flex items-center space-x-2">
            <Controller
              control={form.control}
              name="interestInRealization"
              render={({ field }) => (
                <Checkbox
                  id="interestInRealization"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <label
              htmlFor="interestInRealization"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mám zájem o realizaci:
            </label>
          </div>

          {interestInRealization && (
            <Controller
              control={form.control}
              name="projectDescription"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="projectDescription">
                    Popis projektu
                  </FieldLabel>
                  <Textarea
                    id="projectDescription"
                    placeholder="Popište prosím váš projekt (rozměry, stav schodiště, atd.)..."
                    className="min-h-[100px]"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full text-base"
        disabled={isPending}
      >
        {isPending ? "Odesílám..." : "Odeslat poptávku"}
      </Button>
    </Form>
  );
};
