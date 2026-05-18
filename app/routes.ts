import Root, { ErrorBoundary } from "./root";
import IndexRoute from "./routes/index.route";
import Home from "./routes/home.route";
import About from "./routes/about.route";
import Tutorial from "./routes/tutorial.route";
import PlayRoute from "./routes/play.route";
import GameMode from "./routes/gamemode.route";
import PlayVsComputer from "./routes/playVsComputer.route";
import PlayInvite from "./routes/playInvite.route";
import PlayJoin from "./routes/playJoin.route";

export const routes = [
  {
    path: "/",
    Component: Root,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "",
        Component: IndexRoute,
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "about",
            Component: About,
          },
          {
            path: "tutorial",
            Component: Tutorial,
          },
        ],
      },
      {
        path: "play",
        Component: PlayRoute,
        children: [
          {
            index: true,
            Component: GameMode,
          },
          {
            path: "vs-computer/:dificulty",
            Component: PlayVsComputer,
          },
          {
            path: "invite",
            Component: PlayInvite,
          },
          {
            path: "join",
            Component: PlayJoin,
          },
        ],
      },
    ],
  },
];
