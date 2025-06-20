/* eslint-disable max-len */
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from '@components/icons';

interface BlogFrontmatter {
  title: string;
  date: string;
  description?: string;
  slug?: string;
}

interface FeaturedBlogProps {
  posts: BlogFrontmatter[];
}

const FeaturedBlog = ({ posts }: FeaturedBlogProps) => {

  return (
    <section className="dark:bg-secondary bg-white text-primary dark:text-white min-h-screen py-10 px-4 lg:pt-32 xl:px-0">
      <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between py-16 xl:px-0 px-4">
        <div className="w-full lg:w-1/3">
          <p className="text-md font-serif font-medium tracking-wide opacity-50 mb-6 overflow-hidden anim-slide-in-bottom ">– Blog</p>
          <h2 className="text-2xl anim-slide-in-bottom anim-delay-1 lg:text-4xl font-medium leading-tight mb-6 text-highlight">
            Whats new?
          </h2>
          <p className="text-md tracking-wide font-serif opacity-75 leading-loose max-w-2xl anim-slide-in-bottom anim-delay-3">
            {`I've wanted to have a blog for a long while, mostly because I want to improve my writing skills, so now there's no excuse.
            Find out my latest musings here!`}
          </p>
        </div>
        <div className="w-full lg:w-2/3 flex flex-start lg:flex-end justify-start lg:justify-end lg:items-center">
          <div className="w-full lg:w-2/3 flex flex-col lg:pr-12 overflow-hidden">
            <div className="border-colour-gradient border-solid border-2 rounded-md bg-white dark:bg-primary w-full px-8 py-6">
              {posts.map((post, i) => (
                <Link
                  className={`hover:text-primary dark:text-white hover:cursor-pointer hover:border-opacity-50 relative w-full flex flex-col items-start md:flex-row md:items-center flex-end justify-between py-8 last-of-type:border-0 border-b-2 border-opacity-25 text-xl font-semibold solid border-white anim-slide-in-left anim-delay-${i} group transition-all`}
                  key={`homepage-blog-link-${post.slug}`}
                  href={`/blog/${post.slug}`}
                >
                  <time
                    dateTime={post.date}
                    className="group-hover:opacity-100 font-serif font-bold opacity-75 text-md text-highlight transition-all"
                  >
                    {post.date}
                  </time>
                  <span className=" md:w-1/2 ">{post.title}</span>
                  <ChevronRight className="hidden md:inline-block ml-4 w-4 mt-1 text-highlight" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
