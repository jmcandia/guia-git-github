import { sectionHeader, codeBlock, callout } from "../components/ui";

export function render(): string {
  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("04 · Comandos esenciales", "Los comandos que usarás todos los días")}

      <p class="text-lg text-[var(--muted)] mb-10 leading-relaxed">
        No necesitas memorizar todos los comandos de Git. Con estos ya puedes trabajar de forma profesional.
      </p>

      <h3 class="font-display text-xl font-bold text-[var(--text)] mb-4">Crear e inicializar repositorios</h3>
      ${codeBlock(
        "terminal",
        `<span class="sc"># Crear un repositorio nuevo en la carpeta actual</span>
<span class="sa">git init</span>

<span class="sc"># Clonar un repositorio existente desde GitHub</span>
<span class="sa">git clone</span> <span class="ss">https://github.com/usuario/repositorio.git</span>

<span class="sc"># Clonar en una carpeta con nombre específico</span>
<span class="sa">git clone</span> <span class="ss">https://github.com/usuario/repo.git</span> <span class="sn">mi-carpeta</span>`,
      )}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-4">El ciclo básico: add → commit</h3>
      ${codeBlock(
        "flujo de trabajo diario",
        `<span class="sc"># Ver el estado actual de tus archivos</span>
<span class="sa">git status</span>

<span class="sc"># Agregar UN archivo al staging area</span>
<span class="sa">git add</span> <span class="sn">archivo.py</span>

<span class="sc"># Agregar TODOS los archivos modificados</span>
<span class="sa">git add .</span>

<span class="sc"># Crear un commit con un mensaje</span>
<span class="sa">git commit -m</span> <span class="ss">"feat: agrega autenticación de usuarios"</span>

<span class="sc"># Ver el historial de commits</span>
<span class="sa">git log --oneline --graph --all</span>`,
      )}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-4">Trabajar con ramas</h3>
      ${codeBlock(
        "branches",
        `<span class="sc"># Ver todas las ramas (la activa tiene un *)</span>
<span class="sa">git branch</span>

<span class="sc"># Crear una rama Y cambiarse a ella (forma moderna)</span>
<span class="sa">git switch -c</span> <span class="sn">feature/login</span>

<span class="sc"># Fusionar una rama hacia la rama actual</span>
<span class="sa">git merge</span> <span class="sn">feature/login</span>

<span class="sc"># Eliminar una rama (solo si ya fue mergeada)</span>
<span class="sa">git branch -d</span> <span class="sn">feature/login</span>`,
      )}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-4">Sincronizar con GitHub</h3>
      ${codeBlock(
        "remote · sincronización",
        `<span class="sc"># Subir cambios al repositorio remoto</span>
<span class="sa">git push origin</span> <span class="sn">main</span>

<span class="sc"># Bajar cambios del repositorio remoto</span>
<span class="sa">git pull origin</span> <span class="sn">main</span>

<span class="sc"># Agregar un remoto (cuando usas git init en vez de clone)</span>
<span class="sa">git remote add origin</span> <span class="ss">https://github.com/usuario/repo.git</span>`,
      )}

      <h3 class="font-display text-xl font-bold text-[var(--text)] mt-10 mb-4">Deshacer errores</h3>
      ${codeBlock(
        "deshacer cambios",
        `<span class="sc"># Sacar un archivo del staging (sin perder los cambios)</span>
<span class="sa">git restore --staged</span> <span class="sn">archivo.py</span>

<span class="sc"># Descartar los cambios de un archivo</span>
<span class="sa">git restore</span> <span class="sn">archivo.py</span>

<span class="sc"># Deshacer el último commit (mantiene los cambios en staging)</span>
<span class="sa">git reset --soft HEAD~1</span>

<span class="sc"># Guardar cambios temporalmente sin hacer commit</span>
<span class="sa">git stash</span>
<span class="sa">git stash pop</span>   <span class="sc"># recuperar lo guardado</span>`,
      )}

      ${callout("warn", "⚠️ Con cuidado", "<code>git reset --hard</code> es el comando más peligroso de Git. Elimina los cambios de forma permanente. Úsalo solo si estás seguro de lo que haces.")}
    </div>`;
}
