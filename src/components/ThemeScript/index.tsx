'use client';

const ThemeScript = () => {
  const script = `
    (function() {
      const storedTheme = localStorage.getItem('dark');
      if (storedTheme !== null) {
        document.documentElement.classList.toggle('dark', JSON.parse(storedTheme));
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default ThemeScript;