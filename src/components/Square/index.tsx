import React from 'react';

import { Code, Pen, Crop } from '@components';

interface Props {
  crop: boolean;
  code: boolean;
  pen: boolean;
  title: string;
  delay: number;
}

const Square = ({ crop, code, pen, title, delay }: Props) => {
  const cssDelayClass = delay ? `anim-delay-${delay}` : '';
  return (
    <div
      className={`bg-gradient-border rounded-xl w-1/3 flex-grow anim-slide-in-bottom m-4 aspect-square ${cssDelayClass}`}
    >
      <div className="bg-highlight hover:bg-tertiary dark:bg-tertiary dark:hover:bg-highlight hover:text-primary dark:text-white transition duration-300 ease-in-out flex items-center md:items-end p-2 md:p-8 h-full rounded-lg">
        <div className="flex flex-row md:flex-row items-start w-full">
          {crop && <Crop className="w-full md:w-1/3" />}
          {code && <Code className="w-full md:w-1/3" />}
          {pen && <Pen className="w-full md:w-1/3" />}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h3 className="text-lg md:text-2xl font-bold leading-6 md:leading-8">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Square;
