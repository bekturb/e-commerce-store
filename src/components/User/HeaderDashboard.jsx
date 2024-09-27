import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Avatar from "../../assets/profile.png";
import { unReadNotificationsFunc } from '../../utils/unReadNotifications';

const HeaderDashboard = ({setOpenSidebar}) => {

    const {data: userData} = useSelector(state => state.authMe);    
    const { clientMessageNotifications } = useSelector((state) => state.messageNotifications);

    const unReadNotifications = unReadNotificationsFunc(clientMessageNotifications);

  return (
    <div className="header-dashboard">
            <div className="container">
                <div className="header-dashboard__wrapper">
                    <div className="nav header-dashboard__nav">
                        <span className="trigger nav__trigger" onClick={() => setOpenSidebar(true)}><span
                            className="trigger__icon icon-lg ri-menu-2-line"></span>
                        </span>
                        <div className="logo header-dashboard__logo">
                            <Link className="logo__link" to="/">
                                <span className="logo__circle header-dashboard__circle"></span>.Store
                            </Link>
                        </div>
                        <div className="nav__right">
                            <ul className="package">
                                <li className="package__item mobile-hide">
                                    <Link to="/catalog/Wishlist" className="package__link">
                                        <span className="package__icon icon-lg">
                                            <i className="ri-shopping-bag-3-line"></i>
                                        </span>
                                        <span className="fly-item package__fly-item">
                                           <span className="package__number">
                                             1
                                           </span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="package__item mobile-hide">
                                    <Link to="/catalog/Wishlist" className="package__link">
                                        <span className="package__icon icon-lg">
                                            <i className="ri-box-3-line"></i>
                                        </span>
                                        <span className="fly-item package__fly-item">
                                           <span className="package__number">
                                             1
                                           </span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="package__item mobile-hide">
                                    <Link to="/catalog/Wishlist" className="package__link">
                                        <span className="package__icon icon-lg">
                                            <i className="ri-gift-line"></i>
                                        </span>
                                        <span className="fly-item package__fly-item">
                                           <span className="package__number">
                                             1
                                           </span>
                                        </span>
                                    </Link>
                                </li>
                                <li className="package__item iscart">
                                    <div className="package__link">
                                        <div className="package__icon icon-lg">
                                            <i className="ri-message-2-line"></i>
                                            {
                                                unReadNotifications?.length > 0 && (
                                                    <span className="fly-item package__fly-item">
                                                        <span className="package__number">
                                                            {unReadNotifications?.length}
                                                        </span>
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </li>
                                <li className="package__item iscart">
                                    <div className="account">
                                        {
                                            userData?.profilePicture ? (
                                                <img className="account__image" src={userData.profilePicture} alt=""/>
                                            ) : (
                                                <img className="account__image" src={Avatar} alt=""/>
                                            )
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default HeaderDashboard