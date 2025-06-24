import React from 'react';

interface BlogPostTopProps {
  title: string;
  author: string;
  date: string;
  time: string;
}

const BlogPostTop = ({ title, author, date, time }: BlogPostTopProps) => {
  return (
    <header className="w-full lg:max-w-screen-xl mx-auto flex flex-col justify-between pt-12 xl:px-0 xs:px-4 md:px-0 mb-8">
      <h1 className="text-highlight font-bold text-3xl lg:text-5xl mb-4 leading-tight anim-slide-in-bottom">{title}</h1>

      <p className="text-md font-serif anim-slide-in-bottom">
        <span>{`by ${author} ~ `}</span>
        <time>{`${date} ~ `}</time>
        <span>{`${time}`}</span>
      </p>
    </header>
  );
};

export default BlogPostTop;