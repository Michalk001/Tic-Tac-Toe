import React, { useContext} from "react";
import {Cell} from "../cell/Cell";
import {GameContext} from "../../context/GameContext";

export const Board = () =>{

    const gameContext = useContext(GameContext)
    const {board,winner,updateBoard,setCurrentPlayer,reversCurrentPlayer,setMovesToEnd,movesToEnd,currentPlayer} = gameContext;
    const cellIsEmpty = (indexX:number,indexY:number):boolean =>{
        return !gameContext.board[indexY][indexX];

    }

    const boardFieldClick =(indexX: number, indexY: number,canClick:boolean) =>{
        if(canClick) {
            updateBoard(indexX,indexY,currentPlayer)
            setCurrentPlayer(reversCurrentPlayer())
            setMovesToEnd(movesToEnd -1)
        }
    }
    const canClick = () =>{
        if(winner)
            return false;
        return movesToEnd > 0;

    }
    return(
        <div className={'board'}>
            {(board as Array<string[]>).map((item:any, indexY:number) => {
                return <div key={indexY} className={"board__row"}>
                    {item.map((cellItem:any, indexX:number) => (

                        <Cell key={indexX} value={cellItem} isEmpty={cellIsEmpty(indexX, indexY)} handlerOnClick={() => {
                            boardFieldClick(indexX,indexY,canClick())

                        }}/>
                    ))}
                </div>
            })}
        </div>
    )
}