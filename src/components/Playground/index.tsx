'use client'
import React from 'react';
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

interface PlaygroundBlockProps {
    posts: Post[];
}

const PlaygroundBlock = ({ posts }: PlaygroundBlockProps) => {
  return (
    <div className="bg-white dark:bg-secondary min-h-screen">
      <section className="dark:bg-secondary bg-white text-primary dark:text-white py-0 px-4 lg:pt-32 xl:px-0">
        <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col justify-center  py-16 xl:px-0 px-4">
          <div className="w-full mx-auto  flex flex-col items-center justify-center">
            <p className="text-md font-serif font-medium tracking-wide opacity-50 mb-6 overflow-hidden anim-slide-in-bottom ">
              – Playground
            </p>
            <h2 className="text-2xl anim-slide-in-bottom anim-delay-1 lg:text-4xl font-medium leading-tight mb-6 text-highlight">
              {`Hannah's snippets`}
            </h2>
            <p className="text-md text-center tracking-wide font-serif  max-w-3xl anim-slide-in-bottom anim-delay-3">
              {`This is a collection of code snippets I've created for fun, to learn new things or to solve a problem. They are not full projects, but rather small pieces of code that I've found interesting.`}
            </p>
          </div>
        </div>
      </section>
      <section className=" dark:bg-primary bg-white text-primary dark:text-white py-10 px-4 xl:px-0">
        <div className="w-full flex flex-col lg:flex-row gap-6 flex-wrap max-w-screen mx-auto justify-center">
          {posts.map((post, i) => {
            const { date, title, id } = post;
            return (
              <div className="flex flex-row lg:w-1/3 w-full" key={`playground-blog-link-${id}`}>
                <Link
                  className={`hover:text-primary dark:text-white hover:cursor-pointer hover:dark:bg-secondary bg-white  dark:bg-primary hover:border-opacity-50 relative w-full flex flex-col md:flex-row md:items-center flex-end items-stretch justify-between p-6 gap-2  rounded-md border-2 text-xl font-semibold solid border-colour-gradient  anim-slide-in-left anim-delay-${i} group transition-all`}
                  href={`/blog/${id}`}
                >
                  <small className="group-hover:opacity-100 font-serif font-bold opacity-75 text-md text-highlight transition-all">
                    {date}
                  </small>
                  <p className=" md:w-2/3 ">{title}</p>
                  <ChevronRight className="hidden md:inline-block  w-4 mt-1 text-highlight" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PlaygroundBlock;