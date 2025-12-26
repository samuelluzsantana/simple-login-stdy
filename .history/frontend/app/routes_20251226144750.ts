import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Portuguese (default)
  index("routes/login.tsx"),
  route("signup", "routes/signup.tsx"),

  // English
  route("en", "routes/en.login.tsx"),
  route("en/signup", "routes/en.signup.tsx"),
] satisfies RouteConfig;
