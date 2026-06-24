export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  coverImage: string;
  author: string;
  authorAvatar: string;
  publishedAt: string; 
  tags: string[];
}
