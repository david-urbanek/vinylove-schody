import { EcommerceFooter19 } from "@/components/layout/ecommerce-footer19";
import { Navbar3 } from "@/components/layout/navbar3";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Navbar3 />
      <main className="flex-grow pt-20">
        <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            {/* Large 404 Number */}
            <div className="relative mb-8">
              <span className="text-[10rem] font-serif font-bold leading-none tracking-tighter text-muted/40 md:text-[14rem] select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-muted/50 p-5">
                  <Search className="size-10 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Text */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Stránka nenalezena
            </h1>
            <p className="mb-10 text-lg text-muted-foreground text-balance">
              Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla
              přesunuta. Zkontrolujte prosím adresu nebo se vraťte na hlavní
              stránku.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="min-w-[200px] gap-2">
                <Link href="/">
                  <Home className="size-4" />
                  Zpět na hlavní stránku
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <EcommerceFooter19 />
    </>
  );
}
