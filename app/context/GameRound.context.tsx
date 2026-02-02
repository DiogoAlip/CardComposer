import { createContext, useState } from "react";

export interface GameRoundsInterface extends playersInterface{
    gameRounds: RoundInterface[];
    nextGameRounds: (winner: string, P1score: number, P2score: number) => void;
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

export interface RoundInterface {
    round: number;
    winner: string | null;
    scorePerRound: {
        player1: number;
        player2: number;
    };
}

export const GameRoundContext = createContext({} as GameRoundsInterface);

export const GameRoundProvider = ({children}: {children: React.ReactNode}) => {
    const [gameRounds, setGameRounds] = useState([{round: 1, winner: null, scorePerRound: {player1: 0, player2: 0}}] as RoundInterface[]);
    const [players, setPlayers] = useState({} as playersInterface);
    const [dialogOpen, setDialogOpen] = useState(false)

    const nextGameRounds = (winner: string, P1score: number, P2score: number) => {
        const newGameRounds = [...gameRounds.slice(0, -1), {
            round: gameRounds.length,
            winner: winner,
            scorePerRound: {player1: P1score, player2: P2score}
        }]
        setGameRounds([...newGameRounds, {
            round: gameRounds.length + 1,
            winner: null,
            scorePerRound: {player1: 0, player2: 0}
        }]);
        setDialogOpen(false);
    }

    const addScore = (P1Score: number, P2Score: number) => {
            setPlayers({
                player1: {
                    name: 'Player 1',
                    score: players.player1.score + P1Score
                },
                player2: {
                    name: 'Player 2',
                    score: players.player2.score + P2Score
                }}
            );
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
            gameRounds,
            ...players,
            nextGameRounds,
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
