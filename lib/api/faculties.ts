// import { contentfulClient } from '@/lib/contenntful';
import { contentfulClient } from '@/lib/contentful';
import type { Faculty } from '@/types/faculty';

export async function getFaculties(): Promise<Faculty[]> {
  const res = await contentfulClient.getEntries({
    content_type: 'faculty',
    order: ['fields.name'],
  });

  return res.items.map((item: any) => ({
    id: item.sys.id,
    slug: item.fields.slug ?? "",
    name: item.fields.name ?? "",
    shortName: item.fields.shortName ?? "",
    description: item.fields.description ?? "",
    coverImage: item.fields.coverImage?.fields?.file?.url
      ? `https:${item.fields.coverImage.fields.file.url}`
      : "",
    icon: item.fields.icon ?? "",
    programCount: item.fields.programCount ?? 0,
    studentCount: item.fields.studentCount ?? 0,
    dean: item.fields.dean ?? "",
    featuredPrograms: Array.isArray(item.fields.featuredPrograms)
      ? item.fields.featuredPrograms
      : [],
  }));
}

export async function getFacultyBySlug(slug: string): Promise<Faculty | null> {
  const res = await contentfulClient.getEntries({
    content_type: 'faculty',
    'fields.slug': slug,
    limit: 1,
  });

  if (!res.items.length) return null;

  const item = res.items[0] as any;
  return {
    id: item.sys.id,
    slug: item.fields.slug ?? "",
    name: item.fields.name ?? "",
    shortName: item.fields.shortName ?? "",
    description: item.fields.description ?? "",
    coverImage: item.fields.coverImage?.fields?.file?.url
      ? `https:${item.fields.coverImage.fields.file.url}`
      : "",
    icon: item.fields.icon ?? "",
    programCount: item.fields.programCount ?? 0,
    studentCount: item.fields.studentCount ?? 0,
    dean: item.fields.dean ?? "",
    featuredPrograms: Array.isArray(item.fields.featuredPrograms)
      ? item.fields.featuredPrograms
      : [],
  };
}