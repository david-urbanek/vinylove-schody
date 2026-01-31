import { RotateCcw, Shield, Star, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

interface TrustStrip1Props {
  items?: TrustItem[];
  className?: string;
}

const DEFAULT_ITEMS: TrustItem[] = [
  {
    icon: <Truck className="size-5" />,
    title: "Doprava po celé ČR",
    description: "Až k vám domů",
  },
  {
    icon: <RotateCcw className="size-5" />,
    title: "Profesionální montáž",
    description: "Se zárukou kvality",
  },
  {
    icon: <Shield className="size-5" />,
    title: "Záruka kvality",
    description: "Prvotřídní materiály",
  },
  {
    icon: <Star className="size-5" />,
    title: "Ověřeno zákazníky",
    description: "Dlouholetá tradice",
  },
];

const TrustStrip1 = ({
  items = DEFAULT_ITEMS,
  className,
}: TrustStrip1Props) => {
  return (
    <section className={cn("border-y bg-muted/30 py-6", className)}>
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div>
                <p className="font-medium leading-tight">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { TrustStrip1 };
