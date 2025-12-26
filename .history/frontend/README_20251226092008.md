# Frontend - Login Page

Uma página de login moderna e responsiva construída com React Router e TypeScript.

## 🚀 Tecnologias

- **React Router v7** - Framework de roteamento e SSR
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **CSS Puro** - Estilização customizada

## 📁 Estrutura de Pastas

```
frontend/
├── app/
│   ├── routes/
│   │   └── login.tsx       # Página de login
│   ├── styles/
│   │   └── login.css       # Estilos da página
│   ├── root.tsx            # Layout raiz
│   ├── routes.ts           # Configuração de rotas
│   └── app.css             # Estilos globais
├── public/
│   └── favicon.ico         # Ícone do site
├── package.json
├── tsconfig.json
├── vite.config.ts
└── react-router.config.ts
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install
```

## 💻 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

## 🏗️ Build

```bash
# Criar build de produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🐳 Docker

```bash
# Build da imagem
docker build -t login-frontend .

# Rodar container
docker run -p 3000:3000 login-frontend
```

## 📝 Componentes

### Login Page (`app/routes/login.tsx`)

Página principal com:

- Formulário de login (email e senha)
- Botões de login social (Apple, Google, X)
- Design responsivo
- Elementos decorativos (chips e conectores)

### Estilos (`app/styles/login.css`)

- Tema claro com gradientes suaves
- Animações e transições
- Layout flexbox centralizado
- Responsivo para mobile

## 🔌 Integração com Backend

Para integrar com a API backend, adicione no `login.tsx`:

```tsx
import { useState } from "react";
import { useNavigate } from "react-router";

// Dentro do componente:
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    navigate("/dashboard", { state: { user: data.user } });
  }
};
```

## 📜 Scripts Disponíveis

| Script              | Descrição                          |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Inicia servidor de desenvolvimento |
| `npm run build`     | Cria build de produção             |
| `npm start`         | Inicia servidor de produção        |
| `npm run typecheck` | Verifica tipos TypeScript          |
