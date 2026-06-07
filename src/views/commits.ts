import { sectionHeader, codeBlock, callout, extLink } from "../components/ui";

export function render(): string {
  const types = [
    {
      type: "feat",
      desc: "Nueva funcionalidad. Incremento de versión menor (1.0 → 1.1).",
      color: "var(--accent2)",
    },
    {
      type: "fix",
      desc: "Corrección de bug. Incremento de patch (1.0.0 → 1.0.1).",
      color: "var(--accent3)",
    },
    {
      type: "docs",
      desc: "Cambios solo en documentación: README, comentarios, wikis.",
      color: "var(--accent4)",
    },
    {
      type: "style",
      desc: "Formato/estilo que no afecta lógica: espacios, punto y coma.",
      color: "var(--accent5)",
    },
    {
      type: "refactor",
      desc: "Reestructurar código sin cambiar comportamiento.",
      color: "var(--yellow)",
    },
    {
      type: "test",
      desc: "Agregar o modificar pruebas unitarias o de integración.",
      color: "var(--muted)",
    },
    {
      type: "chore",
      desc: "Actualizar dependencias, configurar herramientas, CI/CD.",
      color: "var(--muted)",
    },
    {
      type: "perf",
      desc: "Cambios que mejoran el rendimiento de la aplicación.",
      color: "var(--accent)",
    },
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("06 · Conventional Commits", "Escribir commits que tengan sentido")}

      <p class="text-lg text-[var(--muted)] mb-4 leading-relaxed">
        ¿Has visto repositorios con mensajes de commit como "fix", "cambios", "arreglo final final 2"?
        Eso hace imposible entender el historial. Conventional Commits es el estándar de la industria.
      </p>

      ${callout("info", "🔗 Recurso oficial", `La especificación completa está en ${extLink("https://www.conventionalcommits.org/es/v1.0.0/", "conventionalcommits.org")} — disponible en español.`)}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-4">La estructura</h3>

      <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-6 mb-8 font-mono text-sm leading-loose">
        <span style="color:var(--accent)" class="font-bold">tipo</span><span class="text-[var(--muted)]">(</span><span style="color:var(--accent4)">alcance</span><span class="text-[var(--muted)]">): </span><span style="color:var(--accent3)">descripción corta</span>
        <br><br>
        <span class="text-[var(--muted)] text-xs italic">[cuerpo opcional: explica el QUÉ y el POR QUÉ]</span>
        <br>
        <span class="text-[var(--muted)] text-xs italic">[footer opcional: BREAKING CHANGE, closes #123]</span>
      </div>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mb-5">Tipos de commits</h3>
      <div class="grid sm:grid-cols-2 gap-3 mb-10">
        ${types
          .map(
            (t) => `
          <div class="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg2)] p-4">
            <code class="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style="color:${t.color}; background:${t.color}18; border: 1px solid ${t.color}40">
              ${t.type}
            </code>
            <p class="text-sm text-[var(--muted)] m-0 leading-relaxed">${t.desc}</p>
          </div>`,
          )
          .join("")}
      </div>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mb-4">Ejemplos reales</h3>
      ${codeBlock(
        "commits · ejemplos",
        `<span class="sc"># Feat simple</span>
<span class="sa">feat</span>: agrega formulario de registro de usuarios

<span class="sc"># Feat con alcance</span>
<span class="sa">feat</span>(<span class="sk">auth</span>): implementa login con Google OAuth

<span class="sc"># Fix con referencia a issue</span>
<span class="sa">fix</span>(<span class="sk">api</span>): corrige error 500 al crear usuario duplicado

<span class="sc">Closes #42</span>

<span class="sc"># Breaking change (el ! indica que rompe compatibilidad)</span>
<span class="sa">feat</span>(<span class="sk">api</span>)!: cambia endpoint de /users a /api/v2/users

<span class="sc">BREAKING CHANGE: el endpoint anterior queda obsoleto.</span>`,
      )}

      <div class="grid sm:grid-cols-3 gap-4 mt-10">
        ${[
          {
            icon: "📖",
            title: "Historial legible",
            desc: "Cualquiera puede entender qué pasó en el proyecto con solo leer el historial de commits.",
          },
          {
            icon: "🤖",
            title: "Automatización",
            desc: "Herramientas como semantic-release generan versiones y changelogs automáticamente.",
          },
          {
            icon: "🔍",
            title: "Facilita revisión",
            desc: "En los Pull Requests es más fácil revisar código cuando los commits son descriptivos.",
          },
        ]
          .map(
            (b) => `
          <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-5">
            <div class="text-2xl mb-3">${b.icon}</div>
            <h4 class="font-mono text-sm font-semibold text-[var(--text)] mb-1">${b.title}</h4>
            <p class="text-sm text-[var(--muted)] m-0">${b.desc}</p>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}
