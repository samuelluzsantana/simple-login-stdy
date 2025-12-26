import type { MetaFunction } from "react-router";
import { useLocation, Link } from "react-router";
import { getLanguageFromPath, getTranslations, getLocalizedPath } from "../i18n";
import "../styles/login.css";
import LinearGradient from "../components/LinearGradient";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - Welcome Back" },
    { name: "description", content: "Login to your account" },
  ];
};

export default function Login() {
  const location = useLocation();
  const lang = getLanguageFromPath(location.pathname);
  const t = getTranslations(lang);

  const signupPath = getLocalizedPath("/signup", lang);
  const otherLang = lang === "pt" ? "en" : "pt";
  const switchLangPath = getLocalizedPath("/", otherLang);

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

      {/* Decorative elements */}
      <div className="decoration top-left">
        <div className="chip">
          <div className="chip-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="chip-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="connector horizontal"></div>
        <div className="node"></div>
      </div>

      <div className="decoration top-right">
        <div className="node"></div>
        <div className="connector horizontal"></div>
        <div className="chip">
          <div className="chip-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="chip-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="decoration bottom-left">
        <div className="chip">
          <div className="chip-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="chip-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="connector horizontal"></div>
        <div className="node"></div>
      </div>

      <div className="decoration bottom-right">
        <div className="node"></div>
        <div className="connector horizontal"></div>
        <div className="chip">
          <div className="chip-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="chip-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Login Card */}
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
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">
          Don't have an account yet?{" "}
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </p>

        {/* Form */}
        <form className="login-form">
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
              placeholder="email address"
              className="input-field"
              autoComplete="email"
            />
          </div>

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
              placeholder="Password"
              className="input-field"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Social Login */}
        <div className="social-buttons">
          <button
            type="button"
            className="social-button"
            aria-label="Login with Apple"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          </button>
          <button
            type="button"
            className="social-button"
            aria-label="Login with Google"
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
            aria-label="Login with X"
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
