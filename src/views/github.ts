import { sectionHeader, codeBlock, callout, stepList } from "../components/ui";

export function render(): string {
  const steps = [
    {
      title: "Crear un repositorio en GitHub",
      desc: 'Ve a github.com → botón "New" → ponle nombre, elige público/privado → Create repository.',
    },
    {
      title: "Conectar tu repo local con GitHub",
      desc: "Si ya tienes código local, conectas con <code>git remote add origin URL</code>.",
    },
    {
      title: "Subir tu código (push)",
      desc: "Con <code>git push origin main</code> subes tus commits. La primera vez puede que necesites autenticarte.",
    },
    {
      title: "Pull Requests (PR)",
      desc: "Cuando trabajas en equipo, no fusionas directamente. Creas un PR para que otro miembro revise tu código.",
    },
    {
      title: "Issues y Projects",
      desc: "GitHub tiene un sistema de tareas (Issues) y tableros de proyecto para organizar el trabajo del equipo.",
    },
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("05 · GitHub", "Trabajando con GitHub")}

      <p class="text-lg text-[var(--muted)] mb-10 leading-relaxed">
        GitHub es la red social del código. Es donde subes tus repositorios, colaboras con otros
        y compartes tu trabajo con el mundo.
      </p>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mb-6">Flujo básico de trabajo</h3>
      ${stepList(steps)}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-12 mb-4">El archivo .gitignore</h3>
      <p class="text-sm text-[var(--muted)] mb-4">
        Le dice a Git qué archivos <strong>no</strong> debe rastrear. Útil para excluir claves,
        dependencias y archivos del sistema:
      </p>

      ${codeBlock(
        ".gitignore · Python + Node",
        `<span class="sc"># Dependencias de Node</span>
<span class="ss">node_modules/</span>

<span class="sc"># Variables de entorno (¡NUNCA subas tus claves!)</span>
<span class="ss">.env</span>
<span class="ss">.env.local</span>

<span class="sc"># Python</span>
<span class="ss">__pycache__/</span>
<span class="ss">*.pyc</span>
<span class="ss">venv/</span>

<span class="sc"># Java / Maven</span>
<span class="ss">target/</span>
<span class="ss">*.class</span>

<span class="sc"># IDEs</span>
<span class="ss">.idea/</span>
<span class="ss">.vscode/</span>`,
      )}

      ${callout("tip", "✅ Tip", 'Puedes generar automáticamente un <code>.gitignore</code> para tu lenguaje en <a href="https://gitignore.io" target="_blank" class="text-[var(--accent2)] underline underline-offset-2">gitignore.io</a>.')}
    </div>`;
}
