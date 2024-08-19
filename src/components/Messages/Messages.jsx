import React from "react";
import MessageCloud from "../MessageCloud/MessageCloud";
import MessageSkeleton from "../Skeletons/MessageSkeleton/MessageSkeleton";
import { useSelector } from "react-redux";
import NotFound from "../NotFound/NotFound";
import "./messages.scss";

const Messages = ({ selectedUser, me, scrollRef }) => {
  const {
    data: messages,
    loading: mesLoading,
    error: mesErr,
  } = useSelector((state) => state.messages);

  return (
    <div className="chat-box">
      {mesLoading ? (
        <>
          <MessageSkeleton
            style={{
              margin: "10px 0",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          />
          <MessageSkeleton
            style={{
              margin: "10px 0",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          />
          <MessageSkeleton
            style={{
              margin: "10px 0",
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          />
        </>
      ) : mesErr ? (
        <div className="loader-box">
          <NotFound error={mesErr} />
        </div>
      ) : messages?.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={scrollRef}>
            <MessageCloud
              message={message}
              selectedUser={selectedUser}
              me={me}
            />
          </div>
        ))
      ) : (
        <div className="chat-box__title">
          No messages are currently available. <br /> Please initiate a new
          conversation or wait for incoming messages.
        </div>
      )}
    </div>
  );
};

export default Messages;
