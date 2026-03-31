"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("agent-dmv-theme", nextDark ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="focus-ring rounded-lg border px-3 py-2 text-sm font-medium transition hover:opacity-90"
      style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
