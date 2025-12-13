// Application constants

export const SITE_CONFIG = {
  name: 'Medium Clone',
  description: 'A Medium-like blogging platform built with Next.js and Sanity',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'Your Name',
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  STUDIO: '/studio',
  POST: (slug: string) => `/post/${slug}`,
  AUTHOR: (slug: string) => `/author/${slug}`,
  CATEGORY: (slug: string) => `/category/${slug}`,
} as const;

export const PAGINATION = {
  POSTS_PER_PAGE: 10,
  RELATED_POSTS: 3,
} as const;