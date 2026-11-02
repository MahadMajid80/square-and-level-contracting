import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { archivo, instrument, manrope } from "@/lib/fonts";
import { indexingAllowed, site } from "@/lib/site";
import { brand, media } from "@/lib/images";
import { businessJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { RevealRoot } from "@/components/animations/RevealRoot";
import { Preloader, preloaderBootScript } from "@/components/layout/Preloader";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Custom Design/Build, Salt Spring Island BC`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: { icon: media(brand.favicon), apple: media(brand.favicon) },
  formatDetection: { telephone: false, email: false, address: false },
  robots: indexingAllowed ? { index: true, follow: true } : { index: false, follow: false },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#121314",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${archivo.variable} ${manrope.variable} ${instrument.variable}`}
      // The preloader boot script sets data-preloading / data-skip-preloader before hydration.
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: preloaderBootScript }} />
        <noscript>
          <style>{`#preloader{display:none}`}</style>
        </noscript>
        <Preloader />
        <a
          href="#main"
          className="bg-level text-ink sr-only z-[100] rounded-full px-5 py-3 font-semibold focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <RevealRoot />
        <Analytics />
        <JsonLd data={[businessJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
