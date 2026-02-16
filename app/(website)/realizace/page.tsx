import { Realizations } from "@/components/realizations/realizations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realizace",
  description: "Realizace na míru vinylových schodů a podlah",
  alternates: {
    canonical: `/realizace`,
  },
};

export default function RealizacePage() {
  return (
    <div className="pt-20">
      <Realizations />
    </div>
  );
}
