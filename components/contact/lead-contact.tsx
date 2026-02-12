"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Form from "next/form";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Jméno musí mít alespoň 2 znaky" }),
  lastName: z.string().min(2, { message: "Příjmení musí mít alespoň 2 znaky" }),
  email: z.string().email({ message: "Neplatný email" }),
  phone: z.string().min(9, { message: "Telefon musí mít alespoň 9 znaků" }),
  address: z.string().min(5, { message: "Adresa musí mít alespoň 5 znaků" }),
  zip: z.string().min(5, { message: "PSČ musí mít alespoň 5 znaků" }),
  message: z.string().min(10, { message: "Zpráva musí mít alespoň 10 znaků" }),
});

type LeadFormValues = z.infer<typeof formSchema>;

interface LeadContactProps {
  className?: string;
}

const LeadContact = ({ className }: LeadContactProps) => {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: LeadFormValues) {
    console.log(values);
    // TODO: Add submission logic
  }

  return (
    <section className={cn("py-12 md:py-20 bg-muted/30", className)}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column: Info */}
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-left">
                Kontaktujte nás
              </h2>
              <p className="max-w-[600px] text-muted-foreground text-lg text-left">
                Máte dotaz nebo zájem o realizaci? Vyplňte formulář a my se Vám
                ozveme co nejdříve. Jsme tu pro Vás a rádi Vám pomůžeme.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <MapPin className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Sídlo společnosti
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vinylové schody s.r.o.
                    <br />
                    Příkladová 123
                    <br />
                    110 00 Praha 1
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <Mail className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Napište nám</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:info@vinyloveschody.cz"
                      className="hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      info@vinyloveschody.cz
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg mt-1">
                  <Phone className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Zavolejte nám</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="tel:+420123456789"
                      className="hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      +420 123 456 789
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Po-Pá 8:00 - 16:00
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <h3 className="font-semibold text-lg mr-4">Sledujte nás:</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-background border p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Facebook className="size-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-background border p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Twitter className="size-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-background border p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <Linkedin className="size-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <Card className="border-muted shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Kontaktní formulář</CardTitle>
              <CardDescription>
                Vyplňte prosím níže uvedené údaje.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShadcnForm {...form}>
                <Form
                  action=""
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
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
                            <Input
                              placeholder="Ulice a číslo popisné"
                              {...field}
                            />
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
                    <Button type="submit" size="lg" className="w-full">
                      Odeslat zprávu
                    </Button>
                  </div>
                </Form>
              </ShadcnForm>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { LeadContact };
