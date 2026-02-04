import { createContext, useEffect, useState } from "react";
import type { mapFunctions, filterFunctions } from "~/interface/functions.type";

export interface GameRoundsInterface {
    gameRounds: RoundInterface[];
    playersName: {P1Name: string, P2Name: string};
    newGameRound: (newGameRoundInterface: newGameRoundInterface) => void;
    setOnePlayersName: (name: string, player: 1 | 2) => void;
    setBothPlayersNames: ({player1, player2}: {player1: string, player2: string}) => void;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}

const intialRoundState = {
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
    const [gameRounds, setGameRounds] = useState([{...intialRoundState}] as RoundInterface[]);
    const [playersName, setPlayersName] = useState({} as {P1Name: string, P2Name: string});
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

    const setOnePlayersName = (name: string, player: 1 | 2) => {
        if (player === 1) {
            setPlayersName(
                {...playersName,
                P1Name: name}
            );
        } else {
            setPlayersName(
                {...playersName,
                P2Name: name}
            );
        }
    }

    const setBothPlayersNames = ({player1, player2}: {player1: string, player2: string}) => {
        setPlayersName({
            P1Name: player1,
            P2Name: player2
        });
    }

    useEffect(() => {
        if (gameRounds.length >= 3 && dialogOpen === false) {
            setGameRounds([{...intialRoundState}] as RoundInterface[]);
        }
    }, [gameRounds, dialogOpen])

    return (
        <GameRoundContext value={{
            gameRounds,
            playersName,
            newGameRound,
            setOnePlayersName,
            setBothPlayersNames,
            dialogOpen,
            setDialogOpen
        }}>
            {children}
        </GameRoundContext>
    );
}
