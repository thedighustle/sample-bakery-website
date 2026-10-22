import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Heart, MapPin, Phone, Sun, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaBanner,
  HoursTable,
  IconBullet,
  PhotoCard,
  Reveal,
  SectionHeader,
  TestimonialStrip,
} from "@/components/site/Sections";
import { PHOTOS } from "@/lib/photos";
import { ADDRESS, PHONE, PHONE_HREF } from "@/lib/bakery";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "Sample Bakery | Fresh-Baked Cakes, Muffins & Treats",
      "Fresh cakes, muffins, cookies and cupcakes baked every morning at Sample Bakery in Sample City. Call 123-456-7890 or request a quote today.",
    ),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative flex min-h-[560px] items-end overflow-hidden lg:h-[88vh] lg:max-h-[760px] lg:min-h-[620px] lg:items-center">
        <img
          src={PHOTOS.interior.src}
          alt={PHOTOS.interior.alt}
          width={1600}
          height={1008}
          className="animate-hero-zoom absolute inset-0 h-full w-full object-cover object-[40%_center]"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-site relative pb-20 pt-24 lg:py-0">
          <div className="max-w-[600px] text-linen">
            <p className="eyebrow animate-fade-up !text-accent-light">
              SAMPLE BAKERY · SAMPLE CITY
            </p>
            <h1 className="text-h1 animate-fade-up mt-4 [animation-delay:120ms]">
              Baked fresh every morning. Welcomed like family.
            </h1>
            <p className="text-lead animate-fade-up mt-5 [animation-delay:240ms]">
              Cakes, muffins, cookies and cupcakes made with love and care. Come in, grab a seat,
              and stay a while.
            </p>
            <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row">
              <Button asChild variant="onDark" size="brand">
                <a href={PHONE_HREF}>
                  <Phone aria-hidden /> Call {PHONE}
                </a>
              </Button>
              <Button asChild variant="onDarkOutline" size="brand">
                <Link to="/menu">View Our Menu</Link>
              </Button>
            </div>
            <span className="mt-6 inline-block rounded-full border border-accent-light/50 px-3.5 py-1.5 text-[13px] font-semibold">
              Web design showcase
            </span>
          </div>
        </div>
      </section>

      <div className="container-site relative z-10 -mt-6 lg:-mt-10">
        <ul className="card-base grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            [Sun, "Baked fresh every morning"],
            [CalendarDays, "5 years of baking"],
            [Heart, "Made with love and care"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Sun;
            return (
              <li key={label as string} className="flex items-center justify-center gap-3 p-5 font-semibold">
                <I className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
                {label as string}
              </li>
            );
          })}
        </ul>
      </div>

      <section className="section-y">
        <div className="container-site">
          <SectionHeader
            eyebrow="OUR MENU"
            title="Something sweet for every craving"
            body="Three corners of our kitchen, each baked fresh this morning."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <PhotoCard to="/menu/cakes" image={PHOTOS.cakes.src} alt={PHOTOS.cakes.alt} title="Sample Cake" text="Tiramisu, Chocolate Lava Cake and Dark Forest Cake, from $25." link="See the cakes" />
            </Reveal>
            <Reveal delay={80}>
              <PhotoCard to="/menu/muffins" image={PHOTOS.muffins.src} alt={PHOTOS.muffins.alt} title="Sample Muffins" text="Strawberry, Blueberry and Chocolate, $1.75 each." link="See the muffins" />
            </Reveal>
            <Reveal delay={160} className="md:col-span-2 lg:col-span-1">
              <PhotoCard to="/menu/other-sweet-treats" image={PHOTOS.cookies.src} alt={PHOTOS.cookies.alt} title="Sample Other Sweet Treats" text="Cookies and cupcakes, $0.75 each." link="See the treats" />
            </Reveal>
          </div>
          <p className="mt-10 text-center">
            <Link to="/contact" hash="quote" className="link-text font-semibold">
              Need something custom? Call for a quote →
            </Link>
          </p>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[55fr_45fr]">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">OUR STORY</p>
            <h2 className="text-h2 mt-3">A little corner of calm, baked fresh</h2>
            <p className="prose-width mt-5 text-muted-foreground">
              Sample Bakery has been baking for 5 years, and every morning starts the same way: the
              oven on, the sweets made fresh, and the door open to anyone who walks in. Whether
              you're here for a cake, a muffin, or a quiet moment, you're welcome to stay a while.
            </p>
            <p className="mt-5 font-display text-xl italic">Chef Baker</p>
            <Button asChild variant="brandOutline" size="brand" className="mt-8">
              <Link to="/about">Meet Sample Bakery</Link>
            </Button>
          </Reveal>
          <Reveal from="right" className="relative order-1 lg:order-2">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[20px] bg-border" aria-hidden />
            <img src={PHOTOS.shelves.src} alt={PHOTOS.shelves.alt} loading="lazy" width={1200} height={1200} className="relative aspect-[3/2] w-full rounded-[20px] object-cover lg:aspect-[4/5]" />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <SectionHeader eyebrow="WHY SAMPLE BAKERY" title="The little things we won't skip" />
          <div className="grid gap-10 md:grid-cols-3">
            <Reveal><IconBullet icon={Sun} title="Fresh every morning" text="Our sweets and treats are prepared fresh each morning, so every bite tastes like it should." /></Reveal>
            <Reveal delay={80}><IconBullet icon={Heart} title="Made with love and care" text="We bake with care for every order, big or small." /></Reveal>
            <Reveal delay={160}><IconBullet icon={Users} title="Treated like family" text="Everyone who visits is welcomed like one of our own." /></Reveal>
          </div>
        </div>
      </section>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <SectionHeader eyebrow="A PEEK INSIDE" title="Fresh from the counter" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-12 lg:grid-rows-2">
            {[
              { to: "/menu", p: PHOTOS.shelves, l: "Pastries", c: "lg:col-span-5 lg:row-span-2" },
              { to: "/menu/cakes", p: PHOTOS.cakes, l: "Cakes", c: "lg:col-span-4" },
              { to: "/menu/muffins", p: PHOTOS.muffins, l: "Muffins", c: "lg:col-span-3 lg:row-span-2" },
              { to: "/menu/other-sweet-treats", p: PHOTOS.cookies, l: "Cookies", c: "lg:col-span-4" },
            ].map((t) => (
              <Link key={t.l} to={t.to} className={`img-zoom group relative aspect-square overflow-hidden rounded-[20px] lg:aspect-auto lg:min-h-[220px] ${t.c}`}>
                <img src={t.p.src} alt={t.p.alt} loading="lazy" width={1200} height={1200} className="h-full w-full object-cover" />
                <span className="photo-overlay absolute inset-0 grid place-items-center font-display text-2xl text-linen opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {t.l}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="brandOutline" size="brand">
              <Link to="/menu">Explore the Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="[&>section]:bg-background">
        <TestimonialStrip />
      </div>

      <section className="section-y bg-secondary">
        <div className="container-site">
          <SectionHeader title="Stop by, or give us a call" />
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal><HoursTable /></Reveal>
            <Reveal delay={80}>
              <div className="card-base h-full p-8">
                <h3 className="text-h3">Find us</h3>
                <p className="mt-4 flex gap-3"><MapPin className="size-6 text-primary" strokeWidth={1.5} aria-hidden />{ADDRESS}</p>
                <p className="mt-3 flex gap-3"><Clock className="size-6 text-primary" strokeWidth={1.5} aria-hidden />7:00 AM - 7:00 PM, closed Thursdays</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="brand" size="brand"><a href={PHONE_HREF}><Phone aria-hidden /> Call {PHONE}</a></Button>
                  <Button asChild variant="brandOutline" size="brand"><Link to="/contact">Contact & directions</Link></Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner title="Hungry for something fresh?" sub="Call us or ask for a quote. We'll have the oven warm." />
    </>
  );
}
