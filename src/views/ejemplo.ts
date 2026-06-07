import { codeBlock, callout } from "../components/ui";

interface Step {
  id: string;
  num: string;
  title: string;
  content: string;
}

function step(s: Step): string {
  return `
    <div id="${s.id}" class="scroll-mt-20">
      <div class="flex items-start gap-4 mb-4">
        <div class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                    font-mono text-xs font-bold border border-[var(--border)] bg-[var(--bg2)]"
             style="color:var(--accent)">
          ${s.num}
        </div>
        <h3 class="font-display text-xl font-bold text-[var(--text)] pt-1">${s.title}</h3>
      </div>
      <div class="ml-13 pl-1">${s.content}</div>
      <div class="ml-13 mt-8 h-px bg-[var(--border)]"></div>
    </div>`;
}

function miniNav(steps: { id: string; title: string }[]): string {
  return `
    <nav class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-5 mb-12 sticky top-16 z-40">
      <p class="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mb-3">En esta sección</p>
      <ol class="space-y-1.5 list-none m-0 p-0">
        ${steps
          .map(
            (s, i) => `
          <li>
            <a href="#${s.id}"
               class="flex items-center gap-2.5 text-xs text-[var(--muted)]
                      hover:text-[var(--accent)] transition-colors font-mono">
              <span class="text-[var(--accent)] opacity-60">${String(i + 1).padStart(2, "0")}</span>
              ${s.title}
            </a>
          </li>`,
          )
          .join("")}
      </ol>
    </nav>`;
}

export function render(): string {
  const steps = [
    { id: "paso-1", title: "Crear el repositorio local" },
    { id: "paso-2", title: "Primer commit" },
    { id: "paso-3", title: "Subir a GitHub" },
    { id: "paso-4", title: "Crear una rama y desarrollar" },
    { id: "paso-5", title: "Abrir un Pull Request" },
    { id: "paso-6", title: "Resolver un conflicto" },
    { id: "paso-7", title: "Merge y limpieza" },
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-14">

      <!-- Header -->
      <div class="mb-10">
        <p class="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--accent)] mb-2">10 · Ejemplo completo</p>
        <h2 class="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)] mb-4">
          De cero a GitHub
        </h2>
        <div class="mt-3 h-px w-16 bg-[var(--accent)] mb-6"></div>
        <p class="text-lg text-[var(--muted)] leading-relaxed">
          Vamos a crear un script en Python desde cero, versionarlo con Git y subirlo a GitHub.
          En el camino crearemos ramas, haremos un Pull Request y resolveremos un conflicto real.
        </p>
      </div>

      <!-- Layout de dos columnas en pantallas grandes -->
      <div class="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">

        <!-- Mini nav lateral -->
        <div class="hidden lg:block">
          ${miniNav(steps)}
        </div>

        <!-- Contenido -->
        <div class="space-y-12">

          ${step({
            id: "paso-1",
            num: "01",
            title: "Crear el repositorio local",
            content: `
              <p class="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Tenemos una carpeta con un script de Python que calcula el promedio de una lista de notas.
                El proyecto todavía no tiene Git — vamos a inicializarlo.
              </p>
              ${codeBlock(
                "terminal",
                `<span class="sc"># Crear la carpeta del proyecto y entrar</span>
<span class="sa">mkdir</span> <span class="sn">calculadora-notas</span>
<span class="sa">cd</span> <span class="sn">calculadora-notas</span>

<span class="sc"># Inicializar el repositorio Git</span>
<span class="sa">git init</span>

<span class="sc"># Configurar la rama principal como main (buena práctica)</span>
<span class="sa">git branch -M main</span>`,
              )}
              ${callout("tip", "✅ Resultado", "Git crea una carpeta oculta <code>.git</code> dentro de tu proyecto. Ahí se guarda todo el historial. No la toques nunca manualmente.")}
            `,
          })}

          ${step({
            id: "paso-2",
            num: "02",
            title: "Primer commit",
            content: `
              <p class="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Creamos los primeros archivos del proyecto: el script principal y un
                <code>.gitignore</code> para no subir archivos innecesarios.
              </p>
              ${codeBlock(
                "notas.py",
                `<span class="sk">def</span> <span class="sn">calcular_promedio</span>(notas: list[float]) -> float:
    <span class="sk">if not</span> notas:
        <span class="sk">raise</span> ValueError(<span class="ss">"La lista de notas no puede estar vacía"</span>)
    <span class="sk">return</span> sum(notas) / len(notas)

<span class="sk">if</span> __name__ == <span class="ss">"__main__"</span>:
    notas = [<span class="sy">4.5</span>, <span class="sy">5.0</span>, <span class="sy">3.8</span>, <span class="sy">6.2</span>, <span class="sy">5.5</span>]
    promedio = calcular_promedio(notas)
    print(<span class="ss">f"Promedio: </span><span class="sk">{</span>promedio:<span class="sy">.1f</span><span class="sk">}</span><span class="ss">"</span>)`,
              )}
              ${codeBlock(
                ".gitignore",
                `<span class="sc"># Entornos virtuales</span>
<span class="ss">venv/</span>
<span class="ss">.venv/</span>

<span class="sc"># Caché de Python</span>
<span class="ss">__pycache__/</span>
<span class="ss">*.pyc</span>

<span class="sc"># Variables de entorno</span>
<span class="ss">.env</span>`,
              )}
              ${codeBlock(
                "terminal",
                `<span class="sc"># Ver el estado actual</span>
<span class="sa">git status</span>

<span class="sc"># Agregar todos los archivos</span>
<span class="sa">git add .</span>

<span class="sc"># Primer commit</span>
<span class="sa">git commit -m</span> <span class="ss">"🎉 feat: commit inicial con calculadora de notas"</span>`,
              )}
              ${callout("info", "💡 Convención", "El primer commit de un proyecto suele llevar el emoji <code>🎉</code> (<code>:tada:</code>) por convención en Gitmoji. Es el único momento en que se usa.")}
            `,
          })}

          ${step({
            id: "paso-3",
            num: "03",
            title: "Subir a GitHub",
            content: `
              <p class="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Ahora creamos el repositorio en GitHub y conectamos nuestro repo local con él.
                El repositorio en GitHub lo creamos <strong>sin inicializar</strong> (sin README, sin
                .gitignore) para evitar conflictos con lo que ya tenemos local.
              </p>
              ${codeBlock(
                "terminal",
                `<span class="sc"># Conectar el repo local con el remoto</span>
<span class="sc"># (reemplaza con la URL de tu repositorio)</span>
<span class="sa">git remote add origin</span> <span class="ss">https://github.com/tu-usuario/calculadora-notas.git</span>

<span class="sc"># Verificar que quedó bien conectado</span>
<span class="sa">git remote -v</span>

<span class="sc"># Subir main a GitHub por primera vez</span>
<span class="sa">git push -u origin main</span>`,
              )}
              ${callout("tip", "✅ El flag -u", "El <code>-u</code> (upstream) le dice a Git que de ahora en adelante, cuando estés en <code>main</code>, <code>git push</code> y <code>git pull</code> apunten automáticamente a <code>origin/main</code>. Solo se necesita la primera vez.")}
            `,
          })}

          ${step({
            id: "paso-4",
            num: "04",
            title: "Crear una rama y desarrollar",
            content: `
              <p class="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Queremos agregar una función que clasifique la nota según la escala chilena.
                En vez de trabajar directo en <code>main</code>, creamos una rama para mantener
                el código estable mientras desarrollamos.
              </p>
              ${codeBlock(
                "terminal",
                `<span class="sc"># Crear la rama y cambiarse a ella</span>
<span class="sa">git switch -c</span> <span class="sn">feature/clasificar-nota</span>

<span class="sc"># Verificar en qué rama estamos</span>
<span class="sa">git branch</span>
<span class="sc"># * feature/clasificar-nota</span>
<span class="sc">#   main</span>`,
              )}
              <p class="text-sm text-[var(--muted)] my-4 leading-relaxed">
                Agregamos la nueva función al archivo:
              </p>
              ${codeBlock(
                "notas.py — función agregada",
                `<span class="sk">def</span> <span class="sn">calcular_promedio</span>(notas: list[float]) -> float:
    <span class="sk">if not</span> notas:
        <span class="sk">raise</span> ValueError(<span class="ss">"La lista de notas no puede estar vacía"</span>)
    <span class="sk">return</span> sum(notas) / len(notas)

<span class="sk">def</span> <span class="sn">clasificar_nota</span>(nota: float) -> str:   <span class="sc"># ← función nueva</span>
    <span class="sk">if</span> nota >= <span class="sy">6.0</span>:  <span class="sk">return</span> <span class="ss">"Excelente"</span>
    <span class="sk">if</span> nota >= <span class="sy">5.0</span>:  <span class="sk">return</span> <span class="ss">"Bueno"</span>
    <span class="sk">if</span> nota >= <span class="sy">4.0</span>:  <span class="sk">return</span> <span class="ss">"Suficiente"</span>
    <span class="sk">return</span> <span class="ss">"Insuficiente"</span>

<span class="sk">if</span> __name__ == <span class="ss">"__main__"</span>:
    notas = [<span class="sy">4.5</span>, <span class="sy">5.0</span>, <span class="sy">3.8</span>, <span class="sy">6.2</span>, <span class="sy">5.5</span>]
    promedio = calcular_promedio(notas)
    print(<span class="ss">f"Promedio: </span><span class="sk">{</span>promedio:<span class="sy">.1f</span><span class="sk">}</span><span class="ss"> — </span><span class="sk">{</span>clasificar_nota(promedio)<span class="sk">}</span><span class="ss">"</span>)`,
              )}
              ${codeBlock(
                "terminal",
                `<span class="sc"># Commitear el avance en la rama</span>
<span class="sa">git add .</span>
<span class="sa">git commit -m</span> <span class="ss">"✨ feat: agrega función clasificar_nota por escala chilena"</span>

<span class="sc"># Subir la rama a GitHub</span>
<span class="sa">git push -u origin feature/clasificar-nota</span>`,
              )}
            `,
          })}

          ${step({
            id: "paso-5",
            num: "05",
            title: "Abrir un Pull Request",
            content: `
              <p class="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Con la rama subida a GitHub, abrimos un Pull Request para que el equipo revise
                el código antes de fusionarlo con <code>main</code>.
              </p>
              <ol class="space-y-3 mb-6 list-none p-0">
                ${[
                  {
                    n: "1",
                    t: "Ve a tu repositorio en GitHub",
                    d: 'Aparecerá un banner amarillo que dice <em>"feature/clasificar-nota had recent pushes"</em> con un botón <strong>Compare & pull request</strong>. Haz clic.',
                  },
                  {
                    n: "2",
                    t: "Completa el formulario del PR",
                    d: '<strong>Título:</strong> "feat: agrega clasificación de nota por escala chilena"<br><strong>Descripción:</strong> explica qué hace el cambio, por qué y cómo probarlo.',
                  },
                  {
                    n: "3",
                    t: "Asigna revisores",
                    d: "En el panel derecho puedes asignar <em>Reviewers</em>. En un proyecto de curso puedes asignar a un compañero.",
                  },
                  {
                    n: "4",
                    t: "Crea el PR",
                    d: "Haz clic en <strong>Create pull request</strong>. El PR queda abierto esperando aprobación.",
                  },
                ]
                  .map(
                    (s) => `
                  <li class="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg2)] p-4">
                    <span class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                                 font-mono text-xs font-bold text-white"
                          style="background:var(--accent2)">${s.n}</span>
                    <div>
                      <p class="font-semibold text-sm text-[var(--text)] mb-0.5">${s.t}</p>
                      <p class="text-xs text-[var(--muted)] leading-relaxed m-0">${s.d}</p>
                    </div>
                  </li>`,
                  )
                  .join("")}
              </ol>
              ${callout("note", "📌 Code review", "El revisor puede comentar líneas específicas del código, solicitar cambios o aprobarlo. Si solicita cambios, haces los ajustes en la misma rama, commiteas y el PR se actualiza automáticamente.")}
            `,
          })}

          ${step({
            id: "paso-6",
            num: "06",
            title: "Resolver un conflicto",
            content: `
              <p class="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Mientras trabajabas en tu rama, otro integrante del equipo modificó
                <code>notas.py</code> directamente en <code>main</code> — cambió el mensaje del
                <code>print</code>. Ahora hay un conflicto porque ambas versiones tocaron la misma
                línea. Git no sabe cuál conservar y te pide que decidas tú.
              </p>

              ${callout("warn", "⚠️ ¿Cuándo ocurre un conflicto?", "Cuando dos ramas modifican <strong>la misma línea</strong> del mismo archivo. Git puede fusionar cambios en líneas distintas automáticamente, pero cuando hay solapamiento necesita intervención humana.")}

              <p class="text-sm text-[var(--muted)] my-4 leading-relaxed">
                Primero traemos los cambios de <code>main</code> a nuestra rama para resolver
                el conflicto localmente antes de hacer el merge:
              </p>
              ${codeBlock(
                "terminal",
                `<span class="sc"># Asegurarse de estar en nuestra rama</span>
<span class="sa">git switch</span> <span class="sn">feature/clasificar-nota</span>

<span class="sc"># Traer los últimos cambios de main</span>
<span class="sa">git fetch origin</span>
<span class="sa">git merge origin/main</span>

<span class="sc"># Git avisa del conflicto:</span>
<span class="sc"># Auto-merging notas.py</span>
<span class="sc"># CONFLICT (content): Merge conflict in notas.py</span>
<span class="sc"># Automatic merge failed; fix conflicts and then commit the result.</span>`,
              )}

              <p class="text-sm text-[var(--muted)] my-4 leading-relaxed">
                Al abrir <code>notas.py</code> verás los marcadores de conflicto que Git insertó:
              </p>
              ${codeBlock(
                "notas.py — con marcadores de conflicto",
                `<span class="sk">if</span> __name__ == <span class="ss">"__main__"</span>:
    notas = [<span class="sy">4.5</span>, <span class="sy">5.0</span>, <span class="sy">3.8</span>, <span class="sy">6.2</span>, <span class="sy">5.5</span>]
    promedio = calcular_promedio(notas)
<span class="sa">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</span>
    print(<span class="ss">f"Promedio: </span><span class="sk">{</span>promedio:<span class="sy">.1f</span><span class="sk">}</span><span class="ss"> — </span><span class="sk">{</span>clasificar_nota(promedio)<span class="sk">}</span><span class="ss">"</span>)
<span class="sy">=======</span>
    print(<span class="ss">f"Nota final del curso: </span><span class="sk">{</span>promedio:<span class="sy">.1f</span><span class="sk">}</span><span class="ss">"</span>)
<span class="sc">&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main</span>`,
              )}

              <div class="rounded-lg border border-[var(--border)] bg-[var(--bg2)] p-4 mb-4 text-sm space-y-2">
                <p class="font-mono text-xs font-bold text-[var(--accent)] mb-2">Cómo leer los marcadores</p>
                <p class="text-[var(--muted)] m-0">
                  <code class="text-[var(--accent)]">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>
                  → lo que tienes <strong>tú</strong> en tu rama actual
                </p>
                <p class="text-[var(--muted)] m-0">
                  <code class="text-[var(--yellow)]">=======</code>
                  → separador entre las dos versiones
                </p>
                <p class="text-[var(--muted)] m-0">
                  <code class="text-[var(--accent2)]">&gt;&gt;&gt;&gt;&gt;&gt;&gt; origin/main</code>
                  → lo que tiene <strong>main</strong> (el otro integrante)
                </p>
              </div>

              <p class="text-sm text-[var(--muted)] my-4 leading-relaxed">
                Editas el archivo manualmente, decides qué conservar (puedes quedarte con uno,
                con el otro, o combinarlos) y eliminas los marcadores:
              </p>
              ${codeBlock(
                "notas.py — conflicto resuelto",
                `<span class="sk">if</span> __name__ == <span class="ss">"__main__"</span>:
    notas = [<span class="sy">4.5</span>, <span class="sy">5.0</span>, <span class="sy">3.8</span>, <span class="sy">6.2</span>, <span class="sy">5.5</span>]
    promedio = calcular_promedio(notas)
    <span class="sc"># Combinamos ambas versiones: mensaje claro + clasificación</span>
    print(<span class="ss">f"Nota final del curso: </span><span class="sk">{</span>promedio:<span class="sy">.1f</span><span class="sk">}</span><span class="ss"> — </span><span class="sk">{</span>clasificar_nota(promedio)<span class="sk">}</span><span class="ss">"</span>)`,
              )}
              ${codeBlock(
                "terminal",
                `<span class="sc"># Marcar el conflicto como resuelto</span>
<span class="sa">git add</span> <span class="sn">notas.py</span>

<span class="sc"># Commitear la resolución</span>
<span class="sa">git commit -m</span> <span class="ss">"fix: resuelve conflicto en print combinando ambos mensajes"</span>

<span class="sc"># Subir la rama actualizada</span>
<span class="sa">git push origin feature/clasificar-nota</span>`,
              )}
              ${callout("tip", "✅ VSCode te ayuda", "Si usas VSCode, al abrir un archivo con conflictos muestra botones visuales: <em>Accept Current Change</em>, <em>Accept Incoming Change</em>, <em>Accept Both Changes</em>. No tienes que editar los marcadores a mano.")}
            `,
          })}

          ${step({
            id: "paso-7",
            num: "07",
            title: "Merge y limpieza",
            content: `
              <p class="text-sm text-[var(--muted)] mb-4 leading-relaxed">
                Con el conflicto resuelto y el PR aprobado, ya podemos hacer el merge.
                En GitHub, desde el PR, haz clic en <strong>Merge pull request → Confirm merge</strong>.
                Luego limpiamos las ramas que ya no necesitamos.
              </p>
              ${codeBlock(
                "terminal",
                `<span class="sc"># Volver a main</span>
<span class="sa">git switch main</span>

<span class="sc"># Traer los cambios del merge que se hizo en GitHub</span>
<span class="sa">git pull origin main</span>

<span class="sc"># Verificar que el historial refleja el merge</span>
<span class="sa">git log --oneline --graph</span>

<span class="sc"># Eliminar la rama local (ya fue mergeada)</span>
<span class="sa">git branch -d feature/clasificar-nota</span>

<span class="sc"># Eliminar la rama remota en GitHub</span>
<span class="sa">git push origin --delete feature/clasificar-nota</span>`,
              )}

              ${callout("tip", "✅ GitHub lo hace automático", 'Puedes configurar tu repositorio en GitHub (Settings → General → "Automatically delete head branches") para que elimine la rama remota automáticamente al hacer el merge. Así solo tienes que borrar la local.')}

              <div class="mt-8 rounded-xl border border-[var(--border)] bg-[var(--bg2)] p-6">
                <p class="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)] mb-4">Resumen del flujo completo</p>
                <div class="space-y-2">
                  ${[
                    {
                      cmd: "git init + git add + git commit",
                      desc: "Repositorio local con primer commit",
                    },
                    {
                      cmd: "git remote add + git push -u",
                      desc: "Conectado y subido a GitHub",
                    },
                    {
                      cmd: "git switch -c feature/...",
                      desc: "Rama para desarrollo aislado",
                    },
                    {
                      cmd: "commits + git push",
                      desc: "Cambios versionados y subidos",
                    },
                    {
                      cmd: "Pull Request en GitHub",
                      desc: "Revisión de código por el equipo",
                    },
                    {
                      cmd: "git fetch + git merge + resolver + commit",
                      desc: "Conflicto resuelto",
                    },
                    {
                      cmd: "Merge PR + git pull + git branch -d",
                      desc: "Integración final y limpieza",
                    },
                  ]
                    .map(
                      (r) => `
                    <div class="flex items-start gap-3 py-2 border-b border-[var(--border)] last:border-0">
                      <code class="font-mono text-[11px] text-[var(--accent3)] flex-shrink-0 pt-0.5">${r.cmd}</code>
                      <span class="text-xs text-[var(--muted)]">→ ${r.desc}</span>
                    </div>`,
                    )
                    .join("")}
                </div>
              </div>
            `,
          })}

        </div>
      </div>
    </div>`;
}
