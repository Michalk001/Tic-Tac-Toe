import React, {Dispatch, FunctionComponent, SetStateAction, useState} from "react";



export interface IGameContext {
    board: (string[]|null[])[],
    updateBoard: (indexX: number, indexY: number, char: string | null) => void,
    resetBoard: () => void,
    currentPlayer:string,
    setCurrentPlayer: Dispatch<SetStateAction<string>>,
    reversCurrentPlayer: () => string,
    winner:string|null,
    setWinner:Dispatch<SetStateAction<string|null>>,
    movesToEnd:number
    setMovesToEnd:Dispatch<SetStateAction<number>>,

}

export const GameContext = React.createContext<IGameContext>(null!)



interface Props {
    children: React.ReactNode
}

export const GameProvider:FunctionComponent<Props> = ({children}) =>{

    const [board,setBoard] = useState<(string[]|null[])[]>([[null,null,null],[null,null,null],[null,null,null]])
    const [currentPlayer, setCurrentPlayer] = useState("X")
    const [winner,setWinner] = useState<string|null>(null)
    const [movesToEnd, setMovesToEnd] = useState(9)


    const reversCurrentPlayer = () =>{
        if(currentPlayer === "X")
            return "O"
        else
            return "X"
    }

    const updateBoard = (indexX:number,indexY:number, char:string|null) =>{
        const copyBoard = [...board]
        copyBoard[indexY][indexX] = char;
        setBoard(copyBoard)
    }

    const resetBoard = () =>{
        setBoard([[null,null,null],[null,null,null],[null,null,null]])
    }
    

    return(
        <GameContext.Provider value={{
            board,
            updateBoard,
            resetBoard,
            currentPlayer,
            setCurrentPlayer,
            reversCurrentPlayer,
            winner,
            setWinner,
            movesToEnd,
            setMovesToEnd
        }}>
            {children}
        </GameContext.Provider>
    )
}