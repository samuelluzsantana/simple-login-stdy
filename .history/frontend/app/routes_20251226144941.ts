import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Suas rotas principais definidas uma única vez (DRY)
const publicRoutes = [
  index("routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
];

export default [
  // 1. Rota Raiz (Português implícito)
  ...publicRoutes,

  // 2. Rota com Prefixo de Idioma Dinâmico
  // O layout 'routes/lang-provider.tsx' vai ler o param :lang e configurar o i18n
  // Captura /en, /en/signup, /es, /es/signup, etc.
  route(":lang", "routes/lang-provider.tsx", publicRoutes),
] satisfies RouteConfig;
