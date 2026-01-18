import { createContext, useState } from "react";

interface GameRoundInterface {
    gameRound: number;
    nextGameRound: () => void;
    Winner: string | null;
    endGameRound: (winner: string) => void;
    addScore: (score: number, player: 1 | 2) => void;
    scoreP1: number;
    scoreP2: number;
}

export const GameRoundContext = createContext<GameRoundInterface | null>(null);

export const GameRoundProvider = ({children}: {children: React.ReactNode}) => {
    const [gameRound, setGameRound] = useState(1);
    const [Winner, setWinner] = useState<string | null>(null);
    const [scoreP1, setScoreP1] = useState(0);
    const [scoreP2, setScoreP2] = useState(0);

    const nextGameRound = () => {
        setGameRound(gameRound + 1);
    }

    const endGameRound = (winner: string) => {
        setWinner(winner);
    }

    const addScore = (score: number, player: 1 | 2) => {
        if (player === 1) {
            setScoreP1(scoreP1 + score);
        } else {
            setScoreP2(scoreP2 + score);
        }
    }

    return (
        <GameRoundContext.Provider value={{
            gameRound,
            Winner,
            scoreP1,
            scoreP2,
            nextGameRound,
            endGameRound,
            addScore,
        }}>
            {children}
        </GameRoundContext.Provider>
    );
}
