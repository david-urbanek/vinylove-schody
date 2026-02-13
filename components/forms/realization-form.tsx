"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "Neplatný email" }),
});

type RealizationFormValues = z.infer<typeof schema>;

export function RealizationForm() {
  const router = useRouter();
  const form = useForm<RealizationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: RealizationFormValues) {
    sessionStorage.setItem("user_data", JSON.stringify(values));
    toast.info("Prosím doplňte další kontaktní údaje.");
    router.push("/kontakt");
  }

  return (
    <Form
      action="/kontakt"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full"
    >
      <div className="flex w-full flex-col items-start gap-3 md:flex-row">
        <div className="w-full flex-1">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field className="w-full" data-invalid={fieldState.invalid}>
                <div className="relative w-full">
                  <Input
                    {...field}
                    type="email"
                    placeholder="Váš email"
                    className="block h-fit w-full rounded-lg bg-input py-5 pr-5 pl-11 text-primary"
                    aria-invalid={fieldState.invalid}
                  />
                  <Mail className="absolute top-1/2 left-5 size-4 -translate-y-1/2 stroke-gray-400" />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="w-full shrink-0 md:w-fit">
          <Button
            type="submit"
            className="h-fit w-full rounded-lg px-8 py-5 font-semibold text-nowrap md:w-fit"
          >
            Poptat realizaci
          </Button>
        </div>
      </div>
    </Form>
  );
}
