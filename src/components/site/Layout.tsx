import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChefHat, ChevronDown, Instagram, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ADDRESS,
  EMAIL,
  PHONE,
  PHONE_HREF,
  SHOWCASE_TAGLINE,
  SOCIAL,
  TAGLINE,
  isClosedDay,
} from "@/lib/bakery";

const MENU_LINKS = [
  { to: "/menu/cakes", label: "Sample Cake" },
  { to: "/menu/muffins", label: "Sample Muffins" },
  { to: "/menu/other-sweet-treats", label: "Sample Other Sweet Treats" },
] as const;

export function Logo({ badge = false, className }: { badge?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        badge && "rounded-2xl bg-linen p-3",
        className,
      )}
    >
      <span className="grid size-10 place-items-center rounded-full border-2 border-espresso bg-card lg:size-11">
        <ChefHat className="size-6 text-espresso" strokeWidth={1.5} aria-hidden />
      </span>
      <span className="font-display text-2xl font-semibold italic leading-none text-espresso">
        Sample Bakery
      </span>
    </span>
  );
}

function useToday() {
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => setDay(new Date().getDay()), []);
  return day;
}

function TopBar() {
  const day = useToday();
  const closed = day !== null && isClosedDay(day);
  return (
    <div className="hidden h-10 bg-espresso text-sm text-linen lg:block">
      <div className="container-site flex h-full items-center justify-between">
        <span>
          {day === null
            ? "Open 7:00 AM to 7:00 PM, closed Thursdays"
            : closed
              ? "Closed today. Back tomorrow at 7:00 AM"
              : "Open today 7:00 AM to 7:00 PM"}
        </span>
        <span className="flex items-center gap-6 text-stone">
          <span>{ADDRESS}</span>
          <a href={`mailto:${EMAIL}`} className="hover:text-accent-light">
            {EMAIL}
          </a>
        </span>
      </div>
    </div>
  );
}

function NavItem({ to, label, exact }: { to: string; label: string; exact?: boolean }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: !!exact }}
      className="group relative py-2 font-medium text-espresso"
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={cn(
              "absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-primary transition-transform duration-200",
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
            )}
          />
        </>
      )}
    </Link>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border transition-all duration-300",
        scrolled ? "bg-card shadow-rest" : "bg-linen",
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-6 transition-all duration-300",
          scrolled ? "h-[72px]" : "h-[84px]",
        )}
      >
        <Link to="/" aria-label="Sample Bakery home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <NavItem to="/" label="Home" exact />
          <NavItem to="/about" label="About Us" />
          <div className="group relative">
            <div className="flex items-center gap-1">
              <NavItem to="/menu" label="Menu" />
              <ChevronDown className="size-4 text-muted-foreground" aria-hidden />
            </div>
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="card-base p-2 shadow-raised">
                <Link
                  to="/menu"
                  className="block rounded-[12px] px-4 py-3 font-semibold hover:bg-secondary"
                >
                  View Full Menu
                </Link>
                {MENU_LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="block rounded-[12px] px-4 py-3 hover:bg-secondary"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <NavItem to="/testimonials" label="Testimonials" />
          <NavItem to="/contact" label="Contact" />
        </nav>
        <Button asChild variant="brand" size="brand" className="hidden lg:inline-flex">
          <a href={PHONE_HREF}>
            <Phone aria-hidden /> Call {PHONE}
          </a>
        </Button>
        <button
          className="grid size-11 place-items-center rounded-[12px] lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu className="size-6" aria-hidden />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 photo-overlay transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-linen p-6 transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              className="grid size-11 place-items-center"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8 flex flex-col text-xl">
            <Link to="/" className="border-b border-border py-4">
              Home
            </Link>
            <Link to="/about" className="border-b border-border py-4">
              About Us
            </Link>
            <div className="border-b border-border">
              <button
                className="flex w-full items-center justify-between py-4"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                Menu
                <ChevronDown
                  className={cn("size-5 transition-transform", menuOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              {menuOpen && (
                <div className="flex flex-col pb-3 pl-4 text-lg">
                  <Link to="/menu" className="py-2">
                    View Full Menu
                  </Link>
                  {MENU_LINKS.map((l) => (
                    <Link key={l.to} to={l.to} className="py-2">
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/testimonials" className="border-b border-border py-4">
              Testimonials
            </Link>
            <Link to="/contact" className="border-b border-border py-4">
              Contact
            </Link>
          </nav>
          <div className="mt-auto space-y-3">
            <Button asChild variant="brand" size="brand" className="w-full">
              <a href={PHONE_HREF}>
                <Phone aria-hidden /> Call {PHONE}
              </a>
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Open 7:00 AM - 7:00 PM, closed Thursdays
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-espresso pb-8 pt-20 text-linen">
      <div className="container-site">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo badge />
            <p className="mt-5 text-stone">{TAGLINE}</p>
            <p className="mt-4 flex items-center gap-2 text-stone">
              <Instagram className="size-5 text-accent-light" strokeWidth={1.5} aria-hidden />
              {SOCIAL}
            </p>
          </div>
          <div>
            <h3 className="font-sans text-base font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-stone">
              {[
                ["/", "Home"],
                ["/about", "About Us"],
                ["/menu", "Menu"],
                ["/testimonials", "Testimonials"],
                ["/contact", "Contact"],
              ].map(([to, l]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-accent-light hover:underline">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-base font-semibold">Our Menu</h3>
            <ul className="mt-4 space-y-2 text-stone">
              {MENU_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-accent-light hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-base font-semibold">Visit &amp; Call</h3>
            <ul className="mt-4 space-y-3 text-stone">
              <li className="flex gap-2">
                <MapPin className="mt-1 size-5 shrink-0 text-accent-light" strokeWidth={1.5} aria-hidden />
                {ADDRESS}
              </li>
              <li className="flex gap-2">
                <Phone className="mt-1 size-5 shrink-0 text-accent-light" strokeWidth={1.5} aria-hidden />
                <a href={PHONE_HREF} className="hover:text-accent-light hover:underline">
                  {PHONE}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="mt-1 size-5 shrink-0 text-accent-light" strokeWidth={1.5} aria-hidden />
                <a href={`mailto:${EMAIL}`} className="break-all hover:text-accent-light hover:underline">
                  {EMAIL}
                </a>
              </li>
              <li className="text-sm leading-6">
                Mon-Wed 7:00 AM-7:00 PM
                <br />
                Thu Closed
                <br />
                Fri-Sun 7:00 AM-7:00 PM
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-footer-line pt-6 text-sm text-stone md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Sample Bakery. All rights reserved. ·{" "}
            <Link to="/privacy" className="hover:text-accent-light hover:underline">
              Privacy
            </Link>
          </p>
          <p title={SHOWCASE_TAGLINE}>Sample Bakery is a web design showcase.</p>
        </div>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-3 bg-card p-3 shadow-[0_-8px_24px_color-mix(in_oklab,var(--espresso)_10%,transparent)] lg:hidden">
      <Button asChild variant="brand" size="brand">
        <a href={PHONE_HREF}>
          <Phone aria-hidden /> Call Now
        </a>
      </Button>
      <Button asChild variant="brandOutline" size="brand">
        <Link to="/contact" hash="quote">
          Get a Quote
        </Link>
      </Button>
    </div>
  );
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen flex-col pb-[76px] lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:p-3"
      >
        Skip to content
      </a>
      <TopBar />
      <Header />
      <main id="main" key={pathname} className="animate-page-in flex-1">
        {children}
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
