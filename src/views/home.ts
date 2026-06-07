export function render(): string {
  return `
    <div class="relative overflow-hidden">

      <!-- Glow de fondo -->
      <div class="pointer-events-none absolute inset-0 flex justify-center">
        <div class="w-[600px] h-[400px] rounded-full opacity-60 blur-3xl -mt-20"
             style="background: radial-gradient(ellipse, var(--hero-glow) 0%, transparent 70%)">
        </div>
      </div>

      <!-- Hero -->
      <section class="relative max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">

        <div class="inline-block font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-1.5
                    rounded-full border mb-8"
             style="color:var(--accent); border-color:var(--accent); background:color-mix(in srgb, var(--accent) 10%, transparent)">
          Guía completa
        </div>

        <h1 class="font-display font-extrabold tracking-tight leading-[1.05] mb-6"
            style="font-size: clamp(3rem, 8vw, 5.5rem)">
          Git &amp; <span style="color:var(--accent)">GitHub</span><br>desde cero
        </h1>

        <p class="text-lg max-w-xl mx-auto mb-12 leading-relaxed" style="color:var(--muted)">
          Todo lo que necesitas para manejar versiones de tu código como un profesional,
          desde los primeros comandos hasta estrategias de branching usadas en la industria.
        </p>

        <!-- CTA -->
        <a href="#/que-es-git" data-navigo
           class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-sm font-semibold
                  text-white transition-all duration-150 hover:scale-105 hover:opacity-90"
           style="background:var(--accent)">
          Empezar →
        </a>
      </section>

      <!-- Separador -->
      <div class="border-t max-w-5xl mx-auto" style="border-color:var(--border)"></div>

      <!-- Cards resumen -->
      <section class="max-w-5xl mx-auto px-4 py-16">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${[
            {
              num: "01",
              label: "¿Qué es Git?",
              href: "#/que-es-git",
              desc: "Qué es, para qué sirve y cómo se diferencia de GitHub.",
            },
            {
              num: "02",
              label: "Instalación",
              href: "#/install",
              desc: "Instalar Git en Windows, macOS y Linux, y configurar tu identidad.",
            },
            {
              num: "03",
              label: "Conceptos base",
              href: "#/conceptos",
              desc: "Las tres zonas, commits, ramas y el vocabulario esencial.",
            },
            {
              num: "04",
              label: "Comandos",
              href: "#/comandos",
              desc: "Los comandos del día a día: add, commit, push, merge y más.",
            },
            {
              num: "05",
              label: "GitHub",
              href: "#/github",
              desc: "Pull Requests, .gitignore y el flujo de trabajo en equipo.",
            },
            {
              num: "06",
              label: "Conventional Commits",
              href: "#/commits",
              desc: "Estándar de mensajes de commit que toda la industria usa.",
            },
            {
              num: "07",
              label: "Gitmoji",
              href: "#/gitmoji",
              desc: "Emojis con significado para identificar commits de un vistazo.",
            },
            {
              num: "08",
              label: "Branching",
              href: "#/branching",
              desc: "Git Flow, GitHub Flow y Trunk-Based: cuándo usar cada uno.",
            },
            {
              num: "09",
              label: "Cheatsheet",
              href: "#/cheatsheet",
              desc: "Referencia rápida de todos los comandos organizada por categoría.",
            },
          ]
            .map(
              (c) => `
            <a href="${c.href}" data-navigo
               class="group rounded-xl border p-5 transition-all duration-150
                      hover:border-[var(--accent)] hover:-translate-y-0.5"
               style="border-color:var(--border); background:var(--bg2)">
              <div class="font-mono text-[10px] tracking-widest uppercase mb-3"
                   style="color:var(--accent)">§ ${c.num}</div>
              <h3 class="font-mono text-sm font-semibold mb-2 text-[var(--text)]
                         group-hover:text-[var(--accent)] transition-colors">
                ${c.label}
              </h3>
              <p class="text-xs leading-relaxed m-0" style="color:var(--muted)">${c.desc}</p>
            </a>`,
            )
            .join("")}
        </div>
      </section>

    </div>`;
}
