import { cn } from "@/lib/utils";
import Image from "next/image";

interface About6Props {
  className?: string;
}

const About6 = ({ className }: About6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
          <div className="flex w-full flex-col items-start justify-start gap-24 lg:w-1/2">
            <div className="pr-6">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:mb-10">
                O nás
              </h2>
              <p className="mb-9 text-muted-foreground lg:text-xl">
                Jsme rodinná firma s více než 20 lety zkušeností v oboru
                vinylových podlah a schodišť. Naším cílem je přinášet do vašich
                domovů kvalitu, design a funkčnost. Specializujeme se na
                zakázkovou výrobu a montáž, přičemž klademe důraz na každý
                detail.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <div className="aspect-[0.7] w-full rounded-lg overflow-hidden relative md:w-1/2">
                <Image
                  src="/realizace/schody/schody-1.png"
                  alt="Realizace vinylových schodů"
                  width={896}
                  height={1152}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <div className="aspect-[1.1] w-full rounded-lg overflow-hidden relative">
                  <Image
                    src="/realizace/schody/schody-2.png"
                    alt="Vinylové schody detail"
                    width={896}
                    height={1152}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="aspect-[0.7] w-full rounded-lg overflow-hidden relative">
                  <Image
                    src="/realizace/podlahy/podlahy-1.png"
                    alt="Vinylová podlaha realizace"
                    width={896}
                    height={1152}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <div className="aspect-[0.9] w-full rounded-lg overflow-hidden relative md:w-1/2">
                <Image
                  src="/realizace/schody/schody-3.png"
                  alt="Vinylové schody montáž"
                  width={896}
                  height={1152}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <div className="aspect-[0.8] w-full rounded-lg overflow-hidden relative">
                  <Image
                    src="/realizace/schody/schody-4.png"
                    alt="Kvalitní vinylové schody"
                    width={896}
                    height={1152}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="aspect-[0.9] w-full rounded-lg overflow-hidden relative">
                  <Image
                    src="/realizace/podlahy/podlahy-2.png"
                    alt="Profesionální pokládka podlah"
                    width={896}
                    height={1152}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </div>
            </div>
            <div className="px-8">
              <h3 className="mb-8 text-2xl font-semibold lg:mb-6">
                Naše dílna
              </h3>
              <p className="mb-9 lg:text-xl">
                Naše výroba je vybavena nejmodernějšími technologiemi pro
                zpracování vinylu. Díky tomu jsme schopni vytvořit schody a
                podlahy přesně na míru vašim požadavkům, ať už se jedná o
                standardní rozměry nebo atypická řešení.
              </p>
              <p className="text-muted-foreground">
                Každý kus, který opustí naši dílnu, prochází přísnou kontrolou
                kvality. Věříme, že poctivé řemeslo a špičkové materiály jsou
                základem dlouholeté spokojenosti našich zákazníků. Přijďte se
                přesvědčit do našeho showroomu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About6 };
