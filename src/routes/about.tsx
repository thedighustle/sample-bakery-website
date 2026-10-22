import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Coffee, Smile, Wheat } from "lucide-react";
import { CtaBanner, IconBullet, PageBanner, Reveal, SectionHeader, TestimonialStrip } from "@/components/site/Sections";
import { PHOTOS } from "@/lib/photos";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About Sample Bakery | Fresh-Baked Family Welcome",
      "Meet Sample Bakery and Chef Baker: five years of fresh morning baking, made with love and care, and a welcome that treats every guest like family.",
    ),
  component: About,
});

function About() {
  return (
    <>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]} eyebrow="ABOUT US" title="Five years of fresh mornings." lead="The story behind the oven, and the people who welcome you in." />
      <section className="section-y">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal from="left">
            <img src={PHOTOS.interior.src} alt={PHOTOS.interior.alt} loading="lazy" width={1600} height={1008} className="aspect-[3/2] w-full rounded-[20px] object-cover object-[70%_center] lg:aspect-[4/5]" />
          </Reveal>
          <Reveal>
            <h2 className="text-h2">Made with love and care</h2>
            <p className="prose-width mt-5 text-muted-foreground">
              Sample Bakery has been part of the baking world for five years. Every morning we prepare our sweets and treats fresh, because we want you licking your fingers and coming back for more. Everything we make is baked with love and care, and everyone who walks through the door is treated like family.
            </p>
            <Link to="/menu" className="link-text mt-6 inline-block font-semibold">See what's baking →</Link>
          </Reveal>
        </div>
      </section>
      <section className="section-y bg-secondary">
        <Reveal className="container-site mx-auto max-w-[720px] text-center">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-linen">
            <ChefHat className="size-9 text-primary" strokeWidth={1.5} aria-hidden />
          </span>
          <p className="eyebrow mt-6">THE BAKER</p>
          <h2 className="text-h2 mt-3">Meet Chef Baker</h2>
          <p className="mt-5 text-muted-foreground">Chef Baker leads the kitchen at Sample Bakery, from the early-morning bake to the friendly hello at the counter.</p>
        </Reveal>
      </section>
      <section className="section-y">
        <div className="container-site">
          <SectionHeader eyebrow="OUR VALUES" title="What we stand for" />
          <div className="grid gap-10 md:grid-cols-3">
            <Reveal><IconBullet icon={Wheat} title="Fresh, always" text="Mornings are for baking. What's on the counter was made today." /></Reveal>
            <Reveal delay={80}><IconBullet icon={Coffee} title="Room to breathe" text="Linger a while. Meet someone new, or enjoy some quiet me-time with something sweet." /></Reveal>
            <Reveal delay={160}><IconBullet icon={Smile} title="Everyone's welcome" text="Regular or first-timer, you'll be greeted like family." /></Reveal>
          </div>
        </div>
      </section>
      <section className="relative grid h-[240px] place-items-center overflow-hidden lg:h-[360px]">
        <img src={PHOTOS.shelves.src} alt="" loading="lazy" width={1200} height={1200} className="absolute inset-0 h-full w-full object-cover" />
        <div className="photo-overlay absolute inset-0" />
        <p className="container-site relative text-center font-display text-2xl font-medium text-linen lg:text-[32px]">Come hungry. Leave happy.</p>
      </section>
      <TestimonialStrip />
      <CtaBanner title="Come say hello." sub="Pull up a seat. Everyone's family here." />
    </>
  );
}
