import { type RouteConfig, index, route } from "@react-router/dev/routes";

/**
 * Configuração de Rotas com Suporte a Internacionalização (i18n)
 *
 * Estrutura:
 * - Rotas raiz (/) -> Idioma padrão (português)
 * - Rotas com prefixo (/:lang/) -> Idioma dinâmico
 *
 * URLs suportadas:
 * - /           -> Login (PT)
 * - /signup     -> Signup (PT)
 * - /en         -> Login (EN)
 * - /en/signup  -> Signup (EN)
 */
export default [
  // 1. Rotas Raiz (Português/padrão)
  index("routes/login.tsx"),
  route("signup", "routes/signup.tsx"),

  // 2. Rotas com Prefixo de Idioma
  // O layout lê o param :lang e valida o idioma
  route(":lang", "routes/lang-provider.tsx", [
    // Usando 'id' explícito para evitar conflito com rotas raiz
    { index: true, file: "routes/login.tsx", id: "lang-login" },
    { path: "signup", file: "routes/signup.tsx", id: "lang-signup" },
  ]),
] satisfies RouteConfig;
