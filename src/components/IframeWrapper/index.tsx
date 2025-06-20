import React from 'react';

interface IframeWrapperProps {
  src: string;
  title?: string;
  height?: string;
}

const IframeWrapper: React.FC<IframeWrapperProps> = ({ src, title, height }) => {
  return <iframe allowFullScreen className="pb-4" width="100%" height={height || '500px'} src={src} title={title} />;
};

export default IframeWrapper;