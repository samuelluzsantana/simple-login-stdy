import { serve } from "bun";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Banco de dados em memória
const users: User[] = [];
let nextId = 1;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Rota de cadastro de usuário
    if (url.pathname === "/api/register" && req.method === "POST") {
      try {
        const body = await req.json();
        const { name, email, password } = body;

        // Validação básica
        if (!name || !email || !password) {
          return new Response(
            JSON.stringify({ error: "Nome, email e senha são obrigatórios" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        // Verifica se usuário já existe
        const existingUser = users.find((u) => u.email === email);
        if (existingUser) {
          return new Response(
            JSON.stringify({ error: "Email já cadastrado" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        // Cria novo usuário
        const newUser: User = {
          id: nextId++,
          name,
          email,
          password, // Em produção, usar hash!
        };

        users.push(newUser);

        return new Response(
          JSON.stringify({
            message: "Usuário cadastrado com sucesso",
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
          }),
          {
            status: 201,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Erro ao processar requisição" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Rota de login
    if (url.pathname === "/api/login" && req.method === "POST") {
      try {
        const body = await req.json();
        const { email, password } = body;

        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          return new Response(
            JSON.stringify({ error: "Email ou senha inválidos" }),
            {
              status: 401,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        return new Response(
          JSON.stringify({
            message: "Login realizado com sucesso",
            user: { id: user.id, name: user.name, email: user.email },
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Erro ao processar requisição" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Rota não encontrada
    return new Response(JSON.stringify({ error: "Rota não encontrada" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
});

console.log("🚀 Backend API rodando em http://localhost:3001");
