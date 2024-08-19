import React, { useEffect, useState } from "react";
import axios from "../../utils/axios-utils";
import sellerAxios from "../../utils/seller-axios-utils";
import toast from "react-hot-toast";
import { onlineUserActions } from "../../features/onlineUsersSlice";
import { useDispatch, useSelector } from "react-redux";

const UserInboxList = ({
  conversation,
  me,
  selectedUser,
  setSelectedUser,
  setSelectedConversation,
  inboxStatus,
}) => {
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false)
  const selectedUserId = selectedUser?._id === user?._id;
  const {onlineUsers, online} = useSelector((state) => state.onlineUser);

  const dispatch = useDispatch();

  const handleClickUser = (user, conversation) => {
    setSelectedUser(user);
    setSelectedConversation(conversation);
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
    dispatch(onlineUserActions.checkOnlineUsers({userId: me, conversation, onlineUsers}))
  }, [onlineUsers, me, conversation]);

  useEffect(() => {
    if(user) {
      const active = online.includes(user._id)
      setIsActive(active)
    }
  }, [user, online.length]);  

  return (
    <li
      className={
        selectedUserId
          ? "user-info__list user-info__list--selected"
          : "user-info__list"
      }
      onClick={() => handleClickUser(user, conversation)}
    >
      <div className="user-info__avatar">
        <img
          className="user-info__img"
          src={user?.avatar || user?.profilePicture}
          alt="avatar"
        />
      </div>
      {
        isActive && <div className="user-info__active"></div>
      }
      <div className="user-info__into">
        <h4 className="user-info__name">{user?.name || user?.firstName}</h4>
        <p className="user-info__message">{conversation?.lastMessage}</p>
      </div>
    </li>
  );
};

export default UserInboxList;
