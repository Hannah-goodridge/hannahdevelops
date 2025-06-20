import React from 'react';
import Sun from '../icons/Sun';
import Moon from '../icons/Moon';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  scrollDown?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ scrollDown = false }) => {
  const { toggleDark } = useTheme();
  return (
    <button
      type="button"
      className={`p-0 m-0 dark-switcher transition-all top-0 relative z-10 text-white  items-center justify-center ${
        scrollDown ? 'w-4 h-4' : 'w-8 h-8'
      }`}
      onClick={toggleDark}
      name="Toggle theme"
    >
      <span className="hidden">Toggle theme</span>
      <Sun className="sun" width={24} height={24} />
      <Moon className="moon" width={24} height={24} />
    </button>
  );
};

export default ThemeToggle;
