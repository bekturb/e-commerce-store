import React from "react";
import UserInboxList from "../UserInboxList/UserInboxList";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import "./inbox-sidebar.scss";

const InboxSidebar = ({ 
  conversations, 
  converLoad, 
  converErr,
   me, 
  selectedUser, 
  setSelectedUser, 
  setSelectedConversation,
  inboxStatus
}) => {  

  return (
    <div className="inbox-sidebar">
      <div className="inbox-sidebar__wrapper">
        <ul className="user-info">
          {converLoad ? (
            <div className="loader-box">
              <Loader />
            </div>
          ) : converErr ? (
            <div className="loader-box">
              <NotFound error={converErr} />
            </div>
          ) : conversations?.length > 0 ? (
            conversations.map((conversation) => (
              <UserInboxList
                key={conversation._id}
                conversation={conversation}
                me={me}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setSelectedConversation={setSelectedConversation}
                inboxStatus={inboxStatus}
              />
            ))
          ) : (
            <div>No data</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InboxSidebar;
