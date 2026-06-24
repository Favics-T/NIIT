import { HeroSection } from "@/components/home/HeroSection";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedFaculties } from "@/components/home/FeaturedFacuulties";
import { LatestNews } from "@/components/home/LatestNewss";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { AdmissionSteps } from "@/components/home/AdmissionSteps";
import { CTABanner } from "@/components/home/CTABanner";
import {
  getFeaturedFaculties,
  getLatestNews,
  getUpcomingEvents,
} from "@/lib/contentful";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Home",
  path: "/",
});

export default async function HomePage() {
  // Data fetching — runs at build time and on ISR re-generation
  const [faculties, news, events] = await Promise.all([
    getFeaturedFaculties(),
    getLatestNews(3),
    getUpcomingEvents(3),
  ]);

  return (
    <>
            <HeroSection />

      <AboutSnippet />

      <WhyChooseUs />
      {/* Featured Faculties — dynamic (revalidated via ISR) */}
      <FeaturedFaculties faculties={faculties} />

      {/* Latest News — dynamic (revalidated via ISR) */}
      <LatestNews articles={news} />

      {/* Upcoming Events — dynamic (revalidated via ISR) */}
      <UpcomingEvents events={events} />

      {/* Admission Steps — static content */}
      <AdmissionSteps />

      {/* CTA Newsletter Banner — client component */}
      <CTABanner />
    </>
  );
}
