import React from 'react';

import { Square } from '@components';

const ContactIntro = () => {
  return (
    <section className="half-bg text-primary dark:text-white  overflow-hidden">
      <div className="max-w-screen-lg mx-auto flex flex-row justify-items-center  justify-between items-center">
        <Square title="Designer" crop />
        <Square title="Frontend Developer" code delay={1} />
        <Square title="Illustrator" pen delay={2} />
      </div>
    </section>
  );
};

export default ContactIntro;
