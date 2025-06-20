'use client';
import React from 'react';
import { H2, Button } from '..';
import Link from 'next/link';
import LinkedIn from '../icons/LinkedIn';
import Github from '../icons/Github';
import BlueSky from '../icons/BlueSky';
import Instagram from '../icons/Instagram';
import PawPrint from '../icons/PawPrint';
import HeroBg from '../../assets/images/bg-hero-teal.svg';

export default function HomepageIntro() {
  const scrollToSection = () => {
    const section = document.getElementById('story');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className=" dark:bg-primary text-primary dark:text-white lg:h-screen lg:min-h-full py-32 relative overflow-hidden">
      <HeroBg className="hero-svg-background absolute top-0 left-0 w-screen h-screen object-cover -z-10" />
      <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between pt-12 lg:pt-32 xl:px-0 px-4 relative">
        <div className="w-full lg:w-2/3 ">
          <div className="lg:w-4/5 ">
            <h1 className="text-5xl text-shadow lg:text-8xl font-bold leading-none tracking-tight relative anim-slide-in-bottom">
              <span className="inline-flex">
                {'Hannah'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ${
                      index % 3 === 0 ? 'hover:scale-110 hover:text-highlight hover:cursor-pointer' :
                      index % 3 === 1 ? 'hover:scale-125 hover:text-peach hover:rotate-3 hover:cursor-pointer' :
                      'hover:scale-90 hover:text-yellow hover:-rotate-2 hover:cursor-pointer'
                    }`}
                    style={{ transitionDelay: `${index * 10}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <br />
              <span className="inline-block">
                {'Goodridge.'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-300 ${
                      index % 4 === 0 ? 'hover:scale-110 hover:text-highlight hover:cursor-pointer' :
                      index % 4 === 1 ? 'hover:scale-125 hover:text-peach hover:rotate-3 hover:cursor-pointer' :
                      index % 4 === 2 ? 'hover:scale-90 hover:text-yellow hover:-rotate-2 hover:cursor-pointer' :
                      'hover:scale-150 hover:text-highlight hover:rotate-6 hover:cursor-pointer'
                    }`}
                    style={{ transitionDelay: `${index * 10}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>

            </h1>
          </div>
          <hr className="w-32 h-1 bg-gradient-right  border-none mt-6 ml-1 anim-slide-in-left anim-delay-3" />
          <ul className="flex flex-row mt-12 lg:mt-24  anim-slide-in-bottom anim-delay-4">
            <li className="w-4 h-6 mr-4 cursor-pointer">
              <Link
                href="https://www.linkedin.com/in/hannah-goodridge-59512841/"
                className="text-primary dark:text-white cursor-pointer transition-colors hover:text-highlight"
              >
                <span className="hidden">LinkedIn</span>
                <LinkedIn width={20} height={20} />
              </Link>
            </li>
            <li className="w-4 h-6 mx-4 cursor-pointer">
              <Link
                href="https://github.com/Hannah-goodridge"
                className="text-primary dark:text-white cursor-pointer transition-colors hover:text-highlight"
              >
                <span className="hidden">Github</span>
                <Github width={20} height={20} />
              </Link>
            </li>
            <li className="w-4 h-6 mx-4 cursor-pointer">
              <Link
                href="https://bsky.app/profile/hannahdevelops.bsky.social"
                className="text-primary dark:text-white cursor-pointer transition-colors hover:text-highlight"
              >
                <span className="hidden">Blue Sky</span>
                <BlueSky width={20} height={20} />
              </Link>
            </li>
            <li className="w-4 h-6 mx-4 cursor-pointer ">
              <Link
                href="https://www.instagram.com/hannahg00dridge"
                className="text-primary dark:text-white cursor-pointer transition-colors hover:text-highlight"
              >
                <span className="hidden">Instagram</span>
                <Instagram width={20} height={20} />
              </Link>
            </li>
            <li className="w-4 h-6 mx-4 cursor-pointer ">
              <Link href="/cats" className="paw-prints cursor-pointer text-highlight relative">
                <span className="hidden">Secret link to cats</span>
                <PawPrint width={20} height={20} className="paw-print-1" />
                <PawPrint width={12} height={12} className="paw-print-2" />
                <PawPrint width={10} height={10} className="paw-print-3" />
                <PawPrint width={8} height={8} className="paw-print-4" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full mt-16 lg:w-1/3 lg:mt-0">
          <p className="text-md font-display font-medium tracking-wide opacity-75 mb-6 anim-slide-in-bottom anim-delay-1">– Introduction</p>
          <H2 text="Frontend Developer and Designer, based in Bristol." />
          <p className="anim-slide-in-bottom anim-delay-3 text-md tracking-wide font-display opacity-75 leading-loose max-w-2xl">
            I like building things.
          </p>
          <div className="anim-slide-in-bottom anim-delay-4 lg:mt-6">
          <Button href="/about" variant="primary" size="lg">
            My Story
          </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button type="button" className="text-primary dark:text-white appearance-none border-0" onClick={scrollToSection}>
          <div className="border border-highlight rounded-full p-4 mt-24 anim-slide-in-bottom anim-delay-5">
            <svg
              className="animate-bounce w-6 h-6 text-primary dark:text-white "
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="hidden">Scroll down</span>
          </div>
        </button>
      </div>
    </section>
  );
}