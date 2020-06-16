
import React from "react";
import * as Utils from '../lib/Utils';
import "./ChatMessages.css";

const ME_MESSAGE_CLASS_NAME = "my-message"
const USERS_MESSAGE_CLASS_NAME = "users-message"
function ChatMessages({userData, messages}) {
    
    const isMyMessage = (messaegs) =>{
        if(messaegs.userId === userData.id){
            return true;
        }
        return false;
    }
    const getMessageClassName = (message)=>{
        if(isMyMessage(message)){
            return ME_MESSAGE_CLASS_NAME;
        }
        return USERS_MESSAGE_CLASS_NAME
    }

    const getTextAlignStyle= (isMyMessage)=>{
       return isMyMessage ? { textAlign:"right"}: { textAlign:"left"} ;
    }

    return (
        <div className="chat-messaegs-container">
            {messages.length>0 && messages.map( message => {
                return (
                    message && message.User &&
                    <div className="col-12" key={message.id}>
                        <div className={getMessageClassName(message)}>
                            <div className="row" style={{justifyContent:"space-between"}}>
                                <div className="gravatar-nickname-date">
                                    <div style={getTextAlignStyle(isMyMessage(message))}>
                                        <img height="25" width="25" src={message.User.gravatar} alt=""/>
                                    </div>
                                    <div className="nickname" style={getTextAlignStyle(!isMyMessage(message))}>{message.User.nickname}</div>
                                </div>
                                <div style={getTextAlignStyle(isMyMessage(message))}>{Utils.convertMySqlDate(message.createdAt)}</div>

                            </div>
                            <div className="row content-row">
                                <div style={getTextAlignStyle(!isMyMessage(message))}>{message.content}</div>
                            </div>
                        </div>
                    </div>          
                );
            })}
            { !messages && <h3> No Messaegs </h3> }
        </div>
    )
}
export default ChatMessages;
