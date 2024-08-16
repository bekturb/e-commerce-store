import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./chat-form.scss";

const ChatForm = ({
  handleChange,
  newMessage,
  handleSubmitMessage,
  creatingLoading,
}) => {
  return (
    <div className="chat-form" onSubmit={handleSubmitMessage}>
      <form className="chat-form__form">
        <div className="chat-form__media">
          <i className="ri-image-line"></i>
        </div>
        <label className="chat-form__label" htmlFor="">
          <input
            onChange={handleChange}
            className="chat-form__input"
            type="text"
            value={newMessage}
            placeholder="Send a message"
          />
        </label>
        <button type="submit" className="chat-form__icon">
          {creatingLoading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          ) : (
            <i className="ri-send-plane-2-fill"></i>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
