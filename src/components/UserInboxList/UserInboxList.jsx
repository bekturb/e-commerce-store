import React, { useEffect, useState } from "react";
import axios from "../../utils/axios-utils";
import sellerAxios from "../../utils/seller-axios-utils";
import toast from "react-hot-toast";
import { onlineUserActions } from "../../features/onlineUsersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unReadNotificationsFunc } from "../../utils/unReadNotifications";
import { messageNotificationsActions } from "../../features/messageNotificationsSlice";

const UserInboxList = ({
  conversation,
  me,
  userId,
  setSelectedConversation,
  notifications,
  inboxStatus,
}) => {
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const selectedUserId = userId === user?._id;
  const { onlineUsers, online } = useSelector((state) => state.onlineUser);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickUser = async(user, conversation,isUserNotificatios) => {
    setSelectedConversation(conversation);
    if (inboxStatus === "user") {
      dispatch(messageNotificationsActions.markUserNotificatiosAsRead(isUserNotificatios))
      navigate(`/user/inbox?userId=${user._id}`)
    } else {
      dispatch(messageNotificationsActions.markShopNotificatiosAsRead(isUserNotificatios))
      navigate(`/shop/inbox?userId=${user._id}`)
    }
  };

  useEffect(() => {
    const userId = conversation?.members.find((item) => item !== me);

    const getUser = async (userId, inboxStatus) => {
      if (inboxStatus === "user") {
        await axios
          .get(`/api/shops/get-user/${userId}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            toast.error(err.response);
          });
      } else {
        await sellerAxios
          .get(`/api/users/get-user/${userId}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            toast.error(err.response);
          });
      }
    };
    getUser(userId, inboxStatus);
  }, [me, conversation, inboxStatus]);

  useEffect(() => {
    dispatch(
      onlineUserActions.checkOnlineUsers({
        userId: me,
        conversation,
        onlineUsers,
      })
    );
  }, [onlineUsers, me, conversation]);

  useEffect(() => {
    if (user) {
      const active = online.includes(user._id);
      setIsActive(active);
    }
  }, [user, online.length]);

  const userName = user?.name || user?.firstName;
  const unReadNotifications = unReadNotificationsFunc(notifications);
  const isUserNotificatios = unReadNotifications?.filter(n => n.senderId === user?._id);

  return (
    <li
      className={
        selectedUserId
          ? "user-info__list user-info__list--selected"
          : "user-info__list"
      }
      onClick={() => handleClickUser(user, conversation,isUserNotificatios)}
    >
      <div className="user-info__avatar">
        <img
          className="user-info__img"
          src={user?.avatar || user?.profilePicture}
          alt="avatar"
        />
      </div>
      {isActive && <div className="user-info__active"></div>}
      <div className="user-info__into">
        <div>
        <h4 className="user-info__name">{user?.name || user?.firstName}</h4>
        {conversation.lastMessage && (
          <p className="user-info__message">
            {conversation?.lastMessageId !== user?._id
              ? "You:"
              : userName?.split("")[0] + ": " || userName?.split(" ")[0] + ": "}{" "}
            {conversation?.lastMessage}
          </p>
        )}
        </div>
        {
          isUserNotificatios?.length > 0 && (
            <div className="unseen-messages">
          {isUserNotificatios?.length}
        </div>
          )
        }
      </div>
    </li>
  );
};

export default UserInboxList;
