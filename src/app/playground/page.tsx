import React from 'react';

import PlaygroundBlock from '@components/Playground';
import { getPlaygroundPosts } from '../../lib/posts';


const Playground = () => {
    const posts = getPlaygroundPosts();
  return (
      <PlaygroundBlock posts={posts} />
  );
};

export default Playground;