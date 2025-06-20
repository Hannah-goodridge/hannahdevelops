"use client";
import * as React from 'react';
import Link from 'next/link';
import { IBreadcrumbItemProps } from '../../types/definitions';

const BreadcrumbItem = ({ text, slug, active, icon }: IBreadcrumbItemProps) => {
  const link = slug && slug.includes('/') ? slug : `/${slug}`;

  return (
    <li className="px-2 py-3 box-dec-break inline-block w-auto right-inherit  font-bold last:font-normal flex flex-row items-center underline last:no-underline">
      {active && link && (
        <Link className="inline-block" href={link} data-ga-category="breadcrumb-item" data-ga-action="click" data-ga-label={text}>
          {icon === 'home' && (
            <span className="inline-block w-3 3 mr-2 h-2"></span>
          )}
          <span>{text}</span>
          <span className="ml-3 breadcrumb-slash inline-block">/</span>
        </Link>
      )}
      {active === false && <span>{text}</span>}
    </li>
  );
};

export default BreadcrumbItem;