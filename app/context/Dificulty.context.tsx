import { createContext, useState } from "react";

type Dificulty = "unselected" | "competitive" | "easy";

interface DificultyInterface {
    dificulty: Dificulty;
    setDificulty: (dificulty: Dificulty) => void;
}

export const DificultyContext = createContext<DificultyInterface | null>(null);

export const DificultyProvider = ({ children }: { children: React.ReactNode }) => {
    const [dificulty, setDificulty] = useState<Dificulty>("unselected");
    return (
        <DificultyContext value={{ dificulty, setDificulty }}>
            {children}
        </DificultyContext>
    );
}