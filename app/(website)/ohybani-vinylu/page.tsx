import { Process1 } from "@/components/homepage/process1";

export default function OhybaniVinyluPage() {
  const steps = [
    {
      step: "01",
      title: "Máte vlastní materiál?",
      description:
        "Máte již zakoupenou vinylovou podlahu a potřebujete z ní vyrobit schody? Zašlete nám váš materiál a my se postaráme o jeho profesionální zpracování.",
      color: "#0ea5e9",
    },
    {
      step: "02",
      title: "Výroba na míru",
      description:
        "Váš vinyl u nás projde procesem nahřívání a ohýbání. Díky špičkové technologii a zkušenostem docílíme perfektního ohybu bez poškození dekoru.",
      color: "#5DCA8A",
    },
    {
      step: "03",
      title: "Doručení a vyzvednutí",
      description:
        "Hotové schody si můžete osobně vyzvednout na našich odběrných místech v Praze nebo Brně. Alternativně vám zakázku pečlivě zabalíme a zašleme přímo na vaši adresu.",
      color: "#f59e0b",
    },
  ];

  return (
    <div className="bg-background">
      <Process1
        className="min-h-fit"
        title="Ohýbání vinylu na míru"
        description="Nabízíme službu profesionálního ohýbání vámi dodaného vinylu. Proměňte svou podlahu v dokonalé schodiště s naším servisem."
        steps={steps}
      />
    </div>
  );
}
