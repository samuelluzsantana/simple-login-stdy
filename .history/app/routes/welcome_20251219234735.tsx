import type { MetaFunction } from "react-router";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "../styles/login.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Bem-vindo!" },
    { name: "description", content: "Página de boas-vindas" },
  ];
};

export default function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Pega o nome do usuário do state da navegação
    const state = location.state as { userName?: string } | null;
    if (state?.userName) {
      setUserName(state.userName);
    } else {
      // Se não tiver nome, redireciona para login
      navigate("/");
    }
  }, [location, navigate]);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
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

      {/* Welcome Card */}
      <div className="login-card welcome-card">
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
          <div className="logo success-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                d="M20 6L9 17l-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
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

        {/* Welcome Message */}
        <h1 className="title welcome-title">Bem-vindo!</h1>
        <p className="subtitle welcome-name">{userName}</p>
        <p className="welcome-message">
          Seu cadastro foi realizado com sucesso.
        </p>

        {/* Logout Button */}
        <button onClick={handleLogout} className="login-button logout-button">
          Sair
        </button>
      </div>
    </div>
  );
}
