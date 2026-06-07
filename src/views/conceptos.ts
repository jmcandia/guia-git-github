import { sectionHeader, callout, codeBlock } from "../components/ui";

export function render(): string {
  const concepts = [
    {
      term: "Repositorio",
      def: "Carpeta del proyecto con historial completo. La carpeta <code>.git</code> guarda todo ese historial de forma eficiente.",
      color: "var(--accent2)",
    },
    {
      term: "Commit",
      def: 'Una "foto" del proyecto en un momento dado. Tiene hash único, autor, fecha y mensaje descriptivo.',
      color: "var(--accent3)",
    },
    {
      term: "Rama (branch)",
      def: "Línea paralela de desarrollo. Permite trabajar de forma aislada sin afectar el código que ya funciona en <code>main</code>.",
      color: "var(--accent4)",
    },
    {
      term: "Merge",
      def: "Fusionar dos ramas. Integra los cambios de una rama en otra, unificando el trabajo del equipo.",
      color: "var(--yellow)",
    },
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("03 · Conceptos clave", "Los conceptos que necesitas entender")}

      <p class="text-lg text-[var(--muted)] mb-10 leading-relaxed">
        Antes de aprender los comandos, hay que entender el vocabulario. Son pocos conceptos, pero son fundamentales.
      </p>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mb-5">Las tres zonas de Git</h3>
      <p class="text-sm text-[var(--muted)] mb-4">Este es el concepto más importante. En Git, tus archivos pueden estar en tres estados distintos:</p>

      <div class="flex flex-col sm:flex-row gap-0 mb-8 rounded-xl overflow-hidden border border-[var(--border)]">
  ${[
    {
      label: "Working Directory",
      sub: "Tu carpeta de trabajo",
      cmd: "",
      color: "var(--accent)",
    },
    {
      label: "Staging Area",
      sub: "Zona de preparación",
      cmd: "git add",
      color: "var(--yellow)",
    },
    {
      label: "Repository",
      sub: "Historial permanente",
      cmd: "git commit",
      color: "var(--accent3)",
    },
  ]
    .map(
      (z, i) => `
    <div class="flex-1 relative bg-[var(--bg2)] p-5 ${i > 0 ? "sm:pl-10" : ""}"
         style="border-left: ${i > 0 ? "1px solid var(--border)" : "none"}">

      ${
        i > 0
          ? `
        <div class="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10
                    flex-col items-center gap-1">
          <div class="w-10 h-10 rounded-full border border-[var(--border)]
                      flex items-center justify-center text-[10px] font-mono font-bold"
               style="color:${z.color}; background:var(--bg)">→</div>
          <span class="font-mono text-[9px] font-bold" style="color:${z.color}">${z.cmd}</span>
        </div>`
          : ""
      }

      <div class="w-8 h-1 rounded mb-3" style="background:${z.color}"></div>
      <p class="font-mono text-sm font-bold text-[var(--text)] mb-1">${z.label}</p>
      <p class="text-xs text-[var(--muted)]">${z.sub}</p>
    </div>`,
    )
    .join("")}
</div>

      ${codeBlock(
        "las tres zonas en acción",
        `<span class="sc"># 1. Modificas un archivo → Working Directory</span>
<span class="sa">git status</span>   <span class="sc"># muestra archivos modificados</span>

<span class="sc"># 2. Lo preparas → Staging Area</span>
<span class="sa">git add</span> <span class="sn">index.py</span>

<span class="sc"># 3. Lo guardas → Repository</span>
<span class="sa">git commit -m</span> <span class="ss">"feat: agrega endpoint de usuarios"</span>`,
      )}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-12 mb-5">Conceptos clave</h3>

      <div class="grid sm:grid-cols-2 gap-4">
        ${concepts
          .map(
            (c) => `
          <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-5 flex gap-4">
            <div class="w-1 rounded flex-shrink-0 mt-1" style="background:${c.color}"></div>
            <div>
              <h4 class="font-mono text-sm font-bold mb-1" style="color:${c.color}">${c.term}</h4>
              <p class="text-sm text-[var(--muted)] leading-relaxed m-0">${c.def}</p>
            </div>
          </div>`,
          )
          .join("")}
      </div>

      ${callout("note", "📌 Analogía de ramas", "Imagina que estás escribiendo una novela. La rama <code>main</code> es tu manuscrito oficial. Si quieres probar un final alternativo, creas una rama nueva, escribes ahí, y si te convence lo fusionas con el manuscrito principal. Si no, simplemente eliminas esa rama.")}
    </div>`;
}
