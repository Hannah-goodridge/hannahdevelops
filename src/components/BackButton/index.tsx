"use client";
import * as React from 'react';
import Link from 'next/link';
import BackIcon from '@assets/svgs/back.svg';

interface IBackButtonProps {
  text?: string;
  link?: string;
}

const BackButton = ({ text = "Back", link }: IBackButtonProps) => {
  const hasLink = link && link.length > 0;

  const commonClasses = "dark:bg-secondary bg-white px-3 pt-3 pb-2 text-primary dark:text-white flex flex-col justify-center items-center text-center no-underline text-md font-bold border-2 border-solid border-image-gradient-green-top w-24";

  const content = (
    <>
      <BackIcon aria-hidden="true" className="h-6 w-6 mb-1" />
      <span className="block text-md no-underline">{text}</span>
    </>
  );

  return (
    <>
      {hasLink ? (
        <Link className={commonClasses} href={link}>
          {content}
        </Link>
      ) : (
        <button
          className={commonClasses}
          onClick={() => window.history.back()}
          type="button"
        >
          {content}
        </button>
      )}
    </>
  );
};

export default BackButton;