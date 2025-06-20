/* eslint-disable react/no-array-index-key */
import React from 'react';
import Link from 'next/link';
import { SocialLinks } from '@components';

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();

  return (
    <footer className="w-full bg-highlight dark:bg-primary text-white">
      <div className="max-w-xl lg:max-w-(--breakpoint-xl) flex flex-wrap mx-auto flex-row justify-between md:justify-around lg:justify-between items-center py-5  xl:px-0 ">
        <p className="font-xs font-body">{`© Hannahgoodridge ${currentYear} All rights reserved.`}</p>
        <SocialLinks />
        <Link href="/privacy-policy" className="">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
