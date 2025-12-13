// TypeScript type definitions for the application

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body: any[]; // Portable Text content
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  author: Author;
  categories: Category[];
  publishedAt: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  bio?: string;
  image?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

export interface SanityImage {
  asset: {
    _ref: string;
  };
  alt?: string;
}