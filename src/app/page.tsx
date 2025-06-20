import React from 'react';
import PageWrapper from '@components/PageWrapper';
import {
  ContactIntro,
  HomepageIntro,
  ViewPortSensor,
  ColourSquares,
  LogoBlock,
  FeaturedBlog,
} from '@components';
import { getFeaturedPosts, getSortedPostsData } from '../lib/posts';

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
