/**
 * @fileoverview Componente de Indicador de Força de Senha
 *
 * Este componente exibe uma barra de progresso visual que indica a força da senha
 * e uma lista de requisitos que a senha deve atender para ser considerada segura.
 *
 * ## Funcionalidades:
 * - Barra de força com 4 níveis: Muito Fraca, Fraca, Média, Forte
 * - Lista de requisitos com ícones de check/x
 * - Cores indicativas (vermelho → laranja → amarelo → verde)
 * - Atualização em tempo real conforme o usuário digita
 * - Suporte a internacionalização (PT/EN)
 *
 * ## Requisitos de Senha:
 * 1. Mínimo de 8 caracteres
 * 2. Pelo menos uma letra maiúscula (A-Z)
 * 3. Pelo menos um número (0-9)
 * 4. Pelo menos um caractere especial (!@#$%^&*...)
 *
 * ## Níveis de Força:
 * - 0-1 requisitos: Muito Fraca (vermelho)
 * - 2 requisitos: Fraca (laranja)
 * - 3 requisitos: Média (amarelo)
 * - 4 requisitos: Forte (verde)
 *
 * @example
 * ```tsx
 * import PasswordStrength from '../components/PasswordStrength';
 *
 * function SignupForm() {
 *   const [password, setPassword] = useState('');
 *   const t = getTranslations('pt');
 *
 *   return (
 *     <div>
 *       <input
 *         type="password"
 *         value={password}
 *         onChange={(e) => setPassword(e.target.value)}
 *       />
 *       <PasswordStrength password={password} translations={t} />
 *     </div>
 *   );
 * }
 * ```
 */

import type { Translations } from "../i18n";

/**
 * Props do componente PasswordStrength
 */
interface PasswordStrengthProps {
  /** A senha atual digitada pelo usuário */
  password: string;
  /** Objeto de traduções para internacionalização */
  translations: Translations;
}

/**
 * Resultado da validação de um requisito individual de senha
 */
interface PasswordRequirement {
  /** Chave única para identificar o requisito */
  key: string;
  /** Texto descritivo do requisito (traduzido) */
  label: string;
  /** Se o requisito foi atendido pela senha atual */
  met: boolean;
}

/**
 * Valida a senha contra todos os requisitos de segurança
 *
 * @param password - A senha a ser validada
 * @param t - Objeto de traduções
 * @returns Array de requisitos com status de validação
 *
 * @example
 * ```ts
 * const requirements = validatePasswordRequirements('Abc123!@', translations);
 * // Retorna: [{ key: 'minLength', label: '...', met: true }, ...]
 * ```
 */
function validatePasswordRequirements(
  password: string,
  t: Translations
): PasswordRequirement[] {
  return [
    {
      key: "minLength",
      label: t.passwordReqMinLength,
      met: password.length >= 8,
    },
    {
      key: "uppercase",
      label: t.passwordReqUppercase,
      met: /[A-Z]/.test(password),
    },
    {
      key: "number",
      label: t.passwordReqNumber,
      met: /[0-9]/.test(password),
    },
    {
      key: "special",
      label: t.passwordReqSpecial,
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];
}

/**
 * Calcula o nível de força da senha baseado nos requisitos atendidos
 *
 * @param requirements - Array de requisitos validados
 * @returns Número de 0 a 4 representando a força
 *
 * Níveis:
 * - 0: Nenhum requisito atendido
 * - 1: 1 requisito atendido (Muito Fraca)
 * - 2: 2 requisitos atendidos (Fraca)
 * - 3: 3 requisitos atendidos (Média)
 * - 4: Todos os requisitos atendidos (Forte)
 */
function calculateStrength(requirements: PasswordRequirement[]): number {
  return requirements.filter((req) => req.met).length;
}

/**
 * Retorna a configuração visual baseada na força da senha
 *
 * @param strength - Nível de força (0-4)
 * @param t - Objeto de traduções
 * @returns Objeto com label traduzido e classe CSS
 */
function getStrengthConfig(
  strength: number,
  t: Translations
): { label: string; className: string } {
  switch (strength) {
    case 0:
    case 1:
      return { label: t.passwordStrengthVeryWeak, className: "very-weak" };
    case 2:
      return { label: t.passwordStrengthWeak, className: "weak" };
    case 3:
      return { label: t.passwordStrengthMedium, className: "medium" };
    case 4:
      return { label: t.passwordStrengthStrong, className: "strong" };
    default:
      return { label: t.passwordStrengthVeryWeak, className: "very-weak" };
  }
}

/**
 * Componente que exibe o indicador de força de senha e lista de requisitos
 *
 * Renderiza:
 * 1. Barra de progresso segmentada com cores indicativas
 * 2. Label textual da força atual
 * 3. Lista de requisitos com ícones de validação
 *
 * @param props - Props do componente
 * @param props.password - Senha atual
 * @param props.translations - Traduções i18n
 */
export default function PasswordStrength({
  password,
  translations: t,
}: PasswordStrengthProps) {
  // Valida todos os requisitos da senha
  const requirements = validatePasswordRequirements(password, t);

  // Calcula a força baseada nos requisitos atendidos
  const strength = calculateStrength(requirements);

  // Obtém configuração visual (label e classe CSS)
  const strengthConfig = getStrengthConfig(strength, t);

  // Não exibe nada se a senha estiver vazia
  if (!password) {
    return null;
  }

  return (
    <div className="password-strength-container">
      {/* Barra de força visual */}
      <div className="password-strength-bar">
        <div className="strength-segments">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`strength-segment ${
                strength >= level ? strengthConfig.className : ""
              }`}
            />
          ))}
        </div>
        <span className={`strength-label ${strengthConfig.className}`}>
          {strengthConfig.label}
        </span>
      </div>

      {/* Lista de requisitos */}
      <div className="password-requirements">
        <p className="requirements-title">{t.passwordMustContain}</p>
        <ul className="requirements-list">
          {requirements.map((req) => (
            <li
              key={req.key}
              className={`requirement-item ${req.met ? "met" : "unmet"}`}
            >
              {/* Ícone de check ou X */}
              <span className="requirement-icon">
                {req.met ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="M5 12l5 5L20 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                )}
              </span>
              <span className="requirement-text">{req.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Exporta tipos e funções utilitárias para uso em testes ou outros componentes
export type { PasswordStrengthProps, PasswordRequirement };
export { validatePasswordRequirements, calculateStrength, getStrengthConfig };
