import { buildMetadata } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapEmbed } from "@/components/sections/MapEmbed";

export const metadata = buildMetadata({
  title: "Contact — Start Your Project",
  description: `Contact ${site.name} on Salt Spring Island, BC. Call ${site.phone.display}, email ${site.email}, or send a project enquiry online.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title={["Let’s talk about", "your project."]}
        lede="A custom home, a cabin, an addition or a piece of woodwork — tell us what you have in mind."
      />

      <section aria-labelledby="contact-form-title" className="on-light text-ink py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="contact-form-title" className="display-sm">
              Send an enquiry
            </h2>
            <p className="text-graphite mt-4 max-w-lg">
              Fields marked <span className="text-ink">*</span> are required. Messages go directly
              to {site.contactPerson}.
            </p>
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>

          <aside aria-labelledby="direct-title" className="lg:col-span-4 lg:col-start-9">
            <h2 id="direct-title" className="eyebrow text-graphite">
              Or reach us directly
            </h2>
            <address className="mt-8 not-italic">
              <dl className="divide-ink/12 border-ink/12 divide-y border-y">
                <div className="py-6">
                  <dt className="eyebrow text-graphite">Phone</dt>
                  <dd className="mt-2">
                    <a
                      href={`tel:${site.phone.e164}`}
                      className="font-display hover:text-graphite font-semibold tracking-tight text-[var(--step-2)]"
                    >
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-graphite">Email</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="link-draw text-[1.1rem] font-semibold break-all"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-graphite">Contact</dt>
                  <dd className="mt-2 font-semibold">{site.contactPerson}</dd>
                </div>
                <div className="py-6">
                  <dt className="eyebrow text-graphite">Address</dt>
                  <dd className="mt-2">
                    {site.address.street}
                    <br />
                    {site.address.locality}, {site.address.region} {site.address.postalCode}
                    <br />
                    {site.address.countryName}
                  </dd>
                </div>
              </dl>
            </address>
          </aside>
        </div>
      </section>

      <section aria-label={`Location: ${fullAddress}`} className="on-light text-ink pb-24">
        <div className="container-x">
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
