'use client'
import React from 'react';
import { useInView } from 'react-intersection-observer';

const ViewPortSensor = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`${inView ? 'anim-triggered' : 'anim-ready'}`}>
      {children}
    </div>
  );
};

export default ViewPortSensor;
