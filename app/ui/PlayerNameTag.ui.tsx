import { Bot, User } from "lucide-react";

export const ReservedNames = ["Bot", "Human"];

export function PlayerNameTag({name, firstPlayer}: {name: string, firstPlayer: boolean}) {
    return (
        <div
            className={`bg-primary/20 py-2 rounded-full flex flex-row gap-2 px-4 z-5 opacity-50 hover:opacity-100 transition-opacity ${ReservedNames.includes(name) ? "" : ""}`}
        >
        {
          ReservedNames.includes(name) ? (
            <>
              <h2 className="text-primary font-bold">{firstPlayer ? "You" : "Opponent"}</h2>
              {name === "Bot" ? <Bot className="w-6 h-6 text-primary"/> : <User className="w-6 h-6 text-primary"/>}
            </>
            ) : (
              <h2 className="text-primary font-bold">{`${firstPlayer ? "You" : "Opponent"} (${name})`}</h2>
            )
          }
        </div>
    );
}