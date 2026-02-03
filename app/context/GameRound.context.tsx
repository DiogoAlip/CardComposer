import { createContext, useState } from "react";
import type { mapFunctions, filterFunctions } from "~/interface/functions.type";

export interface GameRoundsInterface extends playersInterface{
    gameRounds: RoundInterface[];
    newGameRound: (newGameRoundInterface: newGameRoundInterface) => void;
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
    isMatched: boolean;
    round: number;
    winner: string | null;
    scorePerRound: {
        player1: number;
        player2: number;
    };
    codePerRound: {
        player1: {
            mapFunctions: mapFunctions[];
            filterFunction: filterFunctions;
        };
        player2: {
            mapFunctions: mapFunctions[];
            filterFunction: filterFunctions;
        };
    }
}

interface newGameRoundInterface {
    winner: string;
    P1score: number;
    P2score: number;
    P1code: {mapFunctions: mapFunctions[], filterFunction: filterFunctions};
    P2code: {mapFunctions: mapFunctions[], filterFunction: filterFunctions};
}

export const GameRoundContext = createContext({} as GameRoundsInterface);

export const GameRoundProvider = ({children}: {children: React.ReactNode}) => {
    const [gameRounds, setGameRounds] = useState([{
            isMatched: false,
            round: 1,
            winner: null,
            scorePerRound: {player1: 0, player2: 0},
            codePerRound: {
                player1: {
                    mapFunctions: ["none"],
                    filterFunction: "none"
                },
                player2: {
                    mapFunctions: ["none"],
                    filterFunction: "none"
                }
            }
        }] as RoundInterface[]);
    const [players, setPlayers] = useState({} as playersInterface);
    const [dialogOpen, setDialogOpen] = useState(false)

    const newGameRound = ({winner, P1score, P2score, P1code, P2code}: newGameRoundInterface) => {
        const newGameRounds = gameRounds.map((round) => {
            if (round.isMatched === false) {
                return {
                    ...round,
                    isMatched: true,
                    winner: winner,
                    scorePerRound: {player1: P1score, player2: P2score},
                    codePerRound: {
                        player1: P1code,
                        player2: P2code
                    }
                }
            }
            return round
        })
        setGameRounds([...newGameRounds, {
            isMatched: false,
            round: gameRounds.length + 1,
            winner: null,
            scorePerRound: {player1: 0, player2: 0},
            codePerRound: {
                player1: {
                    mapFunctions: ["none"],
                    filterFunction: "none"
                },
                player2: {
                    mapFunctions: ["none"],
                    filterFunction: "none"
                }
            }
        }])
                    
        setDialogOpen(true);
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
            newGameRound,
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
