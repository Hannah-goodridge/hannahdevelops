import React from 'react';

import { Square } from '@components';

const ContactIntro = () => {
  return (
    <section className="half-bg text-primary dark:text-white  overflow-hidden">
      <div className="max-w-screen-lg mx-auto flex flex-row justify-items-center  justify-between items-center">
        <Square title="Designer" crop code={false} pen={false} delay={0} />
        <Square title="Frontend Developer" crop={false} code pen={false} delay={1} />
        <Square title="Illustrator" crop={false} code={false} pen delay={2} />
      </div>
    </section>
  );
};

export default ContactIntro;
