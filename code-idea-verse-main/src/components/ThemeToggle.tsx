import React, { useEffect } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = React.useState(true); // Initialize to true for dark mode

  React.useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Force dark mode on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDark(true); // Set the toggle state to match dark mode
    }
  }, []);

  return (
    <div className={`relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 p-1 transition-colors duration-300 dark:bg-gray-700 ${className}`}>
      <button
        type="button"
        aria-pressed="false"
        className={`${
          dark ? "translate-x-8" : "translate-x-0"
        } inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 dark:bg-purple-500`}
        onClick={() => setDark(!dark)}
      >
        {dark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
