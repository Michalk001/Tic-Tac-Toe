
import React, {FunctionComponent, useContext, useEffect, useState} from 'react';

import "./Game.scss"
import {Score} from "./score/Score";
import {GameContext} from "../../context/GameContext";
import {Board} from "./board/Board";
import {BoxMessage} from "./boxMessage/BoxMessage"

interface IButton {
    message:string,
    handleOnClick: () => void
}

export const Button:FunctionComponent<IButton> = ({message, handleOnClick}) =>{
    return <button className={'button'} onClick={handleOnClick} >{message}</button>
}

export const Game = () =>{
 
    const [currentRound, setCurrentRound] = useState(1)
    const [score, setScore] = useState({valueX:0, valueO:0})
    const gameContext = useContext(GameContext)
    const {board, reversCurrentPlayer,setWinner,winner,setMovesToEnd,movesToEnd, resetBoard} = gameContext;

    const checkWin = (char:string) =>{

        let counterGoodRow = 0;
        let counterGoodCol = 0;
        for(let col = 0; col < 3; ++col){
            counterGoodCol=0;
            counterGoodRow = 0;
            for(let row = 0; row < 3; ++row){
                if((board[row][col] )  === char){
                    ++counterGoodCol;
                    if(counterGoodCol === 3) {
                        return true
                    }
                }
                else {
                      counterGoodCol = 0;
                }
                if((board[col][row] )  === char){
                    ++counterGoodRow;
                    if(counterGoodRow === 3) {
                        return true
                    }
                }
                else {
                    counterGoodRow = 0;
                }
              }
        }

        if(board[0][0] === char && board[1][1] === char && board[2][2]  === char ) {
            return true
        }
        return board[0][2] === char && board[1][1] === char && board[2][0] === char;

    }

    useEffect(()=>{
        const charPreviousPlayer =  reversCurrentPlayer()
        if(checkWin(charPreviousPlayer)) {
            if(charPreviousPlayer === "X")
                setScore({...score, valueX: score.valueX +1})
            if(charPreviousPlayer === "O")
                setScore({...score, valueO: score.valueO +1})
           setWinner(charPreviousPlayer);

        }
    },[board])


    const clearBoard = () =>{
        resetBoard()
        setWinner(null);
        setMovesToEnd(9);
    }


    const handleNewGame = () =>{
        clearBoard()
        setScore({valueX:0, valueO:0})
        setCurrentRound(1)
    }
    const handleNextRound = () =>{
        clearBoard();
        setCurrentRound(currentRound+1)
    }

    const isTie = ():boolean =>{
        return movesToEnd <= 0 && winner === null
    }

    const isWinner = ():boolean =>{
        return winner != null
    }



    return ( <div className={"game"}>
        <div className={"game__container"}>
            <div className={`game__round`}>
                <div className={`game__round-text`}>{`Runda ${currentRound}`}</div>
            </div>
            <div className={'board'}>
                <Board />
                <BoxMessage show={isWinner()} message={`${winner} Wygrał Grę`}/>
                <BoxMessage show={isTie()} message={`Remis`}/>

            </div>
            <Score valueX={score.valueX} valueO={score.valueO}/>
            <div className={'game__option-button'}>
                {<Button message={`Nowa Gra`} handleOnClick={handleNewGame} />}
                {(isTie()|| isWinner()) && <Button message={`Następna Runda`} handleOnClick={handleNextRound}/>}
            </div>

        </div>
    </div>)
}