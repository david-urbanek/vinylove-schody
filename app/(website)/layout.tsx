import { EcommerceFooter19 } from "@/components/ecommerce-footer19";
import { Navbar3 } from "@/components/navbar3";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar3 />
      <main className="flex-grow pt-20">{children}</main>
      <EcommerceFooter19 />
    </>
  );
}
