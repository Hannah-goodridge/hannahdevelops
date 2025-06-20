import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import PageWrapper from '@components/PageWrapper';

const PRIVACY_PATH = path.join(process.cwd(), 'src/posts/privacy-policy.mdx');

function getPrivacyContent() {
  const fileContents = fs.readFileSync(PRIVACY_PATH, 'utf8');
  const { data, content } = matter(fileContents);
  return { frontmatter: data, body: content };
}

export default function PrivacyPage() {
  const { frontmatter, body } = getPrivacyContent();
  const { title } = frontmatter;
  return (

      <div className="anim-triggered">
        <section className="dark:bg-primary text-primary dark:text-white bg-white lg:min-h-full pt-12 py-12 lg:py-32 px-4 xl:px-0">
          <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between pt-12 lg:pt-32 xl:px-0 px-4 relative">
            <div className="w-full mt-16 lg:w-3/5 lg:mt-0 overflow-hidden ">
            <h1 className="text-2xl anim-slide-in-bottom anim-delay-1 lg:text-4xl font-medium leading-tight mb-6 text-highlight">
              {title}
            </h1>
              <div className="anim-slide-in-bottom anim-delay-2">
                <article className="richtext">
                  <ReactMarkdown>{body}</ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        </section>
      </div>

  );
}