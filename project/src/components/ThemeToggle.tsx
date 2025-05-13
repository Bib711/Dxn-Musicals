import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-white dark:bg-charcoal-800 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-charcoal-900 transition-transform duration-300" />
      ) : (
        <Sun size={20} className="text-white transition-transform duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;