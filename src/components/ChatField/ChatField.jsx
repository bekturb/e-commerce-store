import React, { useEffect, useState } from "react";
import ChatForm from "../ChatForm/ChatForm";
import socketIO from "socket.io-client";
import Messages from "../Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, createSellerMessage, messageActions } from "../../features/getAllMessagesSlice";
import { updateLastMessage } from "../../features/conversationsSlice";
import "./chat-field.scss";
const endPoint = process.env.REACT_APP_API_URL;
const socketId = socketIO(endPoint, { transports: ["websocket"] });

const ChatField = ({
  selectedUser,
  me,
  selectedConversation,
  scrollRef,
  inboxStatus,
}) => {
  const { newMessage, creatingLoading } = useSelector(
    (state) => state.messages
  );
  const {online} = useSelector((state) => state.onlineUser);
  const [isActive, setIsActive] = useState(false)
  const [images, setImages] = useState();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(messageActions.handleChangeMessage(value));
  };  

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const message = {
        sender: me._id,
        text: newMessage,
        conversationId: selectedConversation._id,
      };

      const receiverId = selectedConversation.members.find(
        (member) => member !== me?._id
      );

      socketId.emit("sendMessage", {
        senderId: me?._id,
        receiverId,
        text: newMessage,
      });

      if (inboxStatus === "user") {
        await dispatch(createMessage(message));
        handleUpdateLastMessage(selectedConversation._id, newMessage, me._id)

      } else if (inboxStatus === "seller") {
        await dispatch(createSellerMessage(message));
        handleUpdateLastMessage(selectedConversation._id, newMessage, me._id)
      }

      dispatch(messageActions.handleChangeMessage(""));
    }
  };

    const handleImageUpload = async (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(reader.result);
          imagesSendHandler(reader.result);
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
    };


  const imagesSendHandler = async(data) => {

    const receiverId = selectedConversation.members.find(
      (member) => member !== me._id
    );

    socketId.emit("sendMessage", {
      senderId: me._id,
      receiverId,
      images: data,
    });
    
    if (inboxStatus === "user") {
      await dispatch(createMessage(
        {
          images: data,
          text: newMessage,
          conversationId: selectedConversation._id,
        }
      ));
        await handleUpdateLastMessage(selectedConversation._id, "Photo", me._id)

    } else if (inboxStatus === "seller") {
      await dispatch(createSellerMessage(
        {
          images: data,
          text: newMessage,
          conversationId: selectedConversation._id,
        }
      ));
        await handleUpdateLastMessage(selectedConversation._id, "Photo", me._id)
    }

    await dispatch(messageActions.handleChangeMessage(""));
  }

  const handleUpdateLastMessage = async (conversationId, newMessage, userId) => {

    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: userId,
      conversationId: selectedConversation._id
    });

    await dispatch(updateLastMessage({
      id: conversationId,
      messages: {
        lastMessage: newMessage,
        lastMessageId: userId,
      },
    }))
  };

  useEffect(() => {
    if(selectedUser) {
      const active = online.includes(selectedUser._id)
      setIsActive(active)
    }
  }, [selectedUser, online.length]); 

  return (
    <div className="chat-field">
      <div className="chat-field__wrapper">
        <div className="person-info">
          <div className="user-info person-info__user-info">
            <div className="user-info__avatar">
              <img
                className="user-info__img"
                src={selectedUser?.avatar || selectedUser?.profilePicture}
                alt="avatar"
              />
            </div>
            <div className="user-info__into">
              <h4 className="user-info__name">{selectedUser?.name || selectedUser?.firstName}</h4>
              {
                isActive ? (
                  <div className="active-point">Active</div>
                ) : (
                  <div className="inactive-point">Inactive</div>
                )
              }
            </div>
          </div>
        </div>
        <Messages selectedUser={selectedUser} me={me} scrollRef={scrollRef} />
        <ChatForm
          handleChange={handleChange}
          newMessage={newMessage}
          handleSubmitMessage={handleSubmitMessage}
          handleImageUpload={handleImageUpload}
          creatingLoading={creatingLoading}
          inboxStatus={"user"}
        />
      </div>
    </div>
  );
};

export default ChatField;
