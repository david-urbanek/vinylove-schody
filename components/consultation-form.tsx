"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const consultationFormSchema = z.object({
  firstName: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky" }),
  lastName: z.string().min(2, { message: "Příjmení musí mít alespoň 2 znaky" }),
  phone: z.string().min(9, { message: "Telefon musí mít alespoň 9 znaků" }),
});

type consultationFormType = z.infer<typeof consultationFormSchema>;

interface ConsultationFormProps {
  isConsultation?: boolean;
}

export const ConsultationForm = ({}: ConsultationFormProps) => {
  const router = useRouter();

  const form = useForm<consultationFormType>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  const onSubmit = (data: consultationFormType) => {
    sessionStorage.setItem("consultation_data", JSON.stringify(data));

    router.push("/potvrzeni");
  };

  return (
    <Form
      action="/potvrzeni"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1" data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  autoComplete="given-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Jméno"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1" data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  autoComplete="family-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Příjmení"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="flex-1" data-invalid={fieldState.invalid}>
              <Input
                {...field}
                type="tel"
                autoComplete="tel"
                aria-invalid={fieldState.invalid}
                placeholder="Telefonní číslo"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Button type="submit" className="w-full">
        Rezervovat konzultaci
      </Button>
    </Form>
  );
};
