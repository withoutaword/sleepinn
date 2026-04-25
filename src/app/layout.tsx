import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageTracker from "@/components/ui/PageTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sleep Inn Sandusky | Hotels Near Cedar Point | Milan Road",
  description:
    "Book your Cedar Point vacation at Sleep Inn Sandusky on Milan Road. 10 minutes from the park, free breakfast, indoor pool. Call to save 15%!",
  openGraph: {
    title: "Sleep Inn Sandusky | Hotels Near Cedar Point",
    description:
      "10 minutes from Cedar Point. Free breakfast, indoor pool. Call to save 15%!",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Sleep Inn Sandusky",
  description:
    "Hotel near Cedar Point on Milan Road. Free breakfast, indoor pool, pet friendly.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5509 Milan Road",
    addressLocality: "Sandusky",
    addressRegion: "OH",
    postalCode: "44870",
    addressCountry: "US",
  },
  telephone: "+14195040035",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Breakfast", value: true },
    { "@type": "LocationFeatureSpecification", name: "Indoor Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pet Friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Fitness Center", value: true },
  ],
  starRating: { "@type": "Rating", ratingValue: "2" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
