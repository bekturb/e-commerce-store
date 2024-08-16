import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerConversations, getUserConversations } from "../../../features/conversationsSlice";
import { getAllMessages } from "../../..//features/getAllMessagesSlice";
import ChatEmptyField from "../../../components/ChatEmptyField/ChatEmptyField";
import ChatField from "../../../components/ChatField/ChatField";
import InboxSidebar from "../../../components/InboxSidebar/InboxSidebar";
import Helmet from "../../../layout/Helmet";
import HeaderDashboard from "../../../components/Dashboard/HeaderDashboard";

const ShopInbox = () => {

  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const scrollRef = useRef(null);
  const {
    data: conversations,
    loading: converLoad,
    error: converErr,
  } = useSelector((state) => state.userConversations);

  const { data: user } = useSelector((state) => state.myShop);
  const { data: messages } = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerConversations());
  }, []);

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
