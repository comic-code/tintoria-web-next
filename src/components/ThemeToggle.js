'use client';
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="absolute bottom-4 right-4 p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
    >
      {/* {theme === "light" ? "Modo Escuro" : "Modo Claro"}*/}
       💡
    </button>
  );
}
