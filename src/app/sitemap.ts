import { getSortedPostsData, Post } from '../lib/posts';

export default function sitemap() {
  const posts = getSortedPostsData().map((post: Post) => ({
    url: `https://hannahgoodridge.dev/blog/${post.id}`,
    lastModified: new Date(post.date).toISOString().split('T')[0],
  }));

  const routes = ['', '/about', '/blog', '/playground', '/contact', '/euro-2024', '/privacy-policy', '/sitemap', '/404'].map((route) => ({
    url: `https://hannahgoodridge.dev${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...posts];
}