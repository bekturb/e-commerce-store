import React from "react";
import ChatForm from "../ChatForm/ChatForm";
import Messages from "../Messages/Messages";
import "./chat-field.scss";

const ChatField = ({selectedUser}) => {
  return (
    <div className="chat-field">
      <div className="chat-field__wrapper">
        <div className="person-info">
          <div className="user-info person-info__user-info">
            <div className="user-info__avatar">
              <img className="user-info__img" src={selectedUser?.avatar} alt="avatar" />
            </div>
            <div className="user-info__into">
              <h4 className="user-info__name">{selectedUser?.name}</h4>
              <div className="active-point">
                User is Active
              </div>
            </div>
          </div>
        </div>
        <Messages/>
        <ChatForm/>
      </div>
    </div>
  );
};

export default ChatField;
