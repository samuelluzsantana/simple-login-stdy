import type { MetaFunction } from "react-router";
import { useState } from "react";
import { useLocation, Link } from "react-router";
import {
  getLanguageFromPath,
  getTranslations,
  getLocalizedPath,
} from "../i18n";
import { createSignupSchema } from "../schemas/signup";
import "../styles/login.css";
import Aurora from "../components/Aurora";
import PasswordStrength from "../components/PasswordStrength";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Account" },
    { name: "description", content: "Create your account" },
  ];
};

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Signup() {
  const location = useLocation();
  const lang = getLanguageFromPath(location.pathname);
  const t = getTranslations(lang);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name);
  };

  const validateField = (fieldName: string) => {
    const schema = createSignupSchema(t);
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (err) => err.path[0] === fieldName
      );
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [fieldName]: fieldError.message }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const schema = createSignupSchema(t);
    const result = schema.safeParse(formData);

    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!newErrors[field]) {
          newErrors[field] = err.message;
        }
      });
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    // Form is valid - here you would call the API
    console.log("Form submitted:", result.data);
  };

  const loginPath = getLocalizedPath("/", lang);
  const otherLang = lang === "pt" ? "en" : "pt";
  const switchLangPath = getLocalizedPath("/signup", otherLang);

  return (
    <div className="login-container">
      {/* Animated Background Gradients */}
      <div className="gradient-background">
        <LinearGradient
          size={500}
          primaryColors={["#0066FF", "#6FFFDC"]}
          secondaryColors={["#2FCFF2", "#BAEAFF"]}
          className="gradient-orb gradient-orb-1"
        />
      </div>

      {/* Language Switcher */}
      <div className="language-switcher">
        <Link to={switchLangPath} className="lang-link">
          {lang === "pt" ? "🇺🇸 EN" : "🇧🇷 PT"}
        </Link>
      </div>

      {/* Signup Card */}
      <div className="login-card">
        {/* Logo */}
        <div className="logo-container">
          <div className="code-dots">
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
          <div className="logo">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="code-dots">
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="title">{t.createAccount}</h1>
        <p className="subtitle">
          {t.alreadyHaveAccount}{" "}
          <Link to={loginPath} className="signup-link">
            {t.signIn}
          </Link>
        </p>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a8.5 8.5 0 0117 0" />
              </svg>
            </span>
            <input
              type="text"
              name="name"
              placeholder={t.namePlaceholder}
              className={`input-field ${touched.name && errors.name ? "input-error" : ""}`}
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
            />
          </div>
          {touched.name && errors.name && (
            <p className="field-error">{errors.name}</p>
          )}

          {/* Email Field */}
          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6L12 13L2 6" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              className={`input-field ${touched.email && errors.email ? "input-error" : ""}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
            />
          </div>
          {touched.email && errors.email && (
            <p className="field-error">{errors.email}</p>
          )}

          {/* Password Field */}
          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </span>
            <input
              type="password"
              name="password"
              placeholder={t.passwordPlaceholder}
              className={`input-field ${touched.password && errors.password ? "input-error" : ""}`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
          </div>

          {/* Password Strength Indicator */}
          <PasswordStrength password={formData.password} translations={t} />

          {/* Confirm Password Field */}
          <div className="input-group">
            <span className="input-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
                <path d="M12 16v2" />
              </svg>
            </span>
            <input
              type="password"
              name="confirmPassword"
              placeholder={t.confirmPasswordPlaceholder}
              className={`input-field ${touched.confirmPassword && errors.confirmPassword ? "input-error" : ""}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
            />
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="field-error">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="login-button">
            {t.signupButton}
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>{t.orSignUpWith}</span>
        </div>

        {/* Social Login */}
        <div className="social-buttons">
          <button
            type="button"
            className="social-button"
            aria-label={t.loginWithApple}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </button>
          <button
            type="button"
            className="social-button"
            aria-label={t.loginWithGoogle}
          >
            <svg viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="social-button"
            aria-label={t.loginWithX}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
