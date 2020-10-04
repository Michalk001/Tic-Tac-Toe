import React, {FunctionComponent} from "react";

import "./Score.scss"

interface IScore {
    valueX: number;
    valueO: number;
}


export const Score:FunctionComponent<IScore> = ({valueX,valueO}) =>{

    return(
        <div className={'score'}>
            <div className={'score__text'}>
                X: {valueX}
            </div>
            <div className={'score__text'}>
                O: {valueO}
            </div>
        </div>
    )
}