import React, {FunctionComponent, useState} from 'react';

import "./Cell.scss"

interface CellPassProps {
    value: string | null;
    handlerOnClick: () => void;
    isEmpty: boolean
}

export const Cell:FunctionComponent<CellPassProps> = ({value,handlerOnClick,isEmpty}) =>{

    const [showHighlight, setShowHighlight] = useState(false);

    const handlerChooseCell = () =>{
        if(isEmpty)
            handlerOnClick()
        else {
            setShowHighlight(true);
            setTimeout(()=>{setShowHighlight(false) }, 200);
        }
    }

    return (<div className={`cell ${!value ? 'cell--empty' : null } ${showHighlight ? 'cell--isBusy' : '' }`} onClick={handlerChooseCell}>
            <div className={`cell__ico ${value ? 'cell__ico--rotate' : null }`}>
                {value === "X" && <i className="fas fa-times"/> }
                {value === "O" && <i className="far fa-circle"/> }
            </div>
        </div>
    )
}