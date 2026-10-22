import { createFileRoute } from "@tanstack/react-router";
import { Croissant } from "lucide-react";
import { CategoryPage } from "@/components/site/CategoryPage";
import { Reveal } from "@/components/site/Sections";
import { PHOTOS } from "@/lib/photos";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/menu/muffins")({
  head: () =>
    seo(
      "Muffins | Strawberry, Blueberry, Chocolate | Sample Bakery",
      "Fresh-baked muffins at Sample Bakery: Strawberry, Blueberry and Chocolate at $1.75 each. Custom orders by quote. Call 123-456-7890.",
    ),
  component: () => (
    <CategoryPage
      name="Sample Muffins"
      lead="Muffins baked fresh every morning, with love and care."
      image={PHOTOS.muffins.src}
      imageAlt={PHOTOS.muffins.alt}
      listTitle="Choose your flavour"
      icon={Croissant}
      items={[
        { name: "Sample Strawberry", price: "$1.75", each: true },
        { name: "Sample Blueberry", price: "$1.75", each: true },
        { name: "Sample Chocolate", price: "$1.75", each: true },
        { name: "Sample Custom Order", price: "Call for quote", custom: "Want a special flavour or a big batch? Call and we'll quote it." },
      ]}
      middle={
        <section className="section-y bg-secondary">
          <Reveal className="container-site">
            <img src={PHOTOS.muffins.src} alt={PHOTOS.muffins.alt} loading="lazy" width={1200} height={1200} className="aspect-[16/7] w-full rounded-[20px] object-cover object-bottom" />
            <p className="mt-4 text-center text-muted-foreground">Fresh from the oven.</p>
          </Reveal>
        </section>
      }
      related={[
        { to: "/menu/cakes", image: PHOTOS.cakes.src, alt: PHOTOS.cakes.alt, title: "Sample Cake", imgClass: "scale-150 object-left-top" },
        { to: "/menu/other-sweet-treats", image: PHOTOS.cookies.src, alt: PHOTOS.cookies.alt, title: "Sample Other Sweet Treats", imgClass: "scale-150 object-bottom" },
      ]}
      cta={{ title: "Muffins by the dozen, or something special?", sub: "Call for a quote on custom orders." }}
    />
  ),
});
