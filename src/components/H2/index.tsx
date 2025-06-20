import React from 'react';

interface IH2Props {
  text: string;
}

const H2 = ({ text }: IH2Props) => {
  return (
    <h2 className="text-2xl anim-slide-in-bottom anim-delay-2 lg:text-4xl font-medium leading-tight mb-6 text-primary dark:text-white ">
      {text}
    </h2>
  );
};

export default H2;
