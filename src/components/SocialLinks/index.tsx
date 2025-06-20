// New file: src/components/SocialLinks/index.tsx
import React from 'react';
import LinkedIn from '../icons/LinkedIn';
import Github from '../icons/Github';
import BlueSky from '../icons/BlueSky';
import Instagram from '../icons/Instagram';
import { SOCIAL_LINKS } from '../../constants';

const SocialLinks: React.FC = () => {

  const links = [
    {
      href: SOCIAL_LINKS.LINKEDIN,
      icon: LinkedIn,
      label: 'LinkedIn',
    },
    {
      href: SOCIAL_LINKS.GITHUB,
      icon: Github,
      label: 'Github',
    },
    {
      href: SOCIAL_LINKS.BLUESKY,
      icon: BlueSky,
      label: 'Blue Sky',
    },
    {
      href: SOCIAL_LINKS.INSTAGRAM,
      icon: Instagram,
      label: 'Instagram',
    },
  ];

  return (
    <ul className="flex flex-row items-center gap-3">
      {links.map(({ href, icon: Icon, label }) => (
        <li key={label} className="w-4 h-5 cursor-pointer">
          <a href={href} className="text-primary dark:text-white cursor-pointer opacity-100 transition-opacity hover:opacity-50" aria-label={label}>
            <Icon width={20} height={20} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
