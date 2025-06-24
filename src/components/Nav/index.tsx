'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { ThemeToggle } from '@components';
import NavItem from './navItem';
import Logo from '../icons/Logo';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/playground', label: 'Playground', new: true },
  ];
  const nav = useRef<HTMLElement | null>(null);

  const [scrollInfo, setScrollInfo] = useState({
    color: 'text-primary dark:text-white',
    isScrollDown: false,
  });

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = currentScrollY / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);

    setScrollInfo(prev => ({
      ...prev,
      isScrollDown: scrollPercentRounded > 2,
      color:
        scrollPercentRounded <= 25
          ? 'text-primary dark:text-white'
          : scrollPercentRounded <= 50
          ? 'text-peach'
          : scrollPercentRounded <= 75
          ? 'text-yellow'
          : 'text-highlight',
    }));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        ref={nav}
        className={`text-primary dark:text-white w-full fixed pt-2 pb-4 top-0 flex flex-row transition-all ${
          scrollInfo.isScrollDown ? 'dark:bg-secondary opacity-90 bg-white h-24 z-30' : 'h-auto z-10'
        }`}
      >
        <div className="w-full max-w-(--breakpoint-xl) mx-auto flex flex-row justify-between items-start lg:items-center flex-end relative px-4 xl:px-0 h-14 md:h-auto z-10">
          <ul className="absolute lg:static">
            <li>
              <Link className={`${scrollInfo.color} transition duration-500 ease-in-out  lg:z-10`} href="/">
                <span className="hidden">Home</span>
                <Logo className={`w-16 transition-all ${scrollInfo.isScrollDown ? 'lg:w-16' : 'lg:w-20'}`} width={64} height={64} />
              </Link>
            </li>
          </ul>
          <ul className="hidden lg:flex lg:flex-end lg:flex-row lg:justify-end lg:items-center">
            {links.map(link => (
              <NavItem key={link.to} href={link.to} text={link.label} new={!!link.new} scrollDown={scrollInfo.isScrollDown} />
            ))}
            <li className="xs:p-6 lg:p-0 flex items-center justify-center">
              <ThemeToggle scrollDown={scrollInfo.isScrollDown} />
            </li>
          </ul>
        </div>
      </nav>

      <nav
        className={`${
          isMenuOpen ? ' opacity-100 visible' : 'opacity-50 invisible'
        }  fixed h-screen flex top-0 right-0 bottom-0 dark:bg-primary drop-shadow-2xl bg-white w-80  transform transition-all duration-700 ease-in-out lg:hidden lg:transform-none z-30`}
        style={{ transform: `translateX(${isMenuOpen ? '0%' : '100%'})` }}
      >
        <ul className="pt-16 pb-3 space-y-1 w-full flex flex-col justify-start items-center">
          <div className="top-7 left-4 absolute">
            <ThemeToggle scrollDown={scrollInfo.isScrollDown} />
          </div>
          <div className="top-7 right-4 absolute">
          <button
            type="button"
            className={`${isMenuOpen ? 'isActive ' : ''} w-8 h-8  rounded-md lg:hidden fixed top-5 right-5 m-0 nav-trigger z-10`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen ? 'true' : 'false'}
          >
            <p className="hidden">mobile menu</p>
            <span />
            <span />
            <span />
          </button>
          </div>
          {links.map(link => (
            <Link
              key={link.to}
              href={link.to}
              className="block  relative pl-3 pr-4 py-2 font-medium text-highlight text-4xl rounded-md transition-all duration-300 ease-in-out anim-underline anim-underline-highlight "
              // activeClassName="!static-gradient-underline"
              onClick={toggleMenu}
            >
              {link.label}

            </Link>
          ))}
        </ul>
      </nav>
      <button
        type="button"
        className={`${isMenuOpen ? 'isActive ' : ''} w-8 h-8  rounded-md lg:hidden fixed top-5 right-5 m-0 nav-trigger z-30`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen ? 'true' : 'false'}
      >
        <p className="hidden">mobile menu</p>
        <span />
        <span />
        <span />
      </button>
    </>
  );
};

export default Nav;
