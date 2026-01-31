import { cn } from "@/lib/utils";

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
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg"
                alt="about 1"
                className="aspect-[0.7] w-full rounded-lg object-cover md:w-1/2"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-AkftcHujUmk-unsplash.jpg"
                  alt="about 2"
                  className="aspect-[1.1] rounded-lg object-cover"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-vGgn0xLdy8s-unsplash.jpg"
                  alt="about 3"
                  className="aspect-[0.7] rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-48">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/johnson-wang-iI4sR_nkkbc-unsplash.jpg"
                alt="about 4"
                className="aspect-[0.9] w-full rounded-lg object-cover md:w-1/2"
              />
              <div className="flex w-full flex-col items-center justify-center gap-6 md:w-1/2">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg"
                  alt="about 5"
                  className="aspect-[0.8] rounded-lg object-cover"
                />
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/alvin-engler-bIhpiQA009k-unsplash.jpg"
                  alt="about 6"
                  className="aspect-[0.9] rounded-lg object-cover"
                />
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
