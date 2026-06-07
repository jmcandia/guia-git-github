import type { Theme } from "../types";

const STORAGE_KEY = "guia-git-theme";
const html = document.documentElement;

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function initTheme(): void {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  applyTheme(saved ?? getSystemTheme());

  // Escucha cambios del sistema (cuando no hay preferencia guardada)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
        syncToggleIcon();
      }
    });
}

export function applyTheme(theme: Theme): void {
  html.setAttribute("data-theme", theme);
}

export function toggleTheme(): void {
  const current = html.getAttribute("data-theme") as Theme;
  const next: Theme = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(STORAGE_KEY, next);
  syncToggleIcon();
}

export function getCurrentTheme(): Theme {
  return (html.getAttribute("data-theme") as Theme) ?? "light";
}

export function syncToggleIcon(): void {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = getCurrentTheme() === "dark" ? "☀️" : "🌙";
}
