import React, { useEffect, useState } from "react";
import axios from "../../utils/axios-utils"
import toast from "react-hot-toast";

const UserInboxList = ({conversation, me, selectedUser, setSelectedUser}) => {

    const [user, setUser] = useState(null)
    const selectedUserId = selectedUser?._id === user?._id;

    const getUser = async (userId) => {
        await axios.get(`/api/shops/get-user/${userId}`).then((res) => {
            setUser(res.data)
        }).catch(err => {
            toast.error(err.response)            
        })
    }

    const handleClickUser = (user) => {
        setSelectedUser(user);

    }

    useEffect(() => {
        const userId = conversation?.members.find(item => item !== me);
        getUser(userId)
    }, [me, conversation])

  return (
    <li className={selectedUserId ? "user-info__list user-info__list--selected" : "user-info__list"} onClick={() => handleClickUser(user)}>
      <div className="user-info__avatar">
        <img className="user-info__img" src={user?.avatar} alt="avatar" />
      </div>
      <div className="user-info__active"></div>
      <div className="user-info__into">
        <h4 className="user-info__name">{user?.name}</h4>
        <p className="user-info__message">{conversation?.lastMessage}</p>
      </div>
    </li>
  );
};

export default UserInboxList;
