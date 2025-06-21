'use client'
import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface ViewPortSensorProps {
  children: ReactNode;
}

const ViewPortSensor = ({ children }: ViewPortSensorProps) => {
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
