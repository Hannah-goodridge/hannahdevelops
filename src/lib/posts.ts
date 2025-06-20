import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface Post {
    id: string;
    date: string;
    title: string;
    description?: string;
    tags?: string;
    slug?: string;
}

export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.reduce<Post[]>((acc, fileName) => {
    if (/\.mdx$/.test(fileName)) {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (data.slug && data.date) {
        acc.push({ id, ...data } as Post);
      }
    }
    return acc;
  }, []);

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPosts(): Post[] {
  const allPosts = getSortedPostsData();
  const blogPosts = allPosts.filter(post => post.slug && post.slug.includes('/blog'));
  return blogPosts;
}
export function getPlaygroundPosts(): Post[] {
  const allPosts = getSortedPostsData();
  const playgroundPosts = allPosts.filter(post => post.slug && post.tags && post.tags.includes('Code Snippet'));
  return playgroundPosts;
}
export function getFeaturedPosts(): Post[] {
  const allPosts = getSortedPostsData();
  const blogPosts = allPosts.filter(post => post.slug);
  return blogPosts.slice(0, 4);
}