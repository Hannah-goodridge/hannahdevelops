/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { NationalTrust, HRP, Orange, UNHCR, RoyalNavy, AstonVilla, MOD, SpiraxSarco, VersusArthritis, UWE, Mercer, StandardLife } from '@components';


const LogoBlock = () => {
  return (
    <section className="dark:bg-primary bg-white overflow-hidden py-24 px-4 xl:px-0">
      <h2 className="text-2xl anim-slide-in-bottom lg:text-4xl font-medium leading-tight mb-6 text-primary dark:text-white text-center pt-12">
        Companies I've Collaborated With:
      </h2>
      <div className="max-w-xl lg:max-w-screen-lg  mx-auto flex flex-row flex-wrap justify-evenly items-center py-6 md:py-12 text-highlight opacity-75 anim-slide-in-bottom anim-delay-2">
        <Mercer />
        <MOD />
        <UNHCR />
        <NationalTrust />
        <StandardLife />
        <RoyalNavy />
        <UWE />
        <AstonVilla />
        <SpiraxSarco />
        <Orange />
        <VersusArthritis />
        <HRP />
      </div>
    </section>
  );
};

export default LogoBlock;
