
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/site";

interface PageMetaOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = "/images/og-image.jpg",
}: PageMetaOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
