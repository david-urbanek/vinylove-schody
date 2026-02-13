import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Košík",
  description: "Košík s vašemi produkty",
  alternates: {
    canonical: `/kosik`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
