import React from 'react';
import BlogBlock from '@components/BlogBlock';
import { getBlogPosts } from '../../lib/posts';

const Blog = () => {
  const posts = getBlogPosts();
  return (
      <BlogBlock posts={posts} />
  );
};

export default Blog;