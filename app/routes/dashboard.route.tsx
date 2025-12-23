import type { Route } from "./+types/dashboard.route";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Dashboard" },
  ];
}

export default function Home() {
  return <><h1>Dashboard</h1></>;
}