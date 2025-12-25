import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.route.tsx"),
  route("about", "routes/about.route.tsx"),
  route("gamemode", "routes/gamemode.route.tsx"),
  route("tutorial", "routes/tutorial.route.tsx"),
//  route("gamecomposer", "routes/gamecomposer.route.tsx"),
] satisfies RouteConfig;
