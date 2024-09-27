import React from "react";
import { format } from "timeago.js";

const MessageCloud = ({message, selectedUser, me}) => {  

  return (
    <div className={me._id === message?.sender ? "message " : "message message--fnd-message"}>
      <div className="message__profile">
        <img className="message__profile-img" src={me._id === message?.sender ? me?.profilePicture || me?.avatar : selectedUser?.avatar || selectedUser?.profilePicture} alt="avatar" />
      </div>
      {
        message?.images && (
          <div className={me._id === message?.sender ? "message__image" : "message__image message__image--fnd"}>
            <img className="message__img" src={message?.images?.url} alt="" /> <br /> <span className="message__image-time">{format(message?.createdAt)}</span>
          </div>
        )
      }
      {
        message?.text && message?.text !== "Photo" && (
          <p className={me._id === message?.sender ? "message__text" : "message__text message__text--fnd"}>
            {message?.text} <br /> <span className="message__time">{format(message?.createdAt)}</span>
          </p>
        )
      }
    </div>
  );
};

export default MessageCloud;