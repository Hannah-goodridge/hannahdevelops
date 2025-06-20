"use client";
import * as React from 'react';
import Link from 'next/link';

interface IBackButtonProps {
  text?: string;
  link?: string;
}

const BackButton = ({ text = "Back", link }: IBackButtonProps) => {
  const hasLink = link && link.length > 0;
  return (
    <>
      {hasLink && (
        <Link
          className="dark:bg-secondary bg-white px-3 pt-3 pb-2 text-primary dark:text-white flex flex-col justify-center text-center no-underline text-md font-bold border-2 border-solid border-image-gradient-green-top"
          href={link}
        >
          <span className="block m-auto h-2">Icon</span>
          <span className="block text-md no-underline">{text}</span>
        </Link>
      )}
      {!hasLink && (
        <button
          className="dark:bg-secondary bg-white px-3 pt-3 pb-2 text-primary dark:text-white flex flex-col justify-center text-center text-md font-bold border-2 border-solid border-image-gradient-green-top"
          onClick={() => window.history.back()}
          type="button"
        >
          <span className="block m-auto h-2">Icon</span>
          <span className="block text-md">{text}</span>
        </button>
      )}
    </>
  );
};

export default BackButton;