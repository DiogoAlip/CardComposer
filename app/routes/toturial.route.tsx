import type { Route } from "./+types/toturial.route";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "CardComposer - Tutorial" },
        { name: "description", content: "Tutorial" },
    ];
}

export default function Tutorial () {
    return (
        <div>
            <h1>Tutorial</h1>
        </div>
    )
}