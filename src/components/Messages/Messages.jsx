import React from "react";
import avatar from "../../assets/profile.png";
import "./messages.scss";

const Messages = () => {
  return (
    <div className="chat-box">
      <div className="message message--my-message">
        <div className="message__image">
          <img className="message__img" src={avatar} alt="avatar" />
        </div>
        <p className="message__text">
          Hi Beka <br /> <span className="message__time">12:04</span>
        </p>
      </div>
      <div className="message message--my-message">
        <div className="message__image">
          <img className="message__img" src={avatar} alt="avatar" />
        </div>
        <p className="message__text">
          Hi Beka <br /> <span className="message__time">12:04</span>
        </p>
      </div>
      <div className="message message--my-message">
        <div className="message__image">
          <img className="message__img" src={avatar} alt="avatar" />
        </div>
        <p className="message__text">
          Hi Beka <br /> <span className="message__time">12:04</span>
        </p>
      </div>
      <div className="message message--my-message">
        <div className="message__image">
          <img className="message__img" src={avatar} alt="avatar" />
        </div>
        <p className="message__text">
          Hi Beka <br /> <span className="message__time">12:04</span>
        </p>
      </div>
      <div className="message message--fnd-message">
        <div className="message__image">
          <img className="message__img" src={avatar} alt="avatar" />
        </div>
        <p className="message__text  message__text--fnd">
          Hi Beka <br /> <span className="message__time">12:04</span>
        </p>
      </div>
      <div className="message message--my-message">
        <div className="message__image">
          <img className="message__img" src={avatar} alt="avatar" />
        </div>
        <p className="message__text">
          Hi Beka <br /> <span className="message__time">12:04</span>
        </p>
      </div>
      <div className="message message--fnd-message">
        <div className="message__image">
          <img className="message__img" src={avatar} alt="avatar" />
        </div>
        <p className="message__text message__text--fnd">
          Hi Beka <br /> <span className="message__time">12:04</span>
        </p>
      </div>
    </div>
  );
};

export default Messages;
