'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from '../icons';
import { Post } from '../../lib/posts';

interface PrevNextPostsProps {
    posts: Post[];
    currentSlug: string;
}

const PrevNextPosts = ({ posts, currentSlug }: PrevNextPostsProps) => {
    const currentIndex = posts.findIndex(post => post.id === currentSlug);

    const previousPost = posts[currentIndex + 1];
    const nextPost = posts[currentIndex - 1];

    return (
        <div>
            <h2 className="text-2xl font-medium leading-tight mb-6 text-highlight text-center block">Read next</h2>
            <div className="flex md:flex-row flex-col md:gap-10 justify-between w-full border-t-2 border-b-2 border-white items-start">
                {previousPost && (
                    <Link
                        href={`${previousPost.slug}`}
                        className=" dark:text-white hover:cursor-pointer hover:border-opacity-50 relative w-full flex flex-col px-8 md:px-0 md:py-8 py-2 text-xl font-semibold anim-slide-in-left anim-delay-0 group transition-all md:w-1/2 order-last md:order-first items-end pb-4 border-t-2 border-white md:border-t-0"
                    >
                         <span className=" font-serif font-bold opacity-75 text-md text-highlight transition-all">
                            Previous
                        </span>
                        <span className="flex flex-row-reverse gap-3 w-full  text-right items-center">
                            <span className="md:w-2/3 w-full opacity-75 ">{previousPost.title}</span>
                            <ChevronRight className="group-hover:-translate-x-1 inline-block w-4 mt-1 text-highlight transition-transform rotate-180" />
                        </span>
                    </Link>
                )}
                 {nextPost && previousPost && <div className="md:flex md:h-44 border-r-2 border-white  hidden " />}
                {nextPost && (
                    <Link
                        href={`${nextPost.slug}`}
                        className=" dark:text-white hover:cursor-pointer hover:border-opacity-50 relative w-full flex flex-col items-start justify-start px-8 md:px-0 md:py-8 py-2 text-xl font-semibold group transition-all md:w-1/2"
                    >
                        <span className="font-serif font-bold opacity-75 text-md text-highlight transition-all">
                            Next
                        </span>
                        <span className="flex flex-row gap-3 items-center">
                            <span className="md:w-2/3 w-full opacity-75 ">{nextPost.title}</span>
                            <ChevronRight className="group-hover:translate-x-1 inline-block ml-4 w-4 mt-1 text-highlight transition-transform" />
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PrevNextPosts;