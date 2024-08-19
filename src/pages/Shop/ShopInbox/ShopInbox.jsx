import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getSellerConversations } from "../../../features/conversationsSlice";
import { getAllMessages, messageActions } from "../../..//features/getAllMessagesSlice";
import ChatEmptyField from "../../../components/ChatEmptyField/ChatEmptyField";
import ChatField from "../../../components/ChatField/ChatField";
import InboxSidebar from "../../../components/InboxSidebar/InboxSidebar";
import Helmet from "../../../layout/Helmet";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard";
import { onlineUserActions } from "../../../features/onlineUsersSlice";
const endPoint = process.env.REACT_APP_API_URL;
const socketId = socketIO(endPoint, { transports: ["websocket"] });

const ShopInbox = () => {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const scrollRef = useRef(null);
  const {
    data: conversations,
    loading: converLoad,
    error: converErr,
  } = useSelector((state) => state.userConversations);
  
  const {onlineUsers} = useSelector((state) => state.onlineUser);
  const { data: user } = useSelector((state) => state.myShop);
  const { data: messages } = useSelector((state) => state.messages);

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
    dispatch(getSellerConversations());
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
                inboxStatus={"seller"}
              />
            </div>
            <div className="dashboard__products">
              {selectedUser ? (
                <ChatField
                  selectedUser={selectedUser}
                  me={user}
                  selectedConversation={selectedConversation}
                  scrollRef={scrollRef}
                  inboxStatus={"seller"}
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

export default ShopInbox;
