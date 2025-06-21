import React from 'react';
import {
  ContactIntro,
  HomepageIntro,
  ViewPortSensor,
  ColourSquares,
  LogoBlock,
  FeaturedBlog,
} from '@components/index';
import { getFeaturedPosts } from '../lib/posts';

export const metadata = {
  title: "Hannah Goodridge - Frontend Developer & Designer",
  description: "Portfolio and blog of Hannah Goodridge, frontend developer and designer based in Bristol.",
};

export default function Home() {
  const posts = getFeaturedPosts();
  return (
    <>
      <ViewPortSensor>
        <HomepageIntro />
      </ViewPortSensor>
      <ViewPortSensor>
        <ContactIntro />
      </ViewPortSensor>
      <ViewPortSensor>
        <ColourSquares />
      </ViewPortSensor>
      <ViewPortSensor>
        <LogoBlock />
      </ViewPortSensor>
      <ViewPortSensor>
        <FeaturedBlog posts={posts} />
      </ViewPortSensor>
    </>
  );
}
