import React from 'react';

const ChevronRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.29 6.71a1 1 0 0 1 1.42 0l4 4a1 1 0 0 1 0 1.42l-4 4a1 1 0 1 1-1.42-1.42L12.59 12l-3.3-3.29a1 1 0 0 1 0-1.42z" />
  </svg>
);

export default ChevronRight;