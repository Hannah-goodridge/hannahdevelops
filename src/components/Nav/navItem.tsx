import React from 'react';
import Link from 'next/link';

function NavItem({ href, text, scrollDown, new: isNew }: { href: string; text: string; scrollDown: boolean; new: boolean }) {
  return (
    <li className="xs:p-6 lg:p-0 flex ">
      <Link
        href={href}
        className={`relative block text-center text-xl font-medium lg:px-6 lg:py-0 p-12 transition-all ${
          scrollDown ? 'md:text-xl' : 'md:text-2xl'
        }`}
      >
        {isNew && (
          <span
            className={`absolute bottom-7 left-0  text-yellow text-xs px-2 py-1 rounded-full ${
              scrollDown ? 'bottom-4' : 'bottom-7'
            }`}
          >
            ✨ New ✨
          </span>
        )}

        {text}
      </Link>
    </li>
  );
}

export default NavItem;
