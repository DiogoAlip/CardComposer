import { createContext, useState } from "react";

export interface GameRoundInterface extends playersInterface{
    gameRound: number;
    nextGameRound: () => void;
    Winner: string | null;
    endGameRound: (winner: string) => void;
    addScore: (score: number, player: 1 | 2) => void;
    setOnePlayerName: (name: string, player: 1 | 2) => void;
    setBothPlayersNames: ({player1, player2}: {player1: string, player2: string}) => void;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}

export interface playersInterface {
    player1: {
        name: string;
        score: number;
    };
    player2: {
        name: string;
        score: number;
    };
}

export const GameRoundContext = createContext({} as GameRoundInterface);

export const GameRoundProvider = ({children}: {children: React.ReactNode}) => {
    const [gameRound, setGameRound] = useState(1);
    const [Winner, setWinner] = useState<string | null>(null);
    const [players, setPlayers] = useState({} as playersInterface);
    const [dialogOpen, setDialogOpen] = useState(false)

    const nextGameRound = () => {
        setGameRound(gameRound + 1);
    }

    const endGameRound = (winner: string) => {
        setWinner(winner);
    }

    const addScore = (newScore: number, player: 1 | 2) => {
        if (player === 1) {
            setPlayers(
                {...players,
                player1: {
                    name: 'Player 1',
                    score: players.player1.score + newScore
                }}
            );
        } else {
            setPlayers(
                {...players,
                player2: {
                    name: 'Player 2',
                    score: players.player2.score + newScore
                }}
            );
        }
    }

    const setOnePlayerName = (name: string, player: 1 | 2) => {
        if (player === 1) {
            setPlayers(
                {...players,
                player1: {
                    name: name,
                    score: players.player1?.score || 0
                }}
            );
        } else {
            setPlayers(
                {...players,
                player2: {
                    name: name,
                    score: players.player2?.score || 0
                }}
            );
        }
    }

    const setBothPlayersNames = ({player1, player2}: {player1: string, player2: string}) => {
        setPlayers(
            {...players,
            player1: {
                name: player1,
                score: players.player1?.score || 0
            },
            player2: {
                name: player2,
                score: players.player2?.score || 0
            }}
        );
    }

    return (
        <GameRoundContext value={{
            gameRound,
            Winner,
            ...players,
            nextGameRound,
            endGameRound,
            addScore,
            setOnePlayerName,
            setBothPlayersNames,
            dialogOpen,
            setDialogOpen
        }}>
            {children}
        </GameRoundContext>
    );
}
