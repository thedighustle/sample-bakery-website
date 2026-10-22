import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner, PageBanner, Reveal } from "@/components/site/Sections";
import { PHOTOS } from "@/lib/photos";
import { PHONE, PHONE_HREF } from "@/lib/bakery";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu/")({
  head: () =>
    seo(
      "Menu | Cakes, Muffins & Sweet Treats | Sample Bakery",
      "Browse Sample Bakery's menu: cakes from $25, muffins at $1.75 each, cookies and cupcakes at $0.75 each. Custom orders by quote. Call 123-456-7890.",
    ),
  component: MenuPage,
});

const ROWS = [
  { to: "/menu/cakes", p: PHOTOS.cakes, title: "Sample Cake", text: "Three signature cakes, each $25, plus custom cakes made to order.", items: ["Tiramisu", "Chocolate Lava Cake", "Dark Forest Cake", "Custom Order"], badge: "From $25", btn: "View Sample Cake" },
  { to: "/menu/muffins", p: PHOTOS.muffins, title: "Sample Muffins", text: "Strawberry, Blueberry and Chocolate, $1.75 each, plus custom orders.", items: ["Strawberry", "Blueberry", "Chocolate", "Custom Order"], badge: "$1.75 each", btn: "View Sample Muffins" },
  { to: "/menu/other-sweet-treats", p: PHOTOS.cookies, title: "Sample Other Sweet Treats", text: "Cookies and cupcakes at $0.75 each, plus custom orders.", items: ["Cookies", "Cupcakes", "Custom Order"], badge: "$0.75 each", btn: "View Sample Other Sweet Treats" },
] as const;

function MenuPage() {
  return (
    <>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Menu" }]} eyebrow="OUR MENU" title="Fresh from our kitchen." lead="Three corners of the menu, baked fresh every morning. Pick one to see what's inside." />
      <section className="section-y">
        <div className="container-site space-y-12 lg:space-y-20">
          {ROWS.map((r, i) => (
            <div key={r.to} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <Reveal from={i % 2 ? "right" : "left"} className={cn(i % 2 && "lg:order-2")}>
                <img src={r.p.src} alt={r.p.alt} loading="lazy" width={1200} height={1200} className="aspect-[3/2] w-full rounded-[20px] object-cover lg:aspect-[4/3]" />
              </Reveal>
              <Reveal>
                <span className="inline-block rounded-full border border-border bg-secondary px-3.5 py-1.5 text-[13px] font-semibold">{r.badge}</span>
                <h2 className="text-h2 mt-4">{r.title}</h2>
                <p className="mt-4 text-muted-foreground">{r.text}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
                  {r.items.map((it) => <li key={it}>· {it}</li>)}
                </ul>
                <Button asChild variant="brand" size="brand" className="mt-8 w-full sm:w-auto">
                  <Link to={r.to}>{r.btn}</Link>
                </Button>
              </Reveal>
            </div>
          ))}
        </div>
      </section>
      <section className="section-y bg-secondary">
        <Reveal className="container-site">
          <div className="card-base mx-auto max-w-[760px] p-8 text-center lg:p-12">
            <h2 className="text-h2">Custom orders, made your way</h2>
            <p className="mt-4 text-muted-foreground">Every category includes a Custom Order. Call us to talk through what you have in mind and we'll give you a quote.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="brand" size="brand"><a href={PHONE_HREF}><Phone aria-hidden /> Call {PHONE}</a></Button>
              <Button asChild variant="brandOutline" size="brand"><Link to="/contact" hash="quote">Request a Quote</Link></Button>
            </div>
          </div>
        </Reveal>
      </section>
      <CtaBanner title="Don't see exactly what you want?" sub="Every category has a Custom Order. Call for a quote." />
    </>
  );
}
