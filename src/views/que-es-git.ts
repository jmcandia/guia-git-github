import { sectionHeader, callout, card } from "../components/ui";

export function render(): string {
  const cards = [
    {
      icon: "🕐",
      title: "Historial completo",
      desc: "Cada cambio queda registrado. Puedes volver a cualquier versión anterior del proyecto en cualquier momento.",
    },
    {
      icon: "👥",
      title: "Trabajo en equipo",
      desc: "Varias personas trabajan en el mismo proyecto simultáneamente sin pisarse los cambios.",
    },
    {
      icon: "🌿",
      title: "Ramas paralelas",
      desc: "Desarrolla nuevas funcionalidades de forma aislada, sin tocar el código que ya funciona.",
    },
    {
      icon: "🌐",
      title: "Distribuido",
      desc: "Cada desarrollador tiene una copia completa del repositorio. No hay un único punto de falla.",
    },
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("01 · Fundamentos", "¿Qué es Git y para qué sirve?")}

      <p class="text-[var(--text)] mb-8 leading-relaxed">
        Git es un <strong>sistema de control de versiones distribuido</strong>. Guarda el historial
        completo de todos los cambios que haces en tu código. Si algo deja de funcionar, puedes volver
        atrás. Si alguien del equipo rompe algo, puedes ver exactamente qué cambió.
      </p>

      ${callout("info", "💡 Dato clave", "Git fue creado en 2005 por <strong>Linus Torvalds</strong> (el creador de Linux) para gestionar el desarrollo del kernel. Hoy, prácticamente toda la industria del software lo usa.")}

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        ${cards.map((c) => card(c.icon, c.title, c.desc)).join("")}
      </div>

      <h3 class="font-display text-2xl font-bold text-[var(--text)] mt-12 mb-4">
        Git vs GitHub, ¿son lo mismo?
      </h3>

      <p class="text-[var(--text)] mb-6 leading-relaxed">
        <strong>No, son cosas distintas pero complementarias:</strong>
      </p>

      <div class="grid sm:grid-cols-2 gap-4 mb-8">
        <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-6">
          <div class="font-mono text-xs text-[var(--accent3)] uppercase tracking-widest mb-3">Git</div>
          <p class="font-mono text-xl font-bold text-[var(--text)] mb-2">🛠 La herramienta</p>
          <p class="text-sm text-[var(--muted)] leading-relaxed">
            Corre en tu computador. Gestiona el historial, las ramas y los commits de forma local.
            Puedes usar Git sin internet.
          </p>
        </div>
        <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-6">
          <div class="font-mono text-xs text-[var(--accent2)] uppercase tracking-widest mb-3">GitHub</div>
          <p class="font-mono text-xl font-bold text-[var(--text)] mb-2">☁️ La plataforma</p>
          <p class="text-sm text-[var(--muted)] leading-relaxed">
            Servicio web donde subes y compartes tus repositorios. Agrega colaboración, Pull Requests,
            Issues y Actions sobre Git.
          </p>
        </div>
      </div>

      ${callout("tip", "✅ Alternativas a GitHub", "Existen <strong>GitLab</strong> y <strong>Bitbucket</strong>. Todas funcionan con Git, así que si aprendes Git + GitHub puedes adaptarte a cualquiera de ellas.")}
    </div>`;
}
