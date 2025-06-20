import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getSortedPostsData, getBlogPosts, getPlaygroundPosts } from '../../../lib/posts';
import { BlogPostTop, PrevNextPosts, BlogLikeCounter, IframeWrapper, LinkableTitle, CodeHighlight, DraggableAudioPlayer, RichText } from '../../../components';
import readingTime from 'reading-time';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata, ResolvingMetadata } from 'next';

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const fullPath = path.join(process.cwd(), `src/posts/${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter } = matter(fileContents);

  const { title, description, tags, author } = frontmatter as { title: string, description: string, slug: string, tags: string, author: string };
  const keywords = tags ? tags.split(',').map(tag => tag.trim()) : [];
  const canonicalUrl = `https://hannahgoodridge.dev/blog/${slug}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: 'https://hannahgoodridge.dev/assets/images/me.jpg',
          width: 800,
          height: 600,
          alt: 'Hannah Goodridge',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@hannahg_dev',
      images: ['https://hannahgoodridge.dev/assets/images/me.jpg'],
    },
  };
}

export function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({ params: { slug } }: PageProps) {
  const fullPath = path.join(process.cwd(), `src/posts/${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const frontmatter = { ...data, slug: `/blog/${slug}` };
  const body = content;

  const { title, author, date, description } = frontmatter as { title: string, author: string, date: string, slug: string, description: string };
  const postType = (frontmatter.slug as string).includes('/blog') ? 'blog' : 'playground';
  const allPosts = postType === 'blog' ? getBlogPosts() : getPlaygroundPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    datePublished: date,
    dateModified: date,
    description: description,
    author: [{
        '@type': 'Person',
        name: author,
        url: 'https://hannahgoodridge.dev/about',
      }],
  };

  const components = {
    IframeWrapper,
    h2: LinkableTitle,
    code: CodeHighlight,
    DraggableAudioPlayer,
    RichText,
  }
  return (
      <div className="anim-triggered dark:bg-primary light:bg-white light:text-primary dark:text-white lg:min-h-full py-16 ">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <section className="max-w-2xl w-full m-auto px-4 lg:px-0">
          <BlogPostTop time={stats.text} date={date} title={title} author={author} />
          <BlogLikeCounter postId={slug} />
          <article className="richtext px-4 md:px-0 anim-slide-in-bottom">
            <MDXRemote source={body} components={components} />
          </article>
        </section>
        <section className=" w-full m-auto px-4 lg:px-0">
            <PrevNextPosts posts={allPosts} currentSlug={slug} />
        </section>
      </div>
  );
}