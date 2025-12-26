/**
 * @fileoverview Schema de Validação para Cadastro de Usuário
 *
 * Este módulo define o schema Zod para validação do formulário de cadastro.
 * Utiliza traduções dinâmicas para suportar internacionalização (i18n).
 *
 * ## Campos Validados:
 *
 * ### Nome (name)
 * - Obrigatório
 * - Mínimo de 2 caracteres
 *
 * ### Email (email)
 * - Obrigatório
 * - Deve ser um email válido (formato user@domain.com)
 *
 * ### Senha (password)
 * - Obrigatória
 * - Mínimo de 8 caracteres
 * - Deve conter pelo menos uma letra maiúscula (A-Z)
 * - Deve conter pelo menos uma letra minúscula (a-z)
 * - Deve conter pelo menos um número (0-9)
 * - Deve conter pelo menos um caractere especial (!@#$%^&*()_+-=[]{}|;':",.<>/?)
 *
 * ### Confirmação de Senha (confirmPassword)
 * - Obrigatória
 * - Deve ser igual à senha
 *
 * ## Exemplo de Uso:
 *
 * ```typescript
 * import { createSignupSchema, type SignupFormData } from '../schemas/signup';
 * import { getTranslations } from '../i18n';
 *
 * const t = getTranslations('pt');
 * const schema = createSignupSchema(t);
 *
 * // Validar dados
 * const result = schema.safeParse({
 *   name: 'João Silva',
 *   email: 'joao@email.com',
 *   password: 'Senha123!',
 *   confirmPassword: 'Senha123!'
 * });
 *
 * if (result.success) {
 *   console.log('Dados válidos:', result.data);
 * } else {
 *   console.log('Erros:', result.error.issues);
 * }
 * ```
 *
 * ## Regex de Validação:
 *
 * | Requisito | Regex | Descrição |
 * |-----------|-------|-----------|
 * | Maiúscula | `/[A-Z]/` | Pelo menos uma letra A-Z |
 * | Minúscula | `/[a-z]/` | Pelo menos uma letra a-z |
 * | Número | `/[0-9]/` | Pelo menos um dígito 0-9 |
 * | Especial | `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/` | Caracteres especiais comuns |
 *
 * @module schemas/signup
 */

import { z } from "zod";
import type { Translations } from "../i18n";

/**
 * Regex para validação de caracteres especiais na senha.
 * Inclui os caracteres mais comuns usados em senhas seguras.
 */
const SPECIAL_CHARS_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

/**
 * Cria o schema de validação para o formulário de cadastro.
 *
 * @param t - Objeto de traduções para mensagens de erro localizadas
 * @returns Schema Zod configurado com validações e mensagens traduzidas
 *
 * @example
 * ```typescript
 * const schema = createSignupSchema(translations);
 * const result = schema.safeParse(formData);
 * ```
 */
export function createSignupSchema(t: Translations) {
  return z
    .object({
      /**
       * Nome completo do usuário
       * - Não pode ser vazio
       * - Mínimo de 2 caracteres
       */
      name: z.string().min(1, t.nameRequired).min(2, t.nameMinLength),

      /**
       * Endereço de email
       * - Não pode ser vazio
       * - Deve ter formato de email válido
       */
      email: z.string().min(1, t.emailRequired).email(t.emailInvalid),

      /**
       * Senha do usuário
       * - Não pode ser vazia
       * - Mínimo de 8 caracteres
       * - Deve conter letra maiúscula
       * - Deve conter letra minúscula
       * - Deve conter número
       * - Deve conter caractere especial
       */
      password: z
        .string()
        .min(1, t.passwordRequired)
        .min(8, t.passwordMinLength)
        .regex(/[A-Z]/, t.passwordUppercase)
        .regex(/[a-z]/, t.passwordLowercase)
        .regex(/[0-9]/, t.passwordNumber)
        .regex(SPECIAL_CHARS_REGEX, t.passwordSpecial),

      /**
       * Confirmação da senha
       * - Não pode ser vazia
       * - Validação de igualdade feita no refine()
       */
      confirmPassword: z.string().min(1, t.confirmPasswordRequired),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t.passwordsMustMatch,
      path: ["confirmPassword"],
    });
}

/**
 * Tipo inferido do schema de cadastro.
 * Útil para tipar o estado do formulário e props de componentes.
 *
 * @example
 * ```typescript
 * const [formData, setFormData] = useState<SignupFormData>({
 *   name: '',
 *   email: '',
 *   password: '',
 *   confirmPassword: ''
 * });
 * ```
 */
export type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;
