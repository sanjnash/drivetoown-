// Stage 2 — populated by Contentlayer
export type BlogCategory = 'car-tips' | 'finance' | 'news' | 'ownership';

export interface BlogPost {
  slug: string;
  url: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  readTime: number;
  author: string;
  image?: string;
  featured?: boolean;
  body: {
    raw: string;
    code: string;
  };
}
