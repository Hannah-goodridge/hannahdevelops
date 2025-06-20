import React from 'react';

const PawPrint: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={20}
    height={20}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="4.5" cy="9.5" r="2.5" />
    <circle cx="19.5" cy="9.5" r="2.5" />
    <circle cx="9" cy="5.5" r="2.5" />
    <circle cx="15" cy="5.5" r="2.5" />
    <ellipse cx="12" cy="17" rx="5" ry="7" />
  </svg>
);

export default PawPrint;