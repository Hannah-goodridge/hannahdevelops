import React from 'react';

import PlaygroundBlock from '@components/Playground';
import { getPlaygroundPosts } from '../../lib/posts';

export const metadata = {
    title: "Playground - Hannah Goodridge",
    description: "A collection of frontend development experiments and code snippets by Hannah Goodridge.",
};

const Playground = () => {
    const posts = getPlaygroundPosts();
  return (
      <PlaygroundBlock posts={posts} />
  );
};

export default Playground;