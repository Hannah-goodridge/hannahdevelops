/* eslint-disable react/no-array-index-key */
import React from 'react';
import Link from 'next/link';
import { SocialLinks } from '@components';

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();

  return (
    <footer className="w-full bg-highlight dark:bg-primary text-white">
      <div className="max-w-xl lg:max-w-(--breakpoint-xl) flex flex-wrap mx-auto flex-col gap-2 lg:flex-row justify-between md:justify-around lg:justify-between items-center py-5  xl:px-0 ">
        <div className="flex flex-row gap-4 lg:w-1/2">
          <p className="font-xs font-body">{`© Hannahgoodridge ${currentYear} All rights reserved.`}</p>
        </div>
        <div className="flex flex-row flex-grow justify-between gap-4">
          <SocialLinks />
          <Link href="/privacy-policy" className="">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
