import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllNews } from "@/lib/contentful";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "News",
  description: "Latest NIIT news, announcements, awards, campus updates, and scholarship information.",
};

export default async function NewsPage() {
  const articles = await getAllNews();

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="News"
            title="Latest campus updates."
            description="Follow up Latest News"
            light
          />
        </div>
      </section>
      <section className="container mx-auto grid gap-6 px-4 py-20 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {articles.map((article) => (
          <article key={article.id} className="overflow-hidden border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-16/10 bg-gray-100">
              <Image
                src={article.coverImage.includes("placeholder") ? "/images/NIIT.webp" : article.coverImage}
                alt={article.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">{article.category}</p>
              <h2 className="mt-3 text-xl font-extrabold text-[#1A1A2E]">{article.title}</h2>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays size={15} />
                {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(article.publishedAt))}
              </div>
              <p className="mt-4 leading-7 text-gray-600">{article.excerpt}</p>
              <Link href={`/news/${article.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-red-700">
                Read article <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

