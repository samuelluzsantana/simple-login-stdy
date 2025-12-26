import { Outlet, useParams } from "react-router";
import { isValidLanguage } from "../i18n";

/**
 * Layout Route que captura o parâmetro :lang da URL.
 *
 * Este componente valida se o idioma é suportado e renderiza
 * as rotas filhas através do <Outlet />.
 *
 * URLs suportadas:
 * - /en -> lang = "en"
 * - /en/signup -> lang = "en"
 * - /es/signup -> lang = "es" (se adicionado à lista de idiomas)
 */
export default function LangProvider() {
  const { lang } = useParams<{ lang: string }>();

  // Valida se o idioma é suportado
  // Se não for válido, o React Router tratará como 404
  // ou você pode redirecionar para o idioma padrão
  if (lang && !isValidLanguage(lang)) {
    // Aqui você pode:
    // 1. Retornar null para deixar o React Router mostrar 404
    // 2. Usar <Navigate> para redirecionar
    // 3. Mostrar uma página de erro personalizada
    throw new Response("Language not supported", { status: 404 });
  }

  return <Outlet />;
}
