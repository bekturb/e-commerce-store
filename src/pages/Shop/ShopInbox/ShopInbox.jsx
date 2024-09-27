import React, { useEffect, useMemo, useRef, useState } from "react";
import socketIO from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import sellerAxios from "../../../utils/seller-axios-utils";
import { conversationActions, getSellerConversations, updateLastMessage } from "../../../features/conversationsSlice";
import { getAllMessages, messageActions } from "../../..//features/getAllMessagesSlice";
import ChatEmptyField from "../../../components/ChatEmptyField/ChatEmptyField";
import ChatField from "../../../components/ChatField/ChatField";
import InboxSidebar from "../../../components/InboxSidebar/InboxSidebar";
import Helmet from "../../../layout/Helmet";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard";
import { onlineUserActions } from "../../../features/onlineUsersSlice";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { messageNotificationsActions } from "../../../features/messageNotificationsSlice";
const endPoint = process.env.REACT_APP_API_URL;
const socketId = socketIO(endPoint, { transports: ["websocket"] });

const ShopInbox = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const scrollRef = useRef(null);
  const { data: conversations, loading: converLoad, error: converErr } = useSelector((state) => state.userConversations);
  const { shopMessageNotifications } = useSelector((state) => state.messageNotifications);
  
  const { data: user } = useSelector((state) => state.myShop);
  const { data: messages } = useSelector((state) => state.messages);
  
  const [searchParams] = useSearchParams();
  const userId = useMemo(() => searchParams.get("userId"), [searchParams]);

  const dispatch = useDispatch();
  
  useEffect(() => {
    setSelectedConversation(null) 

    const getOneConversation = async (userId) => {
      try {
        const { data } = await sellerAxios.get(`/api/conversations/get-conversation/${userId}`);        
        setSelectedConversation(data.conversation);
      } catch (error) {
        setSelectedConversation(null);
      }
    }

    if (userId) {
      getOneConversation(userId);
    }

  }, [userId])

  useEffect(() => {
  
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        receiver: data.receiverId,
        text: data.text,
        images: data.images,
        seen: data.seen,
        createdAt: Date.now(),
      });
    });
  
    socketId.on("getNotification", (data) => {
  
      if (userId === data?.senderId) {
        dispatch(messageNotificationsActions.addShopMessNotifications({ ...data, isRead: true }));
      } else {
        dispatch(messageNotificationsActions.addShopMessNotifications({ ...data }));
      }
    });
  
    return () => {
      socketId.off("getMessage");
      socketId.off("getNotification");
    };
  }, [userId]);

  useEffect(() => {
    arrivalMessage &&
      selectedConversation?.members.includes(arrivalMessage.sender) &&
      dispatch(messageActions.handleAddMessage(arrivalMessage))
  }, [arrivalMessage, selectedConversation]);

  useEffect(() => {
    socketId.on("getConversation", (data) => {
      dispatch(conversationActions.addConversation(data));
    });
  }, []);

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
    }else {
      dispatch(messageActions.handleResetMessages())
    }
  }, [selectedConversation?._id, userId]);

  useEffect(() => {

    const getUser = async (userId) => {
      await sellerAxios
        .get(`/api/users/get-user/${userId}`)
        .then((res) => {
          setChatUser(res.data);
        })
        .catch((err) => {
          toast.error(err.response);
        });
    };

    if (userId) {
      getUser(userId);
    }

  }, [user, userId]);    

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ beahaviour: "smooth" });
  }, [messages]);

  return (
    <Helmet title="Shop Ibox">
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
              userId={userId}
              setSelectedConversation={setSelectedConversation}
              notifications={shopMessageNotifications}
              inboxStatus={"seller"}
            />
          </div>
          <div className="dashboard__products">
            {chatUser ? (
              <ChatField
                me={user}
                selectedConversation={selectedConversation}
                selectedUser={chatUser}
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
