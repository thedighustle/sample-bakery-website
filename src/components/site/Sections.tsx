import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HOURS, PHONE, PHONE_HREF, TESTIMONIALS } from "@/lib/bakery";

export function Reveal({
  children,
  className,
  from,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      data-from={from}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("mb-8 lg:mb-12", center && "mx-auto max-w-2xl text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="text-h2 mt-3">{title}</h2>
      {body && <p className="mt-4 text-muted-foreground">{body}</p>}
    </Reveal>
  );
}

type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span className="text-border">/</span>}
            {c.to ? (
              <Link to={c.to} className="hover:text-foreground hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="text-foreground" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageBanner({
  crumbs,
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  actions,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  actions?: boolean;
}) {
  return (
    <section className="bg-secondary">
      <div
        className={cn(
          "container-site grid items-center gap-10 py-12 lg:py-16",
          image ? "lg:grid-cols-2" : "min-h-[220px] lg:min-h-[280px]",
        )}
      >
        <div className="animate-fade-up">
          <Breadcrumbs items={crumbs} />
          {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
          <h1 className="text-h1 mt-3">{title}</h1>
          {lead && <p className="text-lead prose-width mt-4 text-muted-foreground">{lead}</p>}
          {actions && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="brand" size="brand">
                <a href={PHONE_HREF}>
                  <Phone aria-hidden /> Call for a Quote
                </a>
              </Button>
              <Button asChild variant="brandOutline" size="brand">
                <Link to="/contact" hash="quote">
                  Request a Quote
                </Link>
              </Button>
            </div>
          )}
        </div>
        {image && (
          <Reveal from="right">
            <img
              src={image}
              alt={imageAlt}
              width={1200}
              height={1200}
              className="aspect-[3/2] w-full rounded-[20px] object-cover lg:ml-auto lg:aspect-[4/5] lg:max-w-[440px]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function Stars({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <div className={cn("flex gap-1", className)} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className="fill-primary text-primary"
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function TestimonialCard({ quote, name }: { quote: string; name: string }) {
  return (
    <figure className="card-base card-lift relative flex h-full flex-col p-6 lg:p-8">
      <span
        className="font-display text-[64px] leading-none text-primary/40"
        aria-hidden
      >
        “
      </span>
      <blockquote className="-mt-4 flex-1 font-display text-xl font-medium leading-[30px]">
        {quote}
      </blockquote>
      <Stars className="mt-6" />
      <figcaption className="mt-3">
        <span className="font-semibold">{name}</span>
        <span className="block text-sm text-muted-foreground">Five Stars</span>
      </figcaption>
    </figure>
  );
}

export function TestimonialGrid({ offset = false }: { offset?: boolean }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={t.name} delay={i * 120} className={cn(offset && i === 1 && "md:translate-y-8 md:[&.is-visible]:translate-y-8")}>
          <TestimonialCard {...t} />
        </Reveal>
      ))}
    </div>
  );
}

export function TestimonialStrip() {
  return (
    <section className="section-y bg-secondary">
      <div className="container-site">
        <SectionHeader eyebrow="KIND WORDS" title="What our customers are saying" />
        <TestimonialGrid />
        <p className="mt-10 text-center">
          <Link to="/testimonials" className="link-text font-semibold">
            Read all testimonials →
          </Link>
        </p>
      </div>
    </section>
  );
}

export function CtaBanner({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="bg-primary py-16 text-primary-foreground lg:py-20">
      <Reveal className="container-site mx-auto max-w-[720px] text-center">
        <h2 className="text-h2">{title}</h2>
        <p className="text-lead mt-4 opacity-90">{sub}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="onDark" size="brand">
            <a href={PHONE_HREF}>
              <Phone aria-hidden /> Call {PHONE}
            </a>
          </Button>
          <Button asChild variant="onDarkOutline" size="brand">
            <Link to="/contact" hash="quote">
              Request a Quote
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

export function HoursTable() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);
  return (
    <table className="w-full overflow-hidden rounded-2xl bg-card text-left shadow-rest">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {HOURS.map((h) => {
          const isToday = h.idx === today;
          return (
            <tr
              key={h.day}
              className={cn("border-b border-border last:border-0", isToday && "bg-secondary font-bold")}
            >
              <th scope="row" className="px-5 py-3 font-medium">
                {h.day}
                {isToday && <span className="sr-only"> (today)</span>}
              </th>
              <td className="px-5 py-3 text-right">
                {h.hours ?? <span className="italic text-muted-foreground">Closed</span>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function IconBullet({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  text: string;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-secondary">
        <Icon className="size-6 text-primary" strokeWidth={1.5} />
      </span>
      <h3 className="mt-5 font-sans text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-muted-foreground">{text}</p>
    </div>
  );
}

export function PhotoCard({
  to,
  image,
  alt,
  title,
  text,
  link,
  imgClass,
}: {
  to: string;
  image: string;
  alt: string;
  title: string;
  text?: string;
  link: string;
  imgClass?: string;
}) {
  return (
    <Link to={to} className="card-base card-lift img-zoom group block h-full overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          width={1200}
          height={1200}
          className={cn("h-full w-full object-cover", imgClass)}
        />
      </div>
      <div className="p-6">
        <h3 className="text-h3">{title}</h3>
        {text && <p className="mt-2 text-muted-foreground">{text}</p>}
        <span className="link-text mt-4 inline-block font-semibold">{link} →</span>
      </div>
    </Link>
  );
}
