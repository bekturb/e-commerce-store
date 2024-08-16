import React from "react";
import ChatForm from "../ChatForm/ChatForm";
import Messages from "../Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, createSellerMessage, messageActions } from "../../features/getAllMessagesSlice";
import "./chat-field.scss";

const ChatField = ({
    selectedUser,
    me,
    selectedConversation,
    scrollRef,
    inboxStatus
}) => {

  const {newMessage, creatingLoading} = useSelector(state => state.messages);
  const {data: user} = useSelector(state => state.authMe);     

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target
    dispatch(messageActions.handleChangeMessage(value))
  }

  const handleSubmitMessage = async(e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: selectedConversation._id
      }

      if (inboxStatus === "user") {
        await dispatch(createMessage(message));
      }else if(inboxStatus === "seller") {
        await dispatch(createSellerMessage(message));
      }

      await dispatch(messageActions.handleChangeMessage(""))        
    }

  }

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
        <Messages
          selectedUser={selectedUser}
          me={me}
          scrollRef={scrollRef}
        />
        <ChatForm
          handleChange={handleChange}
          newMessage={newMessage}
          handleSubmitMessage={handleSubmitMessage}
          creatingLoading={creatingLoading}
          inboxStatus={"user"}
        />
      </div>
    </div>
  );
};

export default ChatField;
