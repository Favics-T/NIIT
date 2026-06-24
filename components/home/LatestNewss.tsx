// src/components/home/LatestNews.tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import type { NewsArticle } from "@/types/news";
import { formatDate } from "@/lib/utils";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LatestNewsProps {
  articles: NewsArticle[];
}

export function LatestNews({ articles }: LatestNewsProps) {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="News"
            title="Latest News & Updates"
            description="Stay informed with the latest happenings at NIIT."
          />
          <Link
            href="/news"
            className="flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800 whitespace-nowrap"
          >
            View All News <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Cover */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <Badge variant="red">{article.category}</Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="mb-3 text-sm font-bold leading-snug text-[#1A1A2E] transition-colors group-hover:text-red-700 line-clamp-2">
                  {article.title}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-gray-500 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <User size={11} className="text-red-500" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-red-500" />
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
