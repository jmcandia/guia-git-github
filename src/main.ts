import "./style.css";
import { initTheme, toggleTheme, syncToggleIcon } from "./components/theme";
import { renderNav } from "./components/nav";
import { initRouter, routes } from "./router";

// 1. Tema — antes de pintar nada para evitar flash
initTheme();

// 2. Shell de la app
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${renderNav(routes)}
  <main id="app-view" class="min-h-screen"></main>
  <button
    id="theme-toggle"
    class="fixed bottom-7 right-7 z-50 w-11 h-11 rounded-full
           flex items-center justify-center text-xl
           border border-[var(--border)] bg-[var(--bg2)]
           hover:border-[var(--accent)] hover:scale-110
           transition-all duration-150 cursor-pointer shadow-lg"
    aria-label="Cambiar tema"
  >🌙</button>
`;

// 3. Toggle de tema
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  toggleTheme();
  syncToggleIcon();
});

// 4. Router
initRouter();
