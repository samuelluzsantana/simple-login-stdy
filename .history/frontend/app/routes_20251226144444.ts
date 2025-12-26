import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Portuguese (default)
  index("routes/login.tsx"),
  route("signup", "routes/signup.tsx"),

  // English
  route("en", "routes/login.tsx"),
  route("en/signup", "routes/signup.tsx"),
] satisfies RouteConfig;
