import React, { useEffect, useState } from 'react';
import Helmet from '../../layout/Helmet';
import HeaderDashboard from '../../components/User/HeaderDashboard';
import InboxSidebar from '../../components/InboxSidebar/InboxSidebar';
import ChatField from '../../components/ChatField/ChatField';
import { useDispatch, useSelector } from 'react-redux';
import { getUserConversations } from '../../features/conversationsSlice';
import ChatEmptyField from '../../components/ChatEmptyField/ChatEmptyField';

const UserInbox = () => {

    const [openSidebar, setOpenSidebar] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const {data: conversations, loading: converLoad, error: converErr} = useSelector(state => state.userConversations);  
    const {data: user} = useSelector(state => state.authMe);  

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserConversations())
    }, [])

  return (
    <Helmet title="User Ibox">
        <HeaderDashboard setOpenSidebar={setOpenSidebar}/>
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
              />
            </div>
            <div className="dashboard__products">
              {
                selectedUser ? (
                   <ChatField selectedUser={selectedUser}/>
                ) : (
                <ChatEmptyField/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default UserInbox