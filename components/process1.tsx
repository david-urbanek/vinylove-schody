import { CornerDownRight, Star } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ProcessStep {
  step?: string;
  title: string;
  description: string;
  color?: string;
}

interface Process1Props {
  className?: string;
  title: string;
  description: string;
  steps: ProcessStep[];
}

const Process1 = ({ className, title, description, steps }: Process1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <div className="relative w-fit text-3xl font-bold md:text-4xl">
              {" "}
              <h2 className="w-fit">{title}</h2>
              <Star className="absolute -top-2 -right-2 size-5 text-sky-500 md:size-10 lg:-right-14" />
            </div>
            <p className="text-muted-foreground lg:text-xl">{description}</p>

            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
            >
              <CornerDownRight className="text-sky-500" />
              Napište nám
            </Button>
          </div>
          <ul className="relative col-span-4 w-full lg:pl-22">
            {steps.map((step, index) => (
              <li
                key={index}
                className="relative flex flex-col justify-between gap-10 border-t py-8 md:flex-row lg:py-10"
              >
                <Illustration
                  className="absolute top-4 right-0"
                  color={step.color}
                />

                <div className="flex size-12 items-center justify-center bg-muted px-4 py-1 tracking-tighter">
                  {step.step ?? `0${index + 1}`}
                </div>
                <div className="">
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Process1 };

interface IllustrationProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const Illustration = ({ color = "#0ea5e9", ...props }: IllustrationProps) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M 1 2.5 L 16 2.5 Q 19.5 2.5 19.5 6 L 19.5 19.5"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
