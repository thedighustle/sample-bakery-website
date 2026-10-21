import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PHONE, PHONE_HREF, SHARED_LINE } from "@/lib/bakery";
import { CtaBanner, PageBanner, PhotoCard, Reveal, SectionHeader } from "./Sections";

export type Item = { name: string; price: string; each?: boolean; custom?: string };
type Related = { to: string; image: string; alt: string; title: string; imgClass?: string };

export function CategoryPage({
  name,
  lead,
  image,
  imageAlt,
  listTitle,
  icon: Icon,
  items,
  cols = 2,
  middle,
  related,
  cta,
}: {
  name: string;
  lead: string;
  image: string;
  imageAlt: string;
  listTitle: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  items: Item[];
  cols?: 2 | 3;
  middle: ReactNode;
  related: Related[];
  cta: { title: string; sub: string };
}) {
  return (
    <>
      <PageBanner
        crumbs={[{ label: "Home", to: "/" }, { label: "Menu", to: "/menu" }, { label: name }]}
        eyebrow={name.toUpperCase()}
        title={name}
        lead={lead}
        image={image}
        imageAlt={imageAlt}
        actions
      />
      <section className="section-y">
        <div className="container-site">
          <SectionHeader title={listTitle} />
          <div className={cn("grid gap-6 md:grid-cols-2", cols === 3 && "lg:grid-cols-3")}>
            {items.map((it, i) => (
              <Reveal key={it.name} delay={i * 80}>
                <article
                  className={cn(
                    "card-base card-lift flex h-full flex-col overflow-hidden",
                    it.custom && "border-2 border-primary",
                  )}
                >
                  <div className="grid h-24 place-items-center bg-secondary">
                    <Icon className="size-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-xl font-medium lg:text-2xl">{it.name}</h3>
                      <p className="shrink-0 text-lg font-bold lg:text-xl">
                        {it.price}
                        {it.each && (
                          <span className="ml-1 text-sm font-normal text-muted-foreground">each</span>
                        )}
                      </p>
                    </div>
                    <p className="mt-2 flex-1 text-muted-foreground">{it.custom ?? SHARED_LINE}</p>
                    {it.custom ? (
                      <Button asChild variant="brand" size="brand" className="mt-6 self-start">
                        <a href={PHONE_HREF}>
                          <Phone aria-hidden /> Call for a Quote
                        </a>
                      </Button>
                    ) : (
                      <a href={PHONE_HREF} className="link-text mt-4 self-start font-semibold">
                        Call to order
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {middle}
      <section className="section-y">
        <div className="container-site">
          <SectionHeader title="Something else to go with it?" />
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.to} delay={i * 80}>
                <PhotoCard {...r} link={`See ${r.title.replace("Sample ", "")}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner {...cta} />
    </>
  );
}

export function HowToOrder() {
  const steps = [
    ["Call us", `Ring ${PHONE} during opening hours.`],
    ["Tell us what you'd like", "Pick a cake or describe a custom one."],
    ["Get your quote", "We'll talk through the details with you."],
  ];
  return (
    <section className="section-y bg-secondary">
      <div className="container-site">
        <SectionHeader eyebrow="HOW TO ORDER" title="Three easy steps" />
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} delay={i * 80} className="border-l border-border pl-6 md:border-0 md:pl-0 md:text-center">
              <span className="font-display text-[40px] font-semibold leading-none text-primary-hover">
                {i + 1}
              </span>
              <h3 className="mt-3 font-sans text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
