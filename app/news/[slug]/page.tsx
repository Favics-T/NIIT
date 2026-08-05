import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { getAllNewsSlugs, getNewsArticle } from "@/lib/contentful";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getAllNewsSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return { title: article ? article.title : "News Article", description: article?.excerpt };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) notFound();

  return (
    <article className="bg-white">
      <section className="bg-[#111827] py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-300">{article.category}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">{article.title}</h1>
          <div className="mt-5 flex items-center gap-2 text-gray-300">
            <CalendarDays size={16} />
            {new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(article.publishedAt))}
            <span>by {article.author}</span>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="relative mb-10 aspect-[16/7] overflow-hidden bg-gray-100">
          <Image
            src={article.coverImage.includes("placeholder") ? "/images/NIIT.webp" : article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="prose max-w-3xl">
          <p>{article.excerpt}</p>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.body) }} />
        </div>
      </div>
    </article>
  );
}

function sanitizeHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}
