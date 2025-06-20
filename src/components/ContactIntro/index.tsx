import React from 'react';
import Link from 'next/link';
import Arr from '@svgs/chevron-right.svg';
import { H2, Button } from '@components';

const ContactIntro = () => {
  const startDate = new Date('November 25, 2012, 00:00:00');
  const year = startDate.getFullYear();
  const currentDate = new Date().getFullYear();
  const experienceInYears = currentDate - year;

  return (
    <section className="dark:bg-secondary bg-white text-primary dark:text-white lg:h-screen lg:min-h-screen pt-6 px-4 lg:pt-32 xl:px-0 ">
      <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between pt-16 xl:px-0 px-4">
        <div className="w-full mt-16 lg:w-1/3 lg:mt-0 overflow-hidden">
          <p className="text-md font-serif font-medium tracking-wide opacity-50 mb-6 anim-slide-in-bottom">– Contact</p>
          <H2 text="Fancy a chat?" />
          <p className="text-md font-serif opacity-75 leading-loose max-w-2xl anim-slide-in-bottom anim-delay-3">
            Whether its a new collaboration project, some new work or just to say hello I&apos;m always happy to hear from you.
          </p>
          <Button
            href="mailto:%68%61%6e%6e%61%68%67%6f%6f%64%72%69%64%67%65%40%6f%75%74%6c%6f%6f%6b%2e%63%6f%6d?subject=Mail to Hannah"
            variant="primary"
          >
            Get in contact

          </Button>
        </div>
        <div className="w-full lg:w-1/2 mt-24 lg:mt-0 overflow-hidden">
          <H2 text="Creativity doesn't wait for that perfect moment. It fashions its own perfect moments out of ordinary ones." />
          <p className="text-md font-serif opacity-75 leading-loose max-w-md anim-slide-in-bottom anim-delay-3">
            I have plenty of experience working with a variety of clients, I&apos;m currently working for &nbsp;
            <a className="font-bold underline anim-slide-in-bottom anim-delay-3" href="https://www.moneyhub.com/home">
              MoneyHub
            </a>
            , a fintech based in Bristol. Previously I&apos;ve worked with some big names like, The Ministry of Defence, The Royal Navy,
            Orange and The National Trust whilst working for a number of Bristol based agencies.
          </p>
          <Button
            variant="primary"
            href="/about"
          >
           My Story

          </Button>
          <p className="flex flex-row md:items-end pt-8 pb-10 lg:pb-0 items-start flex-start anim-slide-in-left anim-delay-4">
            <span className="text-4xl md:text-6xl font-bold text-highlight mr-4">{experienceInYears}</span>

            <small className=" mb-6 w-24 text-primary dark:text-white font-serif text-md font-bold">Years of Experience.</small>
            <span className="text-4xl md:text-6xl font-bold text-highlight ml-12 mr-4"> 20+</span>

            <small className=" mb-6 w-24 text-primary dark:text-white font-serif text-md font-bold">Satisfied Clients</small>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactIntro;
