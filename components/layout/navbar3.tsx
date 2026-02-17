"use client";

import { useCart } from "@/hooks/useCart";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  CornerDownRight,
  Droplet,
  Frame,
  Hammer,
  Layers,
  Menu,
  MoveRight,
  PaintRoller,
  Phone,
  Pipette,
  Ruler,
  ScanLine,
  ShoppingBag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { contactInfo } from "@/data/data";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const stairs = [
  {
    title: "Schody bez nosu",
    description:
      "Moderní a čistý design schodů pro minimalistický vzhled bez přesahu.",
    href: "/produkty/schody-bez-nosu",
    icon: ScanLine,
    image: "/realizace/schody/siroke/schody-1.png",
  },
  {
    title: "Schody s nosem",
    description:
      "Klasické elegantní řešení s přesahujícím nosem pro tradiční interiéry.",
    href: "/produkty/schody-s-nosem",
    icon: CornerDownRight,
    image: "/realizace/schody/siroke/schody-2.png",
  },
  {
    title: "Nášlapy",
    description:
      "Samostatné vinylové nášlapy ideální pro renovaci stávajících schodů.",
    href: "/produkty/schody-naslapy",
    icon: Layers,
    image: "/realizace/schody/siroke/schody-3.png",
  },
  {
    title: "Vetknuté schody",
    description:
      "Designové levitující schodiště kotvené do zdi pro vzdušný efekt.",
    href: "/produkty/schody-vetknute",
    icon: MoveRight,
    image: "/realizace/schody/siroke/schody-4.png",
  },
];

const flooringCategories = [
  {
    title: "Lepené podlahy",
    description: "Maximálně odolné řešení pro vysokou zátěž.",
    href: "/produkty/podlahy-lepena",
    icon: Layers,
    image: "/realizace/podlahy/siroke/podlaha-1.png",
  },
  {
    title: "Click systém",
    description: "Rychlá a jednoduchá pokládka.",
    href: "/produkty/podlahy-click",
    icon: ScanLine,
    image: "/realizace/podlahy/siroke/podlaha-2.png",
  },
];

const services = [
  {
    title: "Realizace",
    description: "Profesionální realizace podlah a schodů na klíč.",
    href: "/realizace",
    icon: Hammer,
  },
  {
    title: "Ohýbání vinylu na míru",
    description: "Zakázkové ohýbání vinylu pro vaše specifické potřeby.",
    href: "/ohybani-vinylu",
    icon: Ruler,
  },
];

const categories = [
  {
    title: "Obvodové lišty",
    description: "Dokonalé začištění podlahy u stěny.",
    href: "/produkty/obvodove-listy",
    icon: Frame,
  },
  {
    title: "Zakončení u stěny",
    description: "Elegantní a praktické zakončení schodů u zdi.",
    href: "/produkty/zakonceni-u-steny",
    icon: Frame,
  },
  {
    title: "Přechodové lišty",
    description: "Plynulé přechody mezi různými typy podlah.",
    href: "/produkty/prechodove-listy",
    icon: ArrowLeftRight,
  },
  {
    title: "Lepidla",
    description: "Kvalitní lepidla pro pevné a trvalé spojení.",
    href: "/produkty/lepidla",
    icon: Droplet,
  },
  {
    title: "Stěrky",
    description: "Vyrovnávací hmoty pro dokonalý podklad.",
    href: "/produkty/sterky",
    icon: PaintRoller,
  },
  {
    title: "Penetrace",
    description: "Příprava podkladu pro optimální přilnavost.",
    href: "/produkty/penetrace",
    icon: Pipette,
  },
];

interface Navbar3Props {
  className?: string;
}

const Navbar3 = ({ className }: Navbar3Props) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<
    "schody" | "podlahy" | "sluzby" | "prislusenstvi" | null
  >(null);
  const [activeSolution, setActiveSolution] = useState(stairs[0]);
  const [activeFlooring, setActiveFlooring] = useState(flooringCategories[0]);
  const [activeService, setActiveService] = useState(services[0]);
  const { totalItems, isReady } = useCart();

  return (
    <section
      className={cn(
        "fixed inset-x-0 top-0 z-[99999] bg-background/80 backdrop-blur-md border-b",
        className,
      )}
    >
      <div className="container">
        <NavigationMenu
          className="min-w-full [&>div:last-child]:left-1/2 [&>div:last-child]:-translate-x-1/2"
          suppressHydrationWarning
        >
          <div className="flex w-full items-center justify-between gap-4 py-4 lg:gap-6 xl:gap-12">
            {/* Logo */}
            <div className="shrink-0">
              {(!open || !submenu) && (
                <>
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => {
                      setOpen(false);
                      setSubmenu(null);
                    }}
                  >
                    <Image
                      src="/logo/full-logo.svg"
                      alt="Vinylové schody"
                      className="h-7 w-auto md:h-10"
                      width={1000}
                      height={1000}
                    />
                  </Link>
                </>
              )}
              {open && submenu && (
                <Button variant="outline" onClick={() => setSubmenu(null)}>
                  Zpět
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
                          <Image
                            src={activeSolution.image}
                            alt={activeSolution.title}
                            className="absolute inset-0 size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            width={1000}
                            height={1000}
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
                        {stairs.map((solution, index) => (
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
                          <Image
                            src={activeFlooring.image}
                            alt={activeFlooring.title}
                            className="absolute inset-0 size-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            width={1000}
                            height={1000}
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
                <NavigationMenuTrigger>
                  Realizace a Ohýbání vinylu na míru
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[800px] p-6 ">
                  <div className="flex justify-between gap-8">
                    <div>
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Služby
                      </div>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {services.map((service, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={service.href}
                            className="group block p-4"
                            onMouseEnter={() => setActiveService(service)}
                          >
                            <div className="mb-5 group-hover:opacity-60">
                              <service.icon className="size-5" />
                            </div>
                            <div className="mb-1 text-base">
                              {service.title}
                            </div>
                            <div className="text-sm font-normal text-muted-foreground">
                              {service.description}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Příslušenství a Detaily
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[800px] p-6">
                  <div className="flex justify-between gap-8">
                    <div className="flex-1">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Kategorie
                      </div>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {categories.map((accessory, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={accessory.href}
                            className="group block p-4"
                          >
                            <div className="mb-5 group-hover:opacity-60">
                              <accessory.icon className="size-5" />
                            </div>
                            <div className="mb-1 text-base">
                              {accessory.title}
                            </div>
                            <div className="text-sm font-normal text-muted-foreground">
                              {accessory.description}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <div className="hidden shrink-0 items-center gap-4 lg:flex xl:gap-6">
              <Button variant="outline" asChild className="whitespace-nowrap">
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 font-medium"
                >
                  <Phone className="size-4" />
                  {contactInfo.phone}
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
                  onClick={() => setSubmenu("sluzby")}
                >
                  <span className="flex-1">
                    Realizace a Ohýbání vinylu na míru
                  </span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("prislusenstvi")}
                >
                  <span className="flex-1">Příslušenství a Detaily</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
              </div>
              <div className="mx-[2rem] mt-auto flex flex-col gap-4 py-12">
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 font-medium"
                >
                  <Phone className="size-4" />
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          )}
          {/* Mobile Menu > Vinylové schody */}
          {open && submenu === "schody" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <Link
                href="/produkty/schody"
                className="block space-y-6 px-8 py-8"
                onClick={() => setOpen(false)}
              >
                <div className="w-full overflow-clip rounded-lg">
                  <Image
                    src="/realizace/schody/siroke/schody-2.png"
                    alt="Placeholder image"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                    width={1000}
                    height={1000}
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Vinylové schody</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Kompletní řešení pro vaše schodiště.
                  </div>
                </div>
              </Link>
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Kategorie
              </div>
              <div className="border-t border-border pb-16">
                {stairs.map((solution, index) => (
                  <Link
                    key={index}
                    href={solution.href}
                    className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                    onClick={() => setOpen(false)}
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
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Mobile Menu > Vinylové podlahy */}
          {open && submenu === "podlahy" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <Link
                href="#"
                className="block space-y-6 px-8 py-8"
                onClick={() => setOpen(false)}
              >
                <div className="w-full overflow-clip rounded-lg">
                  <Image
                    src="/realizace/podlahy/siroke/podlaha-1.png"
                    alt="Vinylové podlahy"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                    width={1000}
                    height={1000}
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Vinylové podlahy</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Široký výběr dekorů a provedení pro každý interiér.
                  </div>
                </div>
              </Link>
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Kategorie
              </div>
              <div className="border-t border-border pb-16">
                {flooringCategories.map((category, index) => (
                  <Link
                    key={index}
                    href={category.href}
                    className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                    onClick={() => setOpen(false)}
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
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Mobile Menu > Služby */}
          {open && submenu === "sluzby" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Služby
              </div>
              <div className="border-t border-border pb-16">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href={service.href}
                    className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    <div className="shrink-0">
                      <service.icon className="size-6" />
                    </div>
                    <div>
                      <div className="mb-1.5 text-base">{service.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {service.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {/* Mobile Menu > O nás */}
          {open && submenu === "prislusenstvi" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Kategorie
              </div>
              <div>
                {categories.map((accessory, index) => (
                  <Link
                    key={index}
                    href={accessory.href}
                    className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    <div className="shrink-0">
                      <accessory.icon className="size-6" />
                    </div>
                    <div>
                      <div className="mb-1.5 text-base">{accessory.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {accessory.description}
                      </div>
                    </div>
                  </Link>
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
