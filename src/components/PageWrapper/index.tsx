'use client';
import React, { ReactNode, useEffect } from 'react';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';
import { Header, Footer } from '@components';

interface IPageWrapperProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { dark } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(dark ? 'dark' : 'light');
  }, [dark]);

  return <>{children}</>;
}

const PageWrapper = ({ children }: IPageWrapperProps) => {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <div className="w-screen">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default PageWrapper;
