import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("", "routes/index.route.tsx", [
    index("routes/home.route.tsx"),
    route("about", "routes/about.route.tsx"),
    route("tutorial", "routes/tutorial.route.tsx"),
  ]),
  route("play", "routes/play.route.tsx", [
    index("routes/gamemode.route.tsx"),
    route("vs-computer/:dificulty", "routes/playVsComputer.route.tsx"),
    route("invite", "routes/playInvite.route.tsx"),
    route("join", "routes/playJoin.route.tsx"),
  ]),
] satisfies RouteConfig;
