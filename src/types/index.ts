export interface Route {
  path: string;
  label: string;
  icon: string;
  view: () => Promise<{ render: () => string }>;
}

export type Theme = "light" | "dark";
