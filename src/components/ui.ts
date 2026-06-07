/* Helpers de UI reutilizables entre vistas */

export const sectionHeader = (num: string, title: string) => `
  <div class="mb-8">
    <p class="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--accent)] mb-2">${num}</p>
    <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">${title}</h2>
    <div class="mt-3 h-px w-16 bg-[var(--accent)]"></div>
  </div>`;

export const callout = (
  type: "info" | "tip" | "warn" | "note",
  label: string,
  content: string,
) => `
  <div class="callout callout-${type}">
    <div class="callout-label">${label}</div>
    <p class="text-sm text-[var(--text)] m-0">${content}</p>
  </div>`;

export const codeBlock = (lang: string, content: string) => `
  <div class="rounded-lg overflow-hidden border border-[var(--border)] my-5">
    <div class="flex items-center justify-between px-4 py-2 bg-[var(--bg3)] border-b border-[var(--border)]">
      <div class="flex gap-1.5">
        <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
        <span class="w-3 h-3 rounded-full bg-[#febc2e]"></span>
        <span class="w-3 h-3 rounded-full bg-[#28c840]"></span>
      </div>
      <span class="font-mono text-[11px] text-[var(--muted)]">${lang}</span>
      <button
        class="copy-btn font-mono text-[11px] text-[var(--muted)] hover:text-[var(--text)]
               transition-colors duration-150 cursor-pointer"
        data-code="${encodeURIComponent(content)}"
      >copiar</button>
    </div>
    <pre class="m-0 rounded-none border-0"><code>${content}</code></pre>
  </div>`;

export const card = (
  icon: string,
  title: string,
  desc: string,
  _accent = "var(--accent)",
) => `
  <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-5
              hover:border-[var(--accent)] transition-colors duration-200 group">
    <div class="text-2xl mb-3">${icon}</div>
    <h4 class="font-mono text-sm font-semibold text-[var(--text)] mb-1">${title}</h4>
    <p class="text-sm text-[var(--muted)] m-0 leading-relaxed">${desc}</p>
  </div>`;

export const badge = (text: string, color: string) => `
  <span class="inline-block font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full
               border" style="color:${color}; border-color:${color}; background:${color}20">${text}</span>`;

export const stepList = (steps: { title: string; desc: string }[]) => `
  <ol class="relative space-y-6 list-none m-0 p-0">
    ${steps
      .map(
        (s, i) => `
      <li class="flex gap-4 relative">
        ${i < steps.length - 1 ? `<div class="absolute left-[19px] top-10 bottom-0 w-px bg-[var(--border)]"></div>` : ""}
        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--bg3)] border border-[var(--border)]
                    flex items-center justify-center font-mono text-sm font-semibold text-[var(--accent)]">
          ${i + 1}
        </div>
        <div class="pt-1.5">
          <h4 class="font-semibold text-[var(--text)] text-sm mb-0.5">${s.title}</h4>
          <p class="text-sm text-[var(--muted)] m-0">${s.desc}</p>
        </div>
      </li>`,
      )
      .join("")}
  </ol>`;

export const extLink = (href: string, label: string) =>
  `<a href="${href}" target="_blank" rel="noopener"
      class="text-[var(--accent2)] border-b border-[var(--accent2)]/30
             hover:border-[var(--accent2)] transition-colors">${label}</a>`;

export function initCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      // Sube al bloque y extrae el texto plano del <code>, sin HTML
      const pre = btn.closest(".rounded-lg")?.querySelector("code");
      if (!pre) return;

      const text = pre.innerText;

      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "✓ copiado";
        setTimeout(() => (btn.textContent = "copiar"), 2000);
      } catch {
        btn.textContent = "error";
        setTimeout(() => (btn.textContent = "copiar"), 2000);
      }
    });
  });
}
