import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} handles the personal information you share through this website.`,
  path: "/privacy-policy",
});

/** Plain-language starter policy. Listed in docs/content-review-required.md for owner/legal review. */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        compact
        crumbs={[{ name: "Privacy policy", path: "/privacy-policy" }]}
        eyebrow="Legal"
        title={["Privacy policy"]}
      />
      <section className="on-light text-ink py-20 md:py-28">
        <div className="container-x">
          <div className="text-graphite [&_h2]:font-display [&_h2]:text-ink max-w-2xl space-y-6 text-[1.05rem] leading-relaxed [&_h2]:mt-12 [&_h2]:text-[length:var(--step-2)]">
            <p>
              This policy explains what personal information {site.name} collects through this
              website, and how it is used. We aim to collect as little as possible.
            </p>
            <h2>Enquiries</h2>
            <p>
              When you send an enquiry, we receive the name, email address, optional phone number,
              project type and message you provide. We use it only to respond to you and to discuss
              your project. We do not sell or rent it to anyone.
            </p>
            <h2>Analytics</h2>
            <p>
              If you accept analytics cookies, we use Google Analytics to understand which pages are
              useful. You can decline, and the site works the same either way.
            </p>
            <h2>Maps</h2>
            <p>
              The interactive map on the contact page is provided by Google and only loads if you
              choose to load it.
            </p>
            <h2>Your choices</h2>
            <p>
              To ask what information we hold about you, or to have it corrected or deleted, email{" "}
              <a className="text-ink underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or call{" "}
              <a className="text-ink underline underline-offset-4" href={`tel:${site.phone.e164}`}>
                {site.phone.display}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
