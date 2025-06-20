'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from '@components';

interface Post {
  id: string;
  date: string;
  title: string;
  description?: string;
  tags?: string;
  slug?: string;
}

interface BlogBlockProps {
    posts: Post[];
}

const BlogBlock = ({ posts }: BlogBlockProps) => {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    setFilteredPosts(posts);
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      if (post.tags) {
        post.tags.split(',').forEach((tag: string) => tagsSet.add(tag.trim()));
      }
    });
    setAllTags(Array.from(tagsSet));
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsAccordionOpen(true);
    }
  }, [posts]);

  useEffect(() => {
    if (activeTags.length === 0) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => {
          if (!post.tags) return false;
          const splitTags = post.tags.split(',').map((tag: string) => tag.trim());
          return activeTags.some((tag: string) => splitTags.includes(tag));
        }),
      );
    }
  }, [activeTags, posts]);

  const handleTagClick = (tag: string) => {
    setActiveTags(prevTags => (prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]));
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(prevState => !prevState);
  };

  const tagElements = allTags.map((tag: string) => (
    <button
      onClick={() => handleTagClick(tag)}
      type="button"
      className={`px-2 py-1 rounded ${
        activeTags.includes(tag) ? 'bg-highlight' : 'bg-peach'
      } white cursor-pointer hover:bg-highlight transition-all`}
      key={tag}
    >
      {tag}
    </button>
  ));

  return (
    <>
      <section className="dark:bg-secondary bg-white text-primary dark:text-white py-0 px-4 lg:pt-32 xl:px-0">
        <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col justify-center py-16 xl:px-0 px-4 gap-4">
          <div className="w-full mx-auto flex flex-col items-center justify-center">
            <p className="text-md font-serif font-medium tracking-wide opacity-50 mb-6 overflow-hidden anim-slide-in-bottom">– Blog</p>
            <h1 className="text-2xl anim-slide-in-bottom anim-delay-1 lg:text-4xl font-medium leading-tight mb-6 text-highlight">
              {`Hannah's blog`}
            </h1>
            <p className="text-md text-center tracking-wide font-serif max-w-3xl anim-slide-in-bottom anim-delay-3">
              {`Hey there, welcome to my blog! Here, I share short, practical tech insights alongside a glimpse into my personal experiences. I'm on a journey to improve my writing skills, and this blog is where I'm practicing while sharing useful knowledge on various topics. Expect informative posts and a touch of personal storytelling to keep things interesting.`}
              <br />
              <br />
            </p>
            <p className="text-md text-center tracking-wide font-serif max-w-3xl anim-slide-in-bottom anim-delay-3">
              Here are some of the themes I write about, you can use these tags as filters to find the content you are interested in. <br />
              Click this button to show or hide the tags.
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-1 align-start justify-center">
            <button
              onClick={toggleAccordion}
              type="button"
              className="px-3 py-2 rounded bg-highlight white cursor-pointer hover:bg-highlight transition-all"
            >
              {isAccordionOpen ? 'Hide Tags' : 'Show Tags'}
            </button>
            <div
              className={`flex flex-row flex-wrap gap-1 align-start justify-center transition-all ease-in-out ${
                isAccordionOpen ? 'max-h-auto' : 'max-h-0 overflow-hidden'
              }`}
            >
              {tagElements}
            </div>
          </div>
        </div>
      </section>
      <section className="dark:bg-primary bg-white text-primary dark:text-white py-10 px-4 xl:px-0 flex flex-col gap-3">
        {activeTags.length > 0 && (
          <div className="w-full flex flex-col lg:flex-row gap-6 flex-wrap max-w-screen mx-auto justify-center ">
            <p className="max-w-xl">Currently filtering by: {activeTags.join(', ')}</p>
            <button
              onClick={() => setActiveTags([])}
              type="button"
              className="px-2 py-1 rounded bg-peach white cursor-pointer hover:bg-highlight transition-all"
            >
              Remove filters
            </button>
          </div>
        )}
        <div className="w-full flex flex-col lg:flex-row gap-6 flex-wrap max-w-screen mx-auto justify-center">
          {filteredPosts.map((post: Post, i: number) => {
            const { date, title, id, tags } = post;
            return (
              <div className="flex flex-row lg:w-1/3 w-full" key={`homepage-blog-link-${id}`}>
                <Link
                  className={`hover:text-primary dark:text-white hover:cursor-pointer hover:dark:bg-secondary bg-white dark:bg-primary hover:border-opacity-50 relative w-full flex flex-col  flex-end flex-wrap items-stretch justify-between p-6 gap-2 rounded-md border-2 text-xl font-semibold solid border-colour-gradient anim-slide-in-left anim-delay-${i} group transition-all`}
                  href={`/blog/${id}`}
                >
                  <small className="group-hover:opacity-100 font-serif font-bold opacity-75 text-md text-highlight transition-all">
                    {date}
                  </small>
                  <span className="flex flex-row justify-between w-full">
                    <p className="md:w-2/3">{title}</p>
                    <ChevronRight className="hidden md:inline-block w-4 mt-1 text-highlight" />
                  </span>
                  {tags && (
                    <div className=" flex-row flex-wrap gap-1 align-start justify-start lg:flex hidden">
                      {tags.split(',').map((tag: string) => (
                        <span className="text-sm bg-highlight text-white rounded px-1" key={`blog-link-${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default BlogBlock;