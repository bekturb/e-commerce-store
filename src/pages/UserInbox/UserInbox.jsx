import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import Helmet from "../../layout/Helmet";
import HeaderDashboard from "../../components/User/HeaderDashboard";
import InboxSidebar from "../../components/InboxSidebar/InboxSidebar";
import ChatField from "../../components/ChatField/ChatField";
import { useDispatch, useSelector } from "react-redux";
import { getUserConversations, updateLastMessage } from "../../features/conversationsSlice";
import ChatEmptyField from "../../components/ChatEmptyField/ChatEmptyField";
import { getAllMessages, messageActions } from "../../features/getAllMessagesSlice";
import { onlineUserActions } from "../../features/onlineUsersSlice";
const endPoint = process.env.REACT_APP_API_URL;
const socketId = socketIO(endPoint, { transports: ["websocket"] });

const UserInbox = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const scrollRef = useRef(null);
  const {
    data: conversations,
    loading: converLoad,
    error: converErr,
  } = useSelector((state) => state.userConversations);

  const { data: user } = useSelector((state) => state.authMe);
  const {data: messages} = useSelector((state) => state.messages);  

  const dispatch = useDispatch();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      selectedConversation?.members.includes(arrivalMessage.sender) &&
      dispatch(messageActions.handleAddMessage(arrivalMessage))
  }, [arrivalMessage, selectedConversation]);

  useEffect(() => {
    dispatch(getUserConversations());
  }, []);

  useEffect(() => {
    if (user) {
      const sellerId = user?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        dispatch(onlineUserActions.setOnlineUsers(data))
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation?._id) {
      dispatch(getAllMessages(selectedConversation?._id));
    }
  }, [selectedConversation?._id]);

  useEffect(() => {
    socketId.on("getLastMessage", (data) => {
      dispatch(updateLastMessage({
        id: data?.conversationId,
        messages: {
          lastMessage: data?.lastMessage,
          lastMessageId: data?.lastMessageId
        },
      }))
    });
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <Helmet title="User Ibox">
      <HeaderDashboard setOpenSidebar={setOpenSidebar} />
      <div className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__wrapper">
            <div className="dashboard__sidebar">
              <InboxSidebar
                conversations={conversations}
                converLoad={converLoad}
                converErr={converErr}
                me={user._id}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setSelectedConversation={setSelectedConversation}
                inboxStatus={"user"}
              />
            </div>
            <div className="dashboard__products">
              {selectedUser ? (
                <ChatField
                  selectedUser={selectedUser}
                  me={user}
                  selectedConversation={selectedConversation}
                  scrollRef={scrollRef}
                  inboxStatus={"user"}
                />
              ) : (
                <ChatEmptyField />
              )}
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default UserInbox;
