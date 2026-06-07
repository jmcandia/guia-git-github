import { sectionHeader } from "../components/ui";

interface CheatGroup {
  title: string;
  color: string;
  cmds: { cmd: string; desc: string }[];
}

export function render(): string {
  const groups: CheatGroup[] = [
    {
      title: "CONFIGURACIÓN",
      color: "var(--yellow)",
      cmds: [
        {
          cmd: 'git config --global user.name "Nombre"',
          desc: "Configura tu nombre",
        },
        {
          cmd: 'git config --global user.email "mail"',
          desc: "Configura tu email",
        },
        { cmd: "git config --list", desc: "Ver configuración" },
      ],
    },
    {
      title: "INICIAR REPO",
      color: "var(--accent)",
      cmds: [
        { cmd: "git init", desc: "Crear repo local" },
        { cmd: "git clone <url>", desc: "Clonar repo" },
        { cmd: "git remote add origin <url>", desc: "Conectar a remoto" },
      ],
    },
    {
      title: "ESTADO",
      color: "var(--accent2)",
      cmds: [
        { cmd: "git status", desc: "Ver archivos modificados" },
        { cmd: "git diff", desc: "Ver cambios en detalle" },
        { cmd: "git log --oneline --graph", desc: "Historial visual" },
        { cmd: "git show <hash>", desc: "Ver un commit" },
      ],
    },
    {
      title: "STAGING & COMMITS",
      color: "var(--accent3)",
      cmds: [
        { cmd: "git add <archivo>", desc: "Agregar al stage" },
        { cmd: "git add .", desc: "Agregar todos" },
        { cmd: 'git commit -m ""', desc: "Crear commit" },
        { cmd: "git commit --amend", desc: "Editar último commit" },
      ],
    },
    {
      title: "RAMAS",
      color: "var(--accent4)",
      cmds: [
        { cmd: "git branch", desc: "Listar ramas" },
        { cmd: "git switch -c <nombre>", desc: "Crear y cambiar" },
        { cmd: "git merge <rama>", desc: "Fusionar rama" },
        { cmd: "git branch -d <rama>", desc: "Eliminar rama" },
        { cmd: "git rebase <rama>", desc: "Rebase" },
      ],
    },
    {
      title: "REMOTO",
      color: "var(--accent2)",
      cmds: [
        { cmd: "git push origin <rama>", desc: "Subir cambios" },
        { cmd: "git pull origin <rama>", desc: "Bajar cambios" },
        { cmd: "git fetch --all", desc: "Actualizar referencias" },
        { cmd: "git remote -v", desc: "Ver remotos" },
      ],
    },
    {
      title: "DESHACER",
      color: "var(--accent)",
      cmds: [
        { cmd: "git restore <archivo>", desc: "Descartar cambios locales" },
        { cmd: "git restore --staged <archivo>", desc: "Sacar del staging" },
        { cmd: "git reset --soft HEAD~1", desc: "Deshacer commit (safe)" },
        { cmd: "git revert <hash>", desc: "Revertir sin reescribir" },
      ],
    },
    {
      title: "STASH",
      color: "var(--yellow)",
      cmds: [
        { cmd: "git stash", desc: "Guardar temporalmente" },
        { cmd: "git stash pop", desc: "Recuperar último stash" },
        { cmd: "git stash list", desc: "Ver todos los stashes" },
        { cmd: "git stash drop", desc: "Eliminar último stash" },
      ],
    },
  ];

  return `
    <div class="max-w-5xl mx-auto px-4 py-14">
      ${sectionHeader("09 · Referencia rápida", "Cheatsheet de comandos Git")}

      <p class="text-lg text-[var(--muted)] mb-10 leading-relaxed">
        Todos los comandos más usados organizados por categoría. Guarda esta página como referencia.
      </p>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        ${groups
          .map(
            (g) => `
          <div class="rounded-xl border border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
            <div class="px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg3)]">
              <span class="font-mono text-[11px] font-bold tracking-widest"
                    style="color:${g.color}">${g.title}</span>
            </div>
            <div class="divide-y divide-[var(--border)]">
              ${g.cmds
                .map(
                  (c) => `
                <div class="px-4 py-2.5">
                  <code class="block font-mono text-[11px] mb-0.5"
                        style="color:${g.color}">${c.cmd}</code>
                  <span class="text-xs text-[var(--muted)]">${c.desc}</span>
                </div>`,
                )
                .join("")}
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;
}
