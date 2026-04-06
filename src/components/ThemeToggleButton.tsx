"use client";

import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='shadow-2xl'>
    <button onClick={toggleTheme} className="ml-2 px-2 py-2 rounded-full bg-gray-300 dark:bg-gray-800 border-opacity-50 border-gray-700">
      {theme === 'light' ? <Moon color="#000000" className="w-5 h-5" /> : <Sun color="#ffffff" className="w-5 h-5" />}
    </button>
    </div>
  );
};

export default ThemeToggleButton;