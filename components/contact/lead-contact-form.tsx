"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Form as ShadcnForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/contactFormAction";
import { contactFormSchema, ContactFormValues } from "@/lib/contactFormSchema";

const LeadContactForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      message: "",
    },
  });

  useEffect(() => {
    // Load from user_data (ConsultationForm)
    const userDataStr = sessionStorage.getItem("user_data");
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData.firstName) form.setValue("firstName", userData.firstName);
        if (userData.lastName) form.setValue("lastName", userData.lastName);
        if (userData.phone) form.setValue("phone", userData.phone);
        if (userData.email) form.setValue("email", userData.email);
      } catch (e) {
        console.error("Error parsing user_data from session storage", e);
      }
    }

    // Load from realization_form_data (RealizationForm)
    const realizationDataStr = sessionStorage.getItem("realization_form_data");
    if (realizationDataStr) {
      try {
        const realizationData = JSON.parse(realizationDataStr);
        if (realizationData.email)
          form.setValue("email", realizationData.email);
      } catch (e) {
        console.error(
          "Error parsing realization_form_data from session storage",
          e,
        );
      }
    }
  }, [form]);

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        router.push("/dekujeme");
      } else {
        console.error("Form submission failed:", result.error);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-muted shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Kontaktní formulář</CardTitle>
        <CardDescription>Vyplňte prosím níže uvedené údaje.</CardDescription>
      </CardHeader>
      <CardContent>
        <ShadcnForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Jméno</FieldLabel>
                    <Input placeholder="Jan" {...field} />
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Příjmení</FieldLabel>
                    <Input placeholder="Novák" {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    placeholder="jan.novak@example.com"
                    type="email"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Telefonní číslo</FieldLabel>
                  <Input placeholder="+420 123 456 789" {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Adresa</FieldLabel>
                      <Input placeholder="Ulice a číslo popisné" {...field} />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="zip"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>PSČ</FieldLabel>
                    <Input placeholder="110 00" {...field} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="message"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Zpráva</FieldLabel>
                  <Textarea
                    placeholder="Napište nám o vaší představě..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Odesílám...
                  </>
                ) : (
                  "Odeslat zprávu"
                )}
              </Button>
            </div>
          </form>
        </ShadcnForm>
      </CardContent>
    </Card>
  );
};

export { LeadContactForm };
