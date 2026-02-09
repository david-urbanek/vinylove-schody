"use client";

import { motion } from "framer-motion";
import { Check, Clock, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";

export default function ThankYouPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  // Clear cart when user successfully arrives at thank you page
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-background to-muted/20 py-12 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Success Icon with Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl"
              />
              <div className="relative flex size-24 items-center justify-center rounded-full bg-green-500/10 ring-4 ring-green-500/20">
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <Check className="size-12 stroke-green-500 stroke-[3]" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-4 text-center"
          >
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Děkujeme za váš zájem!
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="text-balance text-lg text-muted-foreground md:text-xl">
              Váš dotaz jsme úspěšně přijali a brzy se vám ozveme
            </p>
          </motion.div>

          {/* Info Cards */}
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-green-500/10">
                    <Clock className="size-6 stroke-green-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    Do 48 hodin
                  </h3>
                  <p className="text-muted-foreground">
                    Ozveme se vám nejpozději do 48 hodin od odeslání vašeho
                    dotazu
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-green-500/10">
                    <Mail className="size-6 stroke-green-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    E-mailová odpověď
                  </h3>
                  <p className="text-muted-foreground">
                    Zkontrolujte si prosím svou e-mailovou schránku včetně
                    složky spam
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* What happens next section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mb-12"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <h2 className="mb-6 text-center text-2xl font-semibold text-foreground md:text-3xl">
                  Co se bude dít dál?
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Zpracování dotazu",
                      description:
                        "Náš tým si prostuduje váš dotaz a připraví pro vás odpověď",
                    },
                    {
                      step: "2",
                      title: "Kontaktujeme vás",
                      description:
                        "Ozveme se vám e-mailem nebo telefonicky dle vaší preference",
                    },
                    {
                      step: "3",
                      title: "Konzultace a nabídka",
                      description:
                        "Probereme s vámi všechny detaily a připravíme cenovou nabídku",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.7 + index * 0.2, duration: 0.5 }}
                      className="flex gap-4"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-lg font-bold text-green-500">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.6 }}
            className="mb-12 rounded-xl bg-muted/50 p-6 text-center"
          >
            <p className="mb-4 text-lg text-muted-foreground">
              Potřebujete nás kontaktovat okamžitě?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+420123456789"
                className="flex items-center gap-2 text-foreground transition-colors hover:text-green-500"
              >
                <Phone className="size-5" />
                <span className="font-medium">+420 123 456 789</span>
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="mailto:info@vinyloveschody.cz"
                className="flex items-center gap-2 text-foreground transition-colors hover:text-green-500"
              >
                <Mail className="size-5" />
                <span className="font-medium">info@vinyloveschody.cz</span>
              </a>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="min-w-[200px]">
              <Link href="/">Zpět na hlavní stránku</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px]"
            >
              <Link href="/realizace">Naše realizace</Link>
            </Button>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="pointer-events-none absolute top-20 right-10 hidden lg:block"
          >
            <div className="size-16 rotate-12 rounded-full bg-green-500/10 blur-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="pointer-events-none absolute bottom-40 left-10 hidden lg:block"
          >
            <div className="size-20 -rotate-12 rounded-full bg-green-500/10 blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
