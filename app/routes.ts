import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.route.tsx"),
  route("about", "routes/about.route.tsx"),
  route("dashboard", "routes/dashboard.route.tsx"),
  route("tutorial", "routes/tutorial.route.tsx"),
] satisfies RouteConfig;
