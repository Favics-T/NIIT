import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGalleryImages } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore NIIT campus, events, labs, and student life through optimized images.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Gallery" title="Campus moments, optimized for performance." description="The gallery is statically generated and uses next/image for sizing, lazy loading, and responsive delivery." light />
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((item) => (
            <article key={item.id} className="overflow-hidden border border-gray-200 bg-white">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">{item.category}</p>
                <h2 className="mt-2 text-lg font-extrabold text-[#1A1A2E]">{item.title}</h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
