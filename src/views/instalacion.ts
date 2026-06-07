import { sectionHeader, codeBlock, callout } from "../components/ui";

export function render(): string {
  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("02 · Configuración inicial", "Instalación y configuración")}

      <p class="text-lg text-[var(--muted)] mb-10 leading-relaxed">
        Antes de empezar, necesitas tener Git instalado en tu computador y configurar tu identidad.
      </p>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-8 mb-4">Instalar Git</h3>

      <div class="space-y-6">
        <div>
          <h4 class="font-mono text-sm font-semibold text-[var(--accent2)] mb-2">Windows</h4>
          <p class="text-sm text-[var(--muted)] mb-3">
            Descarga el instalador desde
            <a href="https://git-scm.com/download/win" target="_blank"
               class="text-[var(--accent2)] underline underline-offset-2">git-scm.com</a>.
            Deja las opciones por defecto. Se instala también <strong>Git Bash</strong>.
          </p>
        </div>

        <div>
          <h4 class="font-mono text-sm font-semibold text-[var(--accent2)] mb-2">macOS</h4>
          ${codeBlock(
            "terminal · macOS",
            `<span class="sc"># Opción 1: Con Homebrew (recomendado)</span>
<span class="sa">brew install git</span>

<span class="sc"># Opción 2: Xcode Command Line Tools</span>
<span class="sa">xcode-select --install</span>`,
          )}
        </div>

        <div>
          <h4 class="font-mono text-sm font-semibold text-[var(--accent2)] mb-2">Linux (Ubuntu/Debian)</h4>
          ${codeBlock("terminal · Linux", `<span class="sa">sudo apt update && sudo apt install git</span>`)}
        </div>
      </div>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-4">Verificar la instalación</h3>
      ${codeBlock(
        "terminal",
        `<span class="sa">git --version</span>
<span class="sc"># git version 2.44.0</span>`,
      )}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-4">Configuración inicial (obligatoria)</h3>
      <p class="text-sm text-[var(--muted)] mb-4">
        Lo primero que debes hacer es decirle a Git quién eres. Esta información aparece en cada commit que hagas:
      </p>

      ${codeBlock(
        "terminal",
        `<span class="sc"># Tu nombre (el que aparecerá en el historial)</span>
<span class="sa">git config --global user.name</span> <span class="ss">"Tu Nombre"</span>

<span class="sc"># Tu correo (el mismo que usas en GitHub)</span>
<span class="sa">git config --global user.email</span> <span class="ss">"tucorreo@ejemplo.com"</span>

<span class="sc"># Editor por defecto (VSCode en este caso)</span>
<span class="sa">git config --global core.editor</span> <span class="ss">"code --wait"</span>

<span class="sc"># Verificar que quedó todo bien</span>
<span class="sa">git config --list</span>`,
      )}

      ${callout("warn", "⚠️ Importante", "El flag <code>--global</code> aplica la configuración para todos los repositorios. Si necesitas una configuración distinta para un proyecto específico, usa el mismo comando sin <code>--global</code> dentro de ese repositorio.")}
    </div>`;
}
