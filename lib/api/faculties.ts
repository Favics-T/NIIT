// import { contentfulClient } from '@/lib/contenntful';
import { contentfulClient } from '@/lib/conntentful';
import type { Faculty } from '@/types/faculty';

export async function getFaculties(): Promise<Faculty[]> {
  const res = await contentfulClient.getEntries({
    content_type: 'faculty',
    order: ['fields.name'],
  });

  return res.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name as string,
    slug: item.fields.slug as string,
    description: item.fields.description as string,
    // map whatever other fields you have
  }));
}

export async function getFacultyBySlug(slug: string): Promise<Faculty | null> {
  const res = await contentfulClient.getEntries({
    content_type: 'faculty',
    'fields.slug': slug,
    limit: 1,
  });

  if (!res.items.length) return null;

  const item = res.items[0];
  return {
    id: item.sys.id,
    name: item.fields.name as string,
    slug: item.fields.slug as string,
    description: item.fields.description as string,
  };
}