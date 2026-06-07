import Navigo from "navigo";
import { setActiveNavLink } from "../components/nav";
import { syncToggleIcon } from "../components/theme";
import type { Route } from "../types";
import { initCopyButtons } from "../components/ui";

const VIEW_CONTAINER_ID = "app-view";

export const routes: Route[] = [
  {
    path: "/",
    label: "Inicio",
    icon: "◆",
    view: () => import("../views/home"),
  },
  {
    path: "/que-es-git",
    label: "¿Qué es Git?",
    icon: "◆",
    view: () => import("../views/que-es-git"),
  },
  {
    path: "/install",
    label: "Instalación",
    icon: "◆",
    view: () => import("../views/instalacion"),
  },
  {
    path: "/conceptos",
    label: "Conceptos base",
    icon: "◆",
    view: () => import("../views/conceptos"),
  },
  {
    path: "/comandos",
    label: "Comandos",
    icon: "◆",
    view: () => import("../views/comandos"),
  },
  {
    path: "/github",
    label: "GitHub",
    icon: "◆",
    view: () => import("../views/github"),
  },
  {
    path: "/commits",
    label: "Conventional Commits",
    icon: "◆",
    view: () => import("../views/commits"),
  },
  {
    path: "/gitmoji",
    label: "Gitmoji",
    icon: "◆",
    view: () => import("../views/gitmoji"),
  },
  {
    path: "/branching",
    label: "Branching",
    icon: "◆",
    view: () => import("../views/branching"),
  },
  {
    path: "/cheatsheet",
    label: "Cheatsheet",
    icon: "◆",
    view: () => import("../views/cheatsheet"),
  },
  {
    path: "/ejemplo",
    label: "Ejemplo",
    icon: "◆",
    view: () => import("../views/ejemplo"),
  },
];

async function renderView(route: Route): Promise<void> {
  const container = document.getElementById(VIEW_CONTAINER_ID);
  if (!container) return;

  const mod = await route.view();
  container.innerHTML = mod.render();

  if (
    "initTabs" in mod &&
    typeof (mod as { initTabs?: () => void }).initTabs === "function"
  ) {
    (mod as { initTabs: () => void }).initTabs();
  }

  initCopyButtons(); // ← agrega esta línea

  window.scrollTo({ top: 0, behavior: "instant" });
  container.style.animation = "none";
  container.offsetHeight;
  container.style.animation = "";

  setActiveNavLink(route.path);
  syncToggleIcon();
}

export function initRouter(): void {
  // const router = new Navigo("/");
  const router = new Navigo("/guia-git-github/");

  routes.forEach((route) => {
    router.on(route.path, () => renderView(route));
  });

  // Fallback a home
  router.notFound(() => renderView(routes[0]));

  router.resolve();
}
