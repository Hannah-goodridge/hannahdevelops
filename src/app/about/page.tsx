import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Button from '@components/Button';

import ME_IMAGE from '@assets/images/me.jpg';

const ABOUT_PATH = path.join(process.cwd(), 'src/posts/about.mdx');

export const metadata = {
  title: "About Hannah Goodridge - Frontend Developer",
  description: "Learn more about Hannah Goodridge, a frontend developer based in Bristol, UK, her career, and her interests.",
};

function getAboutContent() {
  const fileContents = fs.readFileSync(ABOUT_PATH, 'utf8');
  const { data, content } = matter(fileContents);
  return { frontmatter: data, body: content };
}

export default function AboutPage() {
  const { body } = getAboutContent();

  return (

      <div className="anim-triggered">
        <section className="dark:bg-primary text-primary dark:text-white bg-white lg:min-h-full pt-12 py-12 lg:py-32 px-4 xl:px-0">
          <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between pt-12 lg:pt-32 xl:px-0 px-4 relative gap-4">
            <div className="w-full mt-16 lg:w-3/5 lg:mt-0 ">
              <p className="text-md font-serif font-medium tracking-wide opacity-75 mb-6 anim-slide-in-bottom anim-delay-1">
                – Early beginnings
              </p>
              <div className="anim-slide-in-bottom anim-delay-2">
                <article className="richtext">
                  <ReactMarkdown>{body}</ReactMarkdown>
                </article>
                <Button href="mailto:hannahgoodridge@outlook.com?subject=Mail to Hannah">Get In Touch</Button>
              </div>
            </div>
            <div className="w-full lg:w-1/3 overflow-hidden">
              <div className="lg:w-4/5 ">
                <picture className="w-full ">
                   <Image
                    className="w-full"
                    style={{ height: 'auto' }}
                    src={ME_IMAGE}
                    alt="Hannah Goodridge"
                  />
                </picture>
              </div>
              <hr className="w-32 h-1 bg-gradient-right border-none mt-6 ml-1 anim-slide-in-left anim-delay-3" />
            </div>
          </div>
        </section>
      </div>

  );
}