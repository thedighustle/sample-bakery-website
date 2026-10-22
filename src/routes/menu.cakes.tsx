import { createFileRoute } from "@tanstack/react-router";
import { CakeSlice } from "lucide-react";
import { CategoryPage, HowToOrder } from "@/components/site/CategoryPage";
import { PHOTOS } from "@/lib/photos";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/menu/cakes")({
  head: () =>
    seo(
      "Cakes | Tiramisu, Lava & Dark Forest | Sample Bakery",
      "Sample Bakery cakes baked fresh: Tiramisu, Chocolate Lava Cake and Dark Forest Cake at $25 each. Need a custom cake? Call 123-456-7890 for a quote.",
    ),
  component: () => (
    <CategoryPage
      name="Sample Cake"
      lead="Our cakes are made fresh every morning, with love and care."
      image={PHOTOS.cakes.src}
      imageAlt={PHOTOS.cakes.alt}
      listTitle="Pick your cake"
      icon={CakeSlice}
      items={[
        { name: "Sample Tiramisu", price: "$25" },
        { name: "Sample Chocolate Lava Cake", price: "$25" },
        { name: "Sample Dark Forest Cake", price: "$25" },
        { name: "Sample Custom Order", price: "Call for quote", custom: "Have something specific in mind? Call us and we'll give you a quote." },
      ]}
      middle={<HowToOrder />}
      related={[
        { to: "/menu/muffins", image: PHOTOS.muffins.src, alt: PHOTOS.muffins.alt, title: "Sample Muffins", imgClass: "scale-150 object-[30%_70%]" },
        { to: "/menu/other-sweet-treats", image: PHOTOS.cookies.src, alt: PHOTOS.cookies.alt, title: "Sample Other Sweet Treats", imgClass: "scale-125" },
      ]}
      cta={{ title: "Planning a cake?", sub: "Custom cakes are quoted by phone. Let's talk." }}
    />
  ),
});
