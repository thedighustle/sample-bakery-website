import { createFileRoute } from "@tanstack/react-router";
import { CtaBanner, PageBanner, Reveal, Stars, TestimonialGrid } from "@/components/site/Sections";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/testimonials")({
  head: () =>
    seo(
      "Testimonials | What Customers Say | Sample Bakery",
      "Read what customers say about Sample Bakery: five-star reviews for a professional website and a mouth-watering menu. Call 123-456-7890.",
    ),
  component: Testimonials,
});

function Testimonials() {
  return (
    <>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Testimonials" }]} eyebrow="TESTIMONIALS" title="What our customers say." lead="Five stars, in their own words." />
      <section className="section-y pb-24 lg:pb-32">
        <div className="container-site">
          <Reveal className="mb-12 flex flex-col items-center text-center">
            <Stars size={32} />
            <p className="mt-4 text-xl font-bold">5.0 · Five Stars</p>
            <p className="text-muted-foreground">From 3 reviews</p>
          </Reveal>
          <TestimonialGrid offset />
        </div>
      </section>
      <section className="section-y bg-secondary">
        <Reveal className="container-site">
          <div className="card-base mx-auto max-w-[640px] p-8 text-center lg:p-10">
            <span className="inline-block rounded-full border border-border bg-secondary px-3.5 py-1.5 text-[13px] font-semibold">Web design showcase</span>
            <h2 className="text-h2 mt-4">Want a website like this?</h2>
            <p className="mt-4 text-muted-foreground">Sample Bakery is a web design showcase. Every page here shows the kind of site we can build for your business.</p>
          </div>
        </Reveal>
      </section>
      <CtaBanner title="Love what you see?" sub="Call us or send a quote request." />
    </>
  );
}
