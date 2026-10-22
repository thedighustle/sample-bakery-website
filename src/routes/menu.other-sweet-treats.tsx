import { createFileRoute } from "@tanstack/react-router";
import { Cookie, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryPage } from "@/components/site/CategoryPage";
import { Reveal } from "@/components/site/Sections";
import { PHOTOS } from "@/lib/photos";
import { PHONE, PHONE_HREF } from "@/lib/bakery";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/menu/other-sweet-treats")({
  head: () =>
    seo(
      "Cookies & Cupcakes | Sweet Treats | Sample Bakery",
      "Sample Bakery cookies and cupcakes, baked fresh at $0.75 each. Need a custom order? Call 123-456-7890 for a quote.",
    ),
  component: () => (
    <CategoryPage
      name="Sample Other Sweet Treats"
      lead="Cookies and cupcakes baked fresh every morning, with love and care."
      image={PHOTOS.cookies.src}
      imageAlt={PHOTOS.cookies.alt}
      listTitle="Little treats, big smiles"
      icon={Cookie}
      cols={3}
      items={[
        { name: "Sample Cookies", price: "$0.75", each: true },
        { name: "Sample Cupcakes", price: "$0.75", each: true },
        { name: "Sample Custom Order", price: "Call for quote", custom: "Have something specific in mind? Call us and we'll give you a quote." },
      ]}
      middle={
        <section className="section-y bg-secondary">
          <Reveal className="container-site mx-auto max-w-[720px] text-center">
            <h2 className="text-h2">Bring a little something.</h2>
            <p className="mt-4 text-muted-foreground">Cookies and cupcakes are made for sharing. Stop by, or call to talk about a custom order.</p>
            <Button asChild variant="brand" size="brand" className="mt-8"><a href={PHONE_HREF}><Phone aria-hidden /> Call {PHONE}</a></Button>
          </Reveal>
        </section>
      }
      related={[
        { to: "/menu/cakes", image: PHOTOS.cakes.src, alt: PHOTOS.cakes.alt, title: "Sample Cake", imgClass: "scale-150 object-right-top" },
        { to: "/menu/muffins", image: PHOTOS.muffins.src, alt: PHOTOS.muffins.alt, title: "Sample Muffins", imgClass: "scale-125" },
      ]}
      cta={{ title: "Cookies and cupcakes for any occasion?", sub: "Call for a quote on a custom order." }}
    />
  ),
});
