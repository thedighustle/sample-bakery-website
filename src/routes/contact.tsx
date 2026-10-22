import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Instagram, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoursTable, PageBanner, Reveal } from "@/components/site/Sections";
import { PHOTOS } from "@/lib/photos";
import { ADDRESS, EMAIL, PHONE, PHONE_HREF, SOCIAL } from "@/lib/bakery";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo(
      "Contact Sample Bakery | Call or Request a Quote",
      "Call 123-456-7890 or request a quote from Sample Bakery. Find our address at 1234 Sample Avenue, our hours, and our email in one place.",
    ),
  component: Contact,
});

const fieldCls =
  "h-[52px] w-full rounded-[12px] border border-input bg-card px-4 text-base outline-none focus:border-2 focus:border-primary";

function InfoCard({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div className="card-base flex gap-4 p-6">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary">
        <Icon className="size-6 text-primary" strokeWidth={1.5} aria-hidden />
      </span>
      <div>
        <p className="eyebrow">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

function QuoteForm() {
  const [v, setV] = useState({ name: "", phone: "", email: "", item: "", details: "", date: "" });
  const [touched, setTouched] = useState<Partial<Record<"name" | "phone" | "email" | "item", boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const errors: Partial<Record<"name" | "phone" | "email" | "item", string>> = {};
  if (!v.name.trim()) errors.name = "Please enter your name.";
  if (v.phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a valid phone number.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "Please enter a valid email.";
  if (!v.item) errors.item = "Please choose an option.";
  const valid = Object.keys(errors).length === 0;

  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value });
  const blur = (k: "name" | "phone" | "email" | "item") => () => setTouched({ ...touched, [k]: true });
  const err = (k: "name" | "phone" | "email" | "item") =>
    touched[k] && errors[k] ? (
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
        <AlertCircle className="size-4" aria-hidden /> {errors[k]}
      </p>
    ) : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("sending");
    setTimeout(() => setStatus("done"), 800);
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-secondary p-10 text-center" role="status">
        <CheckCircle2 className="mx-auto size-12 text-success" strokeWidth={1.5} aria-hidden />
        <p className="text-h3 mt-4">Thank you! Your request is in.</p>
        <p className="mt-2 text-muted-foreground">We'll be in touch soon.</p>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-semibold";
  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={label}>Full name*</label>
        <input id="name" autoComplete="name" className={cn(fieldCls, touched.name && errors.name && "border-destructive")} value={v.name} onChange={set("name")} onBlur={blur("name")} />
        {err("name")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>Phone number*</label>
          <input id="phone" type="tel" autoComplete="tel" className={cn(fieldCls, touched.phone && errors.phone && "border-destructive")} value={v.phone} onChange={set("phone")} onBlur={blur("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="email" className={label}>Email*</label>
          <input id="email" type="email" autoComplete="email" className={cn(fieldCls, touched.email && errors.email && "border-destructive")} value={v.email} onChange={set("email")} onBlur={blur("email")} />
          {err("email")}
        </div>
      </div>
      <div>
        <label htmlFor="item" className={label}>What would you like a quote for?*</label>
        <select id="item" className={cn(fieldCls, touched.item && errors.item && "border-destructive")} value={v.item} onChange={set("item")} onBlur={blur("item")}>
          <option value="">Choose one</option>
          <option>Sample Cake</option>
          <option>Sample Muffins</option>
          <option>Sample Other Sweet Treats</option>
          <option>Something else</option>
        </select>
        {err("item")}
      </div>
      <div>
        <label htmlFor="details" className={label}>Tell us about your order</label>
        <textarea id="details" rows={5} className={cn(fieldCls, "h-auto py-3")} value={v.details} onChange={set("details")} aria-describedby="details-help" />
        <p id="details-help" className="mt-1.5 text-sm text-muted-foreground">Quantities, flavours, and anything else we should know.</p>
      </div>
      <div>
        <label htmlFor="date" className={label}>Date needed (optional)</label>
        <input id="date" type="date" className={fieldCls} value={v.date} onChange={set("date")} />
      </div>
      <Button type="submit" variant="brand" size="brand" className="w-full" disabled={!valid || status === "sending"}>
        {status === "sending" && <Loader2 className="animate-spin" aria-hidden />}
        Send My Quote Request
      </Button>
      <p className="text-[13px] text-muted-foreground">
        By sending this, you agree to our <Link to="/privacy" className="link-text">Privacy page</Link>.
      </p>
    </form>
  );
}

function Contact() {
  return (
    <>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} eyebrow="CONTACT" title="Let's talk cake. Or muffins. Or both." lead="Call us, send a quote request, or just drop in." />
      <section className="section-y">
        <div className="container-site">
          <Reveal>
            <img src={PHOTOS.storefront.src} alt={PHOTOS.storefront.alt} width={1600} height={912} className="aspect-[16/9] w-full rounded-[20px] object-cover md:aspect-[16/7]" />
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-[45fr_55fr]">
            <div className="flex flex-col gap-5">
              <InfoCard icon={Phone} label="Call us">
                <a href={PHONE_HREF} className="font-display text-[28px] font-semibold leading-9 hover:text-primary">{PHONE}</a>
                <p className="text-muted-foreground">Best way to order or get a quote.</p>
              </InfoCard>
              <div className="lg:hidden" id="quote-mobile" />
              <InfoCard icon={Mail} label="Email us">
                <a href={`mailto:${EMAIL}`} className="link-text break-all">{EMAIL}</a>
              </InfoCard>
              <InfoCard icon={MapPin} label="Visit us">
                <p className="font-semibold">{ADDRESS}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer" className="link-text text-sm">Open in Maps</a>
              </InfoCard>
              <InfoCard icon={Instagram} label="Follow us">
                <p className="font-semibold">{SOCIAL}</p>
              </InfoCard>
              <HoursTable />
            </div>
            <div id="quote" className="card-base order-first h-fit p-6 sm:p-10 lg:order-none">
              <h2 className="text-h2">Request a quote</h2>
              <p className="mb-8 mt-3 text-muted-foreground">
                Tell us what you have in mind and we'll get back to you. Prefer to talk? Call{" "}
                <a href={PHONE_HREF} className="link-text">{PHONE}</a>.
              </p>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
      <section className="section-y bg-secondary">
        <div className="container-site">
          <iframe
            title="Map to Sample Bakery"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
            loading="lazy"
            className="h-[240px] w-full rounded-[20px] border-0 lg:h-[400px]"
          />
        </div>
      </section>
    </>
  );
}
