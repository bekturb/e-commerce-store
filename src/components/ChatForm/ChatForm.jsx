import React from "react";
import "./chat-form.scss";

const ChatForm = () => {
  return (
    <div className="chat-form">
      <form className="chat-form__form">
        <div className="chat-form__media">
          <i class="ri-image-line"></i>
        </div>
        <label className="chat-form__label" htmlFor="">
          <input className="chat-form__input" type="text" />
        </label>
        <button type="submit" className="chat-form__icon">
          <i class="ri-send-plane-2-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
