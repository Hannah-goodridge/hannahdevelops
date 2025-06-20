import React from 'react';

const slugify = (text: string) => {
  if (!text) return '';
  return text.toString().toLowerCase().replace(/\s+/g, '-');
};

const LinkableTitle: React.FC<any> = (props) => {
  const text = (props.children && typeof props.children === 'string') ? props.children : '';
  const slug = slugify(text);

  return (
    <h2 className="text-2xl lg:text-4xl font-medium leading-tight mb-6 text-primary dark:text-white" id={slug} {...props}>
      <a href={`#${slug}`}>{props.children}</a>
    </h2>
  );
};

export default LinkableTitle;