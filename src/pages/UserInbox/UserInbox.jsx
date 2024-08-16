import React, { useEffect, useRef, useState } from "react";
import Helmet from "../../layout/Helmet";
import HeaderDashboard from "../../components/User/HeaderDashboard";
import InboxSidebar from "../../components/InboxSidebar/InboxSidebar";
import ChatField from "../../components/ChatField/ChatField";
import { useDispatch, useSelector } from "react-redux";
import { getUserConversations } from "../../features/conversationsSlice";
import ChatEmptyField from "../../components/ChatEmptyField/ChatEmptyField";
import { getAllMessages } from "../../features/getAllMessagesSlice";

const UserInbox = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const scrollRef = useRef(null);
  const {
    data: conversations,
    loading: converLoad,
    error: converErr,
  } = useSelector((state) => state.userConversations);
  const { data: user } = useSelector((state) => state.authMe);
  const {
    data: messages,
  } = useSelector((state) => state.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserConversations());
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
