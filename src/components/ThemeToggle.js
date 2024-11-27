'use client';
import { useGlobal } from "../context/Global";

export default function ThemeToggle() {
  const { toggleTheme } = useGlobal();

  return (
    <button
      onClick={toggleTheme}
      className="absolute bottom-4 right-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
    >
       💡
    </button>
  );
}
