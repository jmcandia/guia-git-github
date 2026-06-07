import { sectionHeader, codeBlock, callout, extLink } from "../components/ui";

export function render(): string {
  const emojis = [
    { e: "✨", code: ":sparkles:", desc: "Nueva funcionalidad" },
    { e: "🐛", code: ":bug:", desc: "Corrección de bug" },
    { e: "📝", code: ":memo:", desc: "Documentación" },
    { e: "♻️", code: ":recycle:", desc: "Refactorizar código" },
    { e: "⬆️", code: ":arrow_up:", desc: "Actualizar dependencias" },
    { e: "🔥", code: ":fire:", desc: "Eliminar código/archivos" },
    { e: "🚀", code: ":rocket:", desc: "Deploy / lanzamiento" },
    { e: "💥", code: ":boom:", desc: "Breaking change" },
    { e: "✅", code: ":white_check_mark:", desc: "Agregar/pasar tests" },
    { e: "🔒", code: ":lock:", desc: "Corrección de seguridad" },
    { e: "🚧", code: ":construction:", desc: "Trabajo en progreso" },
    { e: "🎉", code: ":tada:", desc: "Commit inicial" },
    { e: "💄", code: ":lipstick:", desc: "Cambios de UI/estilos" },
    { e: "🐳", code: ":whale:", desc: "Cambios en Docker" },
    { e: "⚡️", code: ":zap:", desc: "Mejorar rendimiento" },
    { e: "🎨", code: ":art:", desc: "Mejorar estructura/formato" },
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("07 · Gitmoji", "Emojis con significado en tus commits")}

      <p class="text-lg text-[var(--muted)] mb-4 leading-relaxed">
        Gitmoji agrega un emoji al inicio del mensaje para identificar el tipo de commit de un solo vistazo.
        Se combina perfectamente con Conventional Commits.
      </p>

      ${callout("info", "🔗 Recurso oficial", `Consulta el listado completo en ${extLink("https://gitmoji.dev", "gitmoji.dev")}. También existe una extensión para VSCode y una CLI para seleccionarlos fácilmente.`)}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-5">Los más usados</h3>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        ${emojis
          .map(
            (g) => `
          <div class="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg2)] p-3
                      hover:border-[var(--accent)] transition-colors">
            <span class="text-2xl flex-shrink-0">${g.e}</span>
            <div class="min-w-0">
              <p class="font-mono text-[11px] text-[var(--accent)] truncate">${g.code}</p>
              <p class="text-xs text-[var(--muted)] truncate">${g.desc}</p>
            </div>
          </div>`,
          )
          .join("")}
      </div>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mb-4">Gitmoji + Conventional Commits</h3>
      <p class="text-sm text-[var(--muted)] mb-4">Se pueden combinar perfectamente. El emoji va antes del tipo:</p>

      ${codeBlock(
        "commits combinados",
        `<span class="sc"># Nueva feature</span>
✨ <span class="sa">feat</span>(<span class="sk">auth</span>): implementa autenticación con JWT

<span class="sc"># Fix de bug</span>
🐛 <span class="sa">fix</span>(<span class="sk">api</span>): corrige validación de RUT en endpoint de registro

<span class="sc"># Refactor</span>
♻️ <span class="sa">refactor</span>(<span class="sk">users</span>): separa lógica de negocio al UserService

<span class="sc"># Actualizar dependencias</span>
⬆️ <span class="sa">chore</span>: actualiza Spring Boot de 3.2 a 3.3`,
      )}

      ${callout("tip", "✅ Consejo", "No es obligatorio usar Gitmoji. Lo importante es que el equipo defina un estándar y lo aplique de forma <strong>consistente</strong>. Lo que no funciona es que cada persona escriba los commits como quiera.")}
    </div>`;
}
