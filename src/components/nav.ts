import type { Route } from "../types";

export function renderNav(routes: Route[]): string {
  const links = routes
    .map(
      (r) => `
      <li class="flex-1">
      
      <a href="${r.path === "/" ? "/" : r.path}"
        data-navigo
        class="nav-link flex justify-center items-center py-3 text-[11px] font-mono whitespace-nowrap
               text-[var(--muted)] border-b-2 border-transparent
               hover:text-[var(--text)] hover:border-[var(--accent)]
               transition-colors duration-150"
      >${r.label}</a>
    </li>`,
    )
    .join("");

  return `
    <nav class="sticky top-0 z-50 border-b border-[var(--border)]"
       style="background: var(--nav-bg); backdrop-filter: blur(12px);">
    <div class="max-w-5xl mx-auto px-4">
      <ul class="flex w-full list-none m-0 p-0">
        ${links}
      </ul>
    </div>
  </nav>`;
}

export function setActiveNavLink(path: string): void {
  document.querySelectorAll(".nav-link").forEach((el) => {
    const href = el.getAttribute("href") ?? "";
    const active = href === `#${path}` || href === `#/${path}`;
    el.classList.toggle("text-[var(--text)]", active);
    el.classList.toggle("border-[var(--accent)]", active);
    el.classList.toggle("text-[var(--muted)]", !active);
    el.classList.toggle("border-transparent", !active);
  });
}
