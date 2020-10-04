import React, {FunctionComponent} from "react";
import './BoxMessage.scss'

interface IBoxMessage {
    message: string,
    show:boolean
}

export const BoxMessage:FunctionComponent<IBoxMessage> = ({show,message}) =>{
    if(show)
        return (<div className={"boxMessage"}>
            <div>{message} </div>
        </div>)
    return null

}