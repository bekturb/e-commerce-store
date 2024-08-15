import React from 'react';
import messageIcon from "../../assets/messageIcon.png"
import "./chat-empty-field.scss";

const ChatEmptyField = () => {
  return (
    <div className='chat-empty'>
        <h3 className='chat-empty__title'>Welcome 👋 Beka 😍</h3>
        <h3 className='chat-empty__title'>Select a chat to start messaging</h3>
        <img className='chat-empty__img' src={messageIcon} alt="messageIcon" />
    </div>
  )
}

export default ChatEmptyField