import { sectionHeader, codeBlock, callout } from "../components/ui";

function branchDiagram(type: "gitflow" | "ghflow" | "trunk"): string {
  if (type === "gitflow") {
    return `
      <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-6 mb-6 overflow-x-auto">
        <p class="font-mono text-xs text-[var(--muted)] mb-5">Las cinco ramas de Git Flow</p>
        <div class="min-w-[560px] space-y-4">

          ${[
            {
              label: "main",
              color: "#79c0ff",
              nodes: [0, 2, 8, 10],
              dashed: false,
              tags: { 0: "v1.0", 8: "v1.1", 10: "v2.0" } as Record<
                number,
                string
              >,
            },
            {
              label: "develop",
              color: "#d2a8ff",
              nodes: [0, 2, 4, 6, 8, 10],
              dashed: false,
              tags: {} as Record<number, string>,
            },
            {
              label: "feature/*",
              color: "#56d364",
              nodes: [2, 6],
              dashed: true,
              tags: {} as Record<number, string>,
            },
            {
              label: "release/*",
              color: "#e3b341",
              nodes: [4, 8],
              dashed: true,
              tags: {} as Record<number, string>,
            },
            {
              label: "hotfix/*",
              color: "#f78166",
              nodes: [6, 10],
              dashed: false,
              tags: {} as Record<number, string>,
            },
          ]
            .map((row) => {
              const COLS = 11;
              const min = Math.min(...row.nodes);
              const max = Math.max(...row.nodes);

              return `
              <div class="flex items-center gap-3">
                <span class="font-mono text-[11px] w-20 flex-shrink-0" style="color:${row.color}">${row.label}</span>
                <div class="flex flex-1 items-center relative" style="height:28px; margin-top:${Object.keys(row.tags).length ? "20px" : "0"}">
                  <!-- línea de fondo continua -->
                  <div class="absolute" style="left:${min * (100 / COLS)}%; right:${(COLS - 1 - max) * (100 / COLS)}%; top:50%; height:2px; ${row.dashed ? `border-top: 2px dashed ${row.color}; opacity:0.5; background:none` : `background:${row.color}`}"></div>
                  ${row.nodes
                    .map((n) => {
                      const tag = (row.tags as Record<number, string>)[n];
                      return `
                      <div class="absolute z-10 flex flex-col items-center" style="left:calc(${n * (100 / COLS)}% + ${n === 0 ? "6px" : n === COLS - 1 ? "-6px" : "0px"}); top:50%; transform:translateY(-50%)">
                        ${tag ? `<span class="absolute font-mono text-[9px] text-[var(--muted)] whitespace-nowrap" style="top:-22px">${tag}</span>` : ""}
                        <div class="w-3.5 h-3.5 rounded-full border-2" style="border-color:${row.color}; background:${row.color}"></div>
                      </div>`;
                    })
                    .join("")}
                </div>
              </div>`;
            })
            .join("")}

        </div>
      </div>`;
  }

  if (type === "ghflow") {
    return `
      <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-6 mb-6 overflow-x-auto">
        <p class="font-mono text-xs text-[var(--muted)] mb-5">GitHub Flow — main siempre deployable</p>
        <div class="min-w-[480px] space-y-4">
          ${[
            {
              label: "main",
              color: "#79c0ff",
              nodes: [0, 2, 6, 8],
              tags: {
                0: "deploy",
                2: "deploy",
                6: "deploy",
                8: "deploy",
              } as Record<number, string>,
            },
            {
              label: "feature/A",
              color: "#56d364",
              nodes: [2, 4],
              tags: { 4: "PR ✓" } as Record<number, string>,
              dashed: true,
              end: 6,
            },
            {
              label: "feature/B",
              color: "#d2a8ff",
              nodes: [5, 7],
              tags: { 7: "PR ✓" } as Record<number, string>,
              dashed: true,
              end: 8,
            },
          ]
            .map((row) => {
              const COLS = 9;
              const min = Math.min(...row.nodes);
              const max = (
                "end" in row ? row.end : Math.max(...row.nodes)
              ) as number;
              return `
              <div class="flex items-center gap-3">
                <span class="font-mono text-[11px] w-20 flex-shrink-0" style="color:${row.color}">${row.label}</span>
                <div class="flex flex-1 items-center relative" style="height:28px; margin-top:20px">
                  <div class="absolute" style="left:${min * (100 / COLS)}%; right:${(COLS - 1 - max) * (100 / COLS)}%; top:50%; height:2px; ${"dashed" in row && row.dashed ? `border-top:2px dashed ${row.color}; opacity:0.5; background:none` : `background:${row.color}`}"></div>
                  ${row.nodes
                    .map((n) => {
                      const tag = (row.tags as Record<number, string>)[n];
                      return `
                      <div class="absolute z-10 flex flex-col items-center" style="left:calc(${n * (100 / COLS)}%); top:50%; transform:translateY(-50%)">
                        ${tag ? `<span class="absolute font-mono text-[9px] text-[var(--muted)] whitespace-nowrap" style="top:-22px">${tag}</span>` : ""}
                        <div class="w-3.5 h-3.5 rounded-full border-2" style="border-color:${row.color}; background:${row.color}"></div>
                      </div>`;
                    })
                    .join("")}
                </div>
              </div>`;
            })
            .join("")}
        </div>
      </div>`;
  }

  // trunk
  return `
    <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-6 mb-6 overflow-x-auto">
      <p class="font-mono text-xs text-[var(--muted)] mb-5">Trunk-Based — todos commitean a main</p>
      <div class="min-w-[480px] space-y-4">
        ${[
          {
            label: "main",
            color: "#79c0ff",
            nodes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            dashed: false,
          },
          {
            label: "rama corta",
            color: "#56d364",
            nodes: [2, 3],
            dashed: true,
            note: "< 2 días",
          },
        ]
          .map((row) => {
            const COLS = 9;
            const min = Math.min(...row.nodes);
            const max = Math.max(...row.nodes);
            return `
            <div class="flex items-center gap-3">
              <span class="font-mono text-[11px] w-24 flex-shrink-0" style="color:${row.color}">${row.label}</span>
              <div class="flex flex-1 items-center relative" style="height:28px; margin-top:${"note" in row ? "20px" : "0"}">
                <div class="absolute" style="left:${min * (100 / COLS)}%; right:${(COLS - 1 - max) * (100 / COLS)}%; top:50%; height:2px; ${row.dashed ? `border-top:2px dashed ${row.color}; opacity:0.5; background:none` : `background:${row.color}`}"></div>
                ${row.nodes
                  .map(
                    (n, ni) => `
                  <div class="absolute z-10" style="left:calc(${n * (100 / COLS)}%); top:50%; transform:translateY(-50%)">
                    ${"note" in row && ni === row.nodes.length - 1 ? `<span class="absolute font-mono text-[9px] text-[var(--muted)] whitespace-nowrap" style="top:-22px">${(row as { note: string }).note}</span>` : ""}
                    <div class="w-3.5 h-3.5 rounded-full border-2" style="border-color:${row.color}; background:${row.color}"></div>
                  </div>`,
                  )
                  .join("")}
              </div>
            </div>`;
          })
          .join("")}
      </div>
    </div>`;
}

export function render(): string {
  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("08 · Branching Strategies", "Cómo organizar las ramas del equipo")}

      <p class="text-lg text-[var(--muted)] mb-10 leading-relaxed">
        Una estrategia de branching define cómo un equipo organiza sus ramas en Git.
        No hay una única respuesta correcta — la mejor depende del proyecto y del equipo.
      </p>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="flex gap-1 p-1 rounded-xl border border-[var(--border)] bg-[var(--bg2)] w-fit">
          ${["gitflow", "ghflow", "trunk"]
            .map((id, i) => {
              const labels = ["Git Flow", "GitHub Flow", "Trunk-Based"];
              return `<button
              data-tab="${id}"
              class="tab-btn px-5 py-2.5 rounded-lg font-mono text-sm cursor-pointer transition-all duration-150
                     ${i === 0 ? "bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] shadow-sm" : "text-[var(--muted)] hover:text-[var(--text)] border border-transparent bg-transparent"}"
            >${labels[i]}</button>`;
            })
            .join("")}
        </div>

        <!-- Git Flow -->
        <div data-panel="gitflow" class="tab-panel mt-6">
        ${branchDiagram("gitflow")}
          <p class="text-[var(--muted)] mb-6 leading-relaxed">
            Creado por Vincent Driessen en 2010. El modelo más completo y estructurado.
            Define <strong>cinco tipos de ramas</strong> con roles bien definidos.
          </p>

          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            ${[
              {
                name: "main",
                desc: "Siempre en producción. Cada merge se etiqueta con versión (v1.0, v2.0).",
                color: "var(--accent2)",
              },
              {
                name: "develop",
                desc: "Rama de integración. Aquí se juntan todas las features terminadas.",
                color: "var(--accent4)",
              },
              {
                name: "feature/*",
                desc: "Una rama por funcionalidad. Sale de develop y vuelve a develop.",
                color: "var(--accent3)",
              },
              {
                name: "release/*",
                desc: "Últimos ajustes antes de producción. Merge a main y a develop.",
                color: "var(--yellow)",
              },
              {
                name: "hotfix/*",
                desc: "Arreglos urgentes en producción. Sale directamente de main.",
                color: "var(--accent)",
              },
            ]
              .map(
                (b) => `
              <div class="rounded-lg border bg-[var(--bg2)] p-4" style="border-color:${b.color}40">
                <code class="font-mono text-sm font-bold" style="color:${b.color}">${b.name}</code>
                <p class="text-xs text-[var(--muted)] mt-2 m-0 leading-relaxed">${b.desc}</p>
              </div>`,
              )
              .join("")}
          </div>

          ${codeBlock(
            "git flow · ejemplo",
            `<span class="sc"># 1. Crear feature desde develop</span>
<span class="sa">git checkout develop</span>
<span class="sa">git checkout -b</span> <span class="sn">feature/sistema-pagos</span>

<span class="sc"># 2. Desarrollar y commitear</span>
<span class="sa">git commit -m</span> <span class="ss">"feat(pagos): agrega integración con Transbank"</span>

<span class="sc"># 3. Merge de feature a develop</span>
<span class="sa">git checkout develop</span>
<span class="sa">git merge --no-ff feature/sistema-pagos</span>

<span class="sc"># 4. Crear rama release</span>
<span class="sa">git checkout -b</span> <span class="sn">release/1.2.0</span>
<span class="sa">git commit -m</span> <span class="ss">"chore: bump version to 1.2.0"</span>

<span class="sc"># 5. Mergear a main y taggear</span>
<span class="sa">git checkout main</span>
<span class="sa">git merge --no-ff release/1.2.0</span>
<span class="sa">git tag -a v1.2.0 -m</span> <span class="ss">"Release v1.2.0"</span>`,
          )}

          ${callout("note", "📌 Úsalo cuando...", "Tu proyecto tiene <strong>releases formales con versiones</strong>, hay un QA que valida antes de subir a producción, o el equipo es mediano/grande. Ejemplos: software de escritorio, librerías, apps móviles, sistemas bancarios.")}
        </div>

        <!-- GitHub Flow -->
        <div data-panel="ghflow" class="tab-panel mt-6 hidden">
        ${branchDiagram("ghflow")} 
          <p class="text-[var(--muted)] mb-6 leading-relaxed">
            Creado por GitHub en 2011. Solo usa <strong>dos tipos de ramas</strong>: <code>main</code>
            y ramas de feature. La idea central: <code>main</code> siempre está lista para deploy.
          </p>

          <div class="grid sm:grid-cols-2 gap-4 mb-8">
            ${[
              {
                n: "1",
                title: "Crea una rama descriptiva",
                desc: "feature/agregar-buscador · fix/corregir-paginacion",
                color: "var(--accent2)",
              },
              {
                n: "2",
                title: "Commitea con frecuencia",
                desc: "Sube a GitHub aunque no esté terminado. Sirve de respaldo.",
                color: "var(--accent3)",
              },
              {
                n: "3",
                title: "Abre un Pull Request",
                desc: "El equipo revisa, comenta y aprueba el código.",
                color: "var(--accent4)",
              },
              {
                n: "4",
                title: "Merge y deploy automático",
                desc: "CI/CD hace el deploy al fusionar en main.",
                color: "var(--accent)",
              },
            ]
              .map(
                (s) => `
              <div class="flex gap-4 rounded-lg border border-[var(--border)] bg-[var(--bg2)] p-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                            font-mono text-sm font-bold text-white"
                     style="background:${s.color}">
                  ${s.n}
                </div>
                <div>
                  <h4 class="font-semibold text-sm text-[var(--text)] mb-0.5">${s.title}</h4>
                  <p class="text-xs text-[var(--muted)] font-mono m-0">${s.desc}</p>
                </div>
              </div>`,
              )
              .join("")}
          </div>

          ${codeBlock(
            "github flow · ejemplo",
            `<span class="sc"># 1. Crear rama desde main</span>
<span class="sa">git checkout main && git pull origin main</span>
<span class="sa">git checkout -b</span> <span class="sn">feature/agregar-buscador</span>

<span class="sc"># 2. Desarrollar</span>
<span class="sa">git commit -m</span> <span class="ss">"feat(search): agrega barra de búsqueda"</span>
<span class="sa">git push origin feature/agregar-buscador</span>

<span class="sc"># 3. Abrir Pull Request desde GitHub.com
# → Compare & pull request → Assign reviewers</span>

<span class="sc"># 4. Tras aprobación: merge a main → deploy 🚀</span>`,
          )}

          ${callout("note", "📌 Úsalo cuando...", "Tu equipo hace <strong>deploy continuo</strong>, el proyecto es una app web/API con una sola versión en producción, o el equipo es pequeño y necesita simplicidad. Ejemplos: startups, SaaS, APIs REST.")}
        </div>

        <!-- Trunk-Based -->
        <div data-panel="trunk" class="tab-panel mt-6 hidden">
        ${branchDiagram("trunk")}
          <p class="text-[var(--muted)] mb-6 leading-relaxed">
            El modelo más radical. Usado en Google, Meta y Amazon. Todos los desarrolladores
            trabajan directamente en <strong>main (trunk)</strong>, con commits pequeños y muy frecuentes.
          </p>

          <div class="grid sm:grid-cols-3 gap-4 mb-8">
            ${[
              {
                icon: "🚩",
                title: "Feature Flags",
                desc: 'El código llega a producción "apagado". Se activa cuando está listo, sin merge de ramas gigantes.',
                color: "var(--accent)",
              },
              {
                icon: "✅",
                title: "Tests automatizados",
                desc: "Sin buena cobertura de tests esto no funciona. Los tests son el escudo de seguridad del equipo.",
                color: "var(--accent3)",
              },
              {
                icon: "🤖",
                title: "CI/CD obligatorio",
                desc: "Cada push activa una pipeline. Si algo falla, el equipo lo sabe al instante.",
                color: "var(--accent2)",
              },
            ]
              .map(
                (p) => `
              <div class="rounded-lg border border-[var(--border)] bg-[var(--bg2)] p-5 text-center">
                <div class="text-3xl mb-3">${p.icon}</div>
                <h4 class="font-mono text-sm font-bold mb-2" style="color:${p.color}">${p.title}</h4>
                <p class="text-xs text-[var(--muted)] leading-relaxed m-0">${p.desc}</p>
              </div>`,
              )
              .join("")}
          </div>

          ${codeBlock(
            "trunk-based · feature flag en Python",
            `<span class="sk">FEATURE_FLAGS</span> = {
    <span class="ss">"nuevo_dashboard"</span>: <span class="sa">False</span>,  <span class="sc"># apagado en producción</span>
    <span class="ss">"exportar_excel"</span>:  <span class="sa">True</span>,   <span class="sc"># activo para todos</span>
}

<span class="sk">def</span> <span class="sn">mostrar_dashboard</span>(user):
    <span class="sk">if</span> FEATURE_FLAGS[<span class="ss">"nuevo_dashboard"</span>]:
        <span class="sk">return</span> nuevo_dashboard(user)
    <span class="sk">return</span> dashboard_clasico(user)`,
          )}

          ${callout("warn", "⚠️ Importante", "No recomendado para equipos nuevos o proyectos sin tests. <strong>Requiere alta disciplina técnica</strong>. Si el equipo no tiene CI/CD maduro y buena cobertura de tests, puede ser contraproducente.")}
        </div>
      </div>

      <!-- Comparación -->
      <h3 class="font-display text-2xl font-bold text-[var(--text)] mt-12 mb-6">Comparación</h3>
      <div class="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-[var(--bg3)]">
              <th class="text-left px-4 py-3 font-mono text-xs text-[var(--muted)] font-medium border-b border-[var(--border)]">Criterio</th>
              <th class="text-center px-4 py-3 font-mono text-xs font-semibold border-b border-[var(--border)]" style="color:var(--accent4)">Git Flow</th>
              <th class="text-center px-4 py-3 font-mono text-xs font-semibold border-b border-[var(--border)]" style="color:var(--accent2)">GitHub Flow</th>
              <th class="text-center px-4 py-3 font-mono text-xs font-semibold border-b border-[var(--border)]" style="color:var(--accent3)">Trunk-Based</th>
            </tr>
          </thead>
          <tbody>
            ${[
              [
                "Complejidad",
                "Alta (5 ramas)",
                "Baja (2 ramas)",
                "Mínima (1 rama)",
              ],
              [
                "Velocidad de entrega",
                "⚡ Media",
                "⚡⚡ Alta",
                "⚡⚡⚡ Muy alta",
              ],
              [
                "Versiones múltiples",
                "✅ Sí soporta",
                "❌ No ideal",
                "❌ No ideal",
              ],
              [
                "Requiere CI/CD",
                "Recomendado",
                "✅ Importante",
                "🔴 Obligatorio",
              ],
              [
                "Requiere tests",
                "Recomendado",
                "Recomendado",
                "🔴 Obligatorio",
              ],
              [
                "Popularidad actual",
                "📉 Decayendo",
                "📈 Muy popular",
                "📈 En aumento",
              ],
            ]
              .map(
                (row, i) => `
              <tr class="${i % 2 === 1 ? "bg-[var(--bg2)]/50" : ""}">
                <td class="px-4 py-3 font-mono text-xs text-[var(--muted)] border-b border-[var(--border)]/50">${row[0]}</td>
                <td class="px-4 py-3 text-center text-xs text-[var(--text)] border-b border-[var(--border)]/50">${row[1]}</td>
                <td class="px-4 py-3 text-center text-xs text-[var(--text)] border-b border-[var(--border)]/50">${row[2]}</td>
                <td class="px-4 py-3 text-center text-xs text-[var(--text)] border-b border-[var(--border)]/50">${row[3]}</td>
              </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <!-- Árbol de decisión -->
      <h3 class="font-display text-2xl font-bold text-[var(--text)] mt-12 mb-6">¿Cuál elegir?</h3>
      <div class="space-y-3">
        ${[
          {
            q: "¿Múltiples versiones en producción al mismo tiempo?",
            res: "Git Flow",
            color: "var(--accent4)",
          },
          {
            q: "¿QA formal o ciclos de release largos (mensuales)?",
            res: "Git Flow",
            color: "var(--accent4)",
          },
          {
            q: "¿CI/CD maduro y buena cobertura de tests?",
            res: "Trunk-Based",
            color: "var(--accent3)",
          },
          {
            q: "¿Equipo nuevo o proyecto recién iniciando?",
            res: "GitHub Flow ⭐",
            color: "var(--accent2)",
          },
        ]
          .map(
            (d) => `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3
                      rounded-lg border border-[var(--border)] bg-[var(--bg2)] px-5 py-4">
            <p class="text-sm text-[var(--text)] m-0">→ ${d.q}</p>
            <span class="inline-block flex-shrink-0 font-mono text-xs font-bold px-3 py-1 rounded-full"
                  style="color:${d.color}; background:${d.color}18; border:1px solid ${d.color}40">
              ${d.res}
            </span>
          </div>`,
          )
          .join("")}
      </div>

      ${callout("tip", "✅ Para proyectos de curso", "<strong>GitHub Flow</strong> es la opción ideal — simple, incentiva los Pull Requests para revisión de código, y refleja el flujo de trabajo real de la industria para la mayoría de los proyectos web.")}
    </div>`;
}

export function initTabs(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".tab-btn");
  const panels = document.querySelectorAll<HTMLElement>(".tab-panel");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      buttons.forEach((b) => {
        const active = b.dataset.tab === target;
        b.classList.toggle("bg-[var(--bg)]", active);
        b.classList.toggle("text-[var(--text)]", active);
        b.classList.toggle("border-[var(--border)]", active);
        b.classList.toggle("shadow-sm", active);
        b.classList.toggle("text-[var(--muted)]", !active);
        b.classList.toggle("border-transparent", !active);
      });

      panels.forEach((p) => {
        p.classList.toggle("hidden", p.dataset.panel !== target);
      });
    });
  });
}
