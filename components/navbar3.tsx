"use client";

import { useCart } from "@/hooks/useCart";
import {
  ChevronLeft,
  ChevronRight,
  CornerDownRight,
  Layers,
  Menu,
  MoveRight,
  Phone,
  ScanLine,
  ShoppingBag,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Logo,
  LogoImageDesktop,
  LogoImageMobile,
} from "@/components/shadcnblocks/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const solutions = [
  {
    title: "Schody bez nosu",
    description:
      "Moderní a čistý design schodů pro minimalistický vzhled bez přesahu.",
    href: "/produkty/schody-bez-nosu",
    icon: ScanLine,
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1587&auto=format&fit=crop",
  },
  {
    title: "Schody s nosem",
    description:
      "Klasické elegantní řešení s přesahujícím nosem pro tradiční interiéry.",
    href: "/produkty/schody-s-nosem",
    icon: CornerDownRight,
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Nášlapy",
    description:
      "Samostatné vinylové nášlapy ideální pro renovaci stávajících schodů.",
    href: "/produkty/schody-naslapy",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Vetknuté schody",
    description:
      "Designové levitující schodiště kotvené do zdi pro vzdušný efekt.",
    href: "/produkty/schody-vetknute",
    icon: MoveRight,
    image:
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=800&q=80",
  },
];

const flooringCategories = [
  {
    title: "Lepené podlahy",
    description: "Maximálně odolné řešení pro vysokou zátěž.",
    href: "/produkty/podlahy-lepena",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1622349788647-38e41eb20f0f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Click systém",
    description: "Rychlá a jednoduchá pokládka.",
    href: "/produkty/podlahy-click",
    icon: ScanLine,
    image:
      "https://images.unsplash.com/photo-1534349762930-c6ec8c7d0fb9?auto=format&fit=crop&w=800&q=80",
  },
];

const documentationLinks = [
  {
    title: "API Reference",
    href: "#",
  },
  {
    title: "SDK Documentation",
    href: "#",
  },
  {
    title: "Integration Guides",
    href: "#",
  },
  {
    title: "Code Examples",
    href: "#",
  },
];

const resources = [
  {
    title: "Blog",
    description: "Latest insights, tutorials, and industry best practices.",
    href: "#",
  },
  {
    title: "News",
    description: "Product updates, announcements, and company news.",
    href: "#",
  },
];

interface Navbar3Props {
  className?: string;
}

const Navbar3 = ({ className }: Navbar3Props) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<
    "schody" | "podlahy" | "ohybani" | "onas" | null
  >(null);
  const [activeSolution, setActiveSolution] = useState(solutions[0]);
  const [activeFlooring, setActiveFlooring] = useState(flooringCategories[0]);
  const { totalItems, isReady } = useCart();

  return (
    <section
      className={cn(
        "fixed inset-x-0 top-0 z-[99999] bg-background/80 backdrop-blur-md border-b",
        className,
      )}
    >
      <div className="container">
        <NavigationMenu className="min-w-full [&>div:last-child]:left-1/2 [&>div:last-child]:-translate-x-1/2">
          <div className="flex w-full items-center justify-between gap-12 py-4">
            {/* Logo */}
            <div>
              {(!open || !submenu) && (
                <>
                  <Logo url="https://shadcnblocks.com">
                    <LogoImageDesktop
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo-word.svg"
                      className="h-7 dark:invert"
                      alt="Shadcn UI Navbar"
                    />
                    <LogoImageMobile
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg"
                      className="h-7 dark:invert"
                      alt="Shadcn UI Navbar"
                    />
                  </Logo>
                </>
              )}
              {open && submenu && (
                <Button variant="outline" onClick={() => setSubmenu(null)}>
                  Back
                  <ChevronLeft className="ml-2 size-4" />
                </Button>
              )}
            </div>

            <NavigationMenuList className="hidden lg:flex">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Vinylové schody</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-6">
                  <div className="flex justify-between gap-8 min-h-[22rem]">
                    <NavigationMenuLink
                      href="#"
                      className="group flex w-1/3 flex-col p-0 hover:bg-transparent"
                    >
                      <div className="flex h-full flex-col overflow-clip rounded-lg border border-input bg-background">
                        <div className="relative flex-1 overflow-hidden">
                          <img
                            src={activeSolution.image}
                            alt={activeSolution.title}
                            className="absolute inset-0 size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5 xl:p-8">
                          <div className="mb-2 text-base">
                            {activeSolution.title}
                          </div>
                          <div className="text-sm font-normal text-muted-foreground">
                            {activeSolution.description}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                    <div className="max-w-[760px] flex-1">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Kategorie
                      </div>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {solutions.map((solution, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={solution.href}
                            className="group block p-4"
                            onMouseEnter={() => setActiveSolution(solution)}
                          >
                            <div className="mb-5 group-hover:opacity-60">
                              <solution.icon className="size-5" />
                            </div>
                            <div className="mb-1 text-base">
                              {solution.title}
                            </div>
                            <div className="text-sm font-normal text-muted-foreground">
                              {solution.description}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Vinylové podlahy</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-6">
                  <div className="flex justify-between gap-8 min-h-[22rem]">
                    <NavigationMenuLink
                      href="#"
                      className="group flex w-1/3 flex-col p-0 hover:bg-transparent"
                    >
                      <div className="flex h-full flex-col overflow-clip rounded-lg border border-input bg-background">
                        <div className="relative flex-1 overflow-hidden">
                          <img
                            src={activeFlooring.image}
                            alt={activeFlooring.title}
                            className="absolute inset-0 size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-5 xl:p-8">
                          <div className="mb-2 text-base">
                            {activeFlooring.title}
                          </div>
                          <div className="text-sm font-normal text-muted-foreground">
                            {activeFlooring.description}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                    <div className="max-w-[760px] flex-1">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Kategorie
                      </div>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {flooringCategories.map((category, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={category.href}
                            className="group block p-4"
                            onMouseEnter={() => setActiveFlooring(category)}
                          >
                            <div className="mb-5 group-hover:opacity-60">
                              <category.icon className="size-5" />
                            </div>
                            <div className="mb-1 text-base">
                              {category.title}
                            </div>
                            <div className="text-sm font-normal text-muted-foreground">
                              {category.description}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Ohýbání vinylu</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-6">
                  <div className="flex justify-between gap-8">
                    <div className="w-1/3 max-w-[404px]">
                      <div className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
                        Služby
                      </div>
                      <div className="mb-6 text-sm font-normal text-muted-foreground">
                        Profesionální ohýbání vinylu na míru.
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>O nás</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-1 flex-col">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        O firmě
                      </div>
                      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                        {resources.map((resource, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={resource.href}
                            className="flex h-full flex-col overflow-clip rounded-lg border border-input bg-background p-5 hover:bg-accent hover:text-accent-foreground xl:p-8"
                          >
                            <div className="mt-auto">
                              <div className="mb-2 text-base">
                                {resource.title}
                              </div>
                              <div className="text-sm font-normal text-muted-foreground">
                                {resource.description}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <div className="hidden items-center gap-6 lg:flex">
              <Button variant="outline" asChild>
                <a
                  href="tel:+420123456789"
                  className="flex items-center gap-2 font-medium"
                >
                  <Phone className="size-4" />
                  +420 123 456 789
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full relative"
                asChild
              >
                <Link href="/kosik">
                  <ShoppingBag className="size-5" />
                  {isReady && totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] text-white border-2 border-background">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <Button
                variant="outline"
                size="icon"
                aria-label="Main Menu"
                onClick={() => {
                  if (open) {
                    setOpen(false);
                    setSubmenu(null);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <Menu className="size-4" />}
                {open && <X className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu (Root) */}
          {open && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("schody")}
                >
                  <span className="flex-1">Vinylové schody</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("podlahy")}
                >
                  <span className="flex-1">Vinylové podlahy</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("ohybani")}
                >
                  <span className="flex-1">Ohýbání vinylu</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("onas")}
                >
                  <span className="flex-1">O nás</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
              </div>
              <div className="mx-[2rem] mt-auto flex flex-col gap-4 py-12">
                <a
                  href="tel:+420123456789"
                  className="flex items-center gap-2 font-medium"
                >
                  <Phone className="size-4" />
                  +420 123 456 789
                </a>
              </div>
            </div>
          )}
          {/* Mobile Menu > Vinylové schody */}
          {open && submenu === "schody" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <a href="#" className="block space-y-6 px-8 py-8">
                <div className="w-full overflow-clip rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt="Placeholder image"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Vinylové schody</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Kompletní řešení pro vaše schodiště.
                  </div>
                </div>
              </a>
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Kategorie
              </div>
              <div className="border-t border-border pb-16">
                {solutions.map((solution, index) => (
                  <a
                    key={index}
                    href={solution.href}
                    className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                  >
                    <div className="shrink-0">
                      <solution.icon className="size-6" />
                    </div>
                    <div>
                      <div className="mb-1.5 text-base">{solution.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {solution.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {/* Mobile Menu > Vinylové podlahy */}
          {open && submenu === "podlahy" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <a href="#" className="block space-y-6 px-8 py-8">
                <div className="w-full overflow-clip rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1581850518616-bcb8077a2536?auto=format&fit=crop&w=800&q=80"
                    alt="Vinylové podlahy"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Vinylové podlahy</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Široký výběr dekorů a provedení pro každý interiér.
                  </div>
                </div>
              </a>
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Kategorie
              </div>
              <div className="border-t border-border pb-16">
                {flooringCategories.map((category, index) => (
                  <a
                    key={index}
                    href={category.href}
                    className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                  >
                    <div className="shrink-0">
                      <category.icon className="size-6" />
                    </div>
                    <div>
                      <div className="mb-1.5 text-base">{category.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {category.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {/* Mobile Menu > Ohýbání vinylu */}
          {open && submenu === "ohybani" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Služby
              </div>
              <div className="mb-6 text-sm font-normal text-muted-foreground px-8">
                Profesionální ohýbání vinylu na míru.
              </div>
            </div>
          )}
          {/* Mobile Menu > O nás */}
          {open && submenu === "onas" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                O firmě
              </div>
              <div>
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.href}
                    className="group flex w-full items-start gap-x-4 border-t border-border px-8 py-7 text-left hover:bg-accent"
                  >
                    <div>
                      <div className="mb-1.5 text-base">{resource.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {resource.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export { Navbar3 };
