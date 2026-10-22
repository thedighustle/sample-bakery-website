import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/site/Sections";
import { EMAIL, PHONE } from "@/lib/bakery";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo(
      "Privacy Policy | Sample Bakery",
      "How Sample Bakery handles the details you share when you contact us or request a quote.",
    ),
  component: () => (
    <>
      <PageBanner crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]} title="Privacy Policy" />
      <section className="section-y">
        <div className="container-site mx-auto max-w-[720px] space-y-6">
          <h2 className="text-h3">What we collect</h2>
          <p>When you send a quote request, we receive the name, phone number, email and order details you enter.</p>
          <h2 className="text-h3">How we use it</h2>
          <p>We only use these details to reply to your request and talk through your order.</p>
          <h2 className="text-h3">Questions</h2>
          <p>
            Call {PHONE} or email {EMAIL}. You can also reach us through our{" "}
            <Link to="/contact" className="link-text">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  ),
});
