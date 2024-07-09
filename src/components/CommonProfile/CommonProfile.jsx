import React from 'react';
import "./common-profile.scss";
import { Link } from 'react-router-dom';

const CommonProfile = ({status, myShopData, products, shopOrder}) => {
  return (
    <div className='common-profile'>
        <div className='container'>
            <div className='common-profile__wrapper'>
                <div className='profile-block'>
                    <h1 className='profile-block__title'>{status} Profile</h1>
                    <div className='profile-block__inner'>
                        <div className='profile-block__image-circle'>
                            <img className='profile-block__img' src={myShopData?.avatar} alt="Profile Image" />
                        </div>
                        <div className='profile-block__info'>
                            {
                                myShopData?.firstName &&  <h2 className='profile-block__name'>{myShopData?.firstName} {myShopData?.lastName}</h2>
                            }
                            {
                                myShopData?.name &&  <h2 className='profile-block__name'>{myShopData?.name}</h2>
                            }
                            {
                                myShopData?.addresses?.length && <h4 className='profile-block__address'>{myShopData?.addresses[0].country}</h4>
                            }
                             {
                                myShopData?.address && <h4 className='profile-block__address'>{myShopData?.address}</h4>
                            }
                            <p className="profile-block__email">{myShopData?.email}</p>
                        </div>
                        <div className='profile-block__statystic'>
                            {
                                products?.length > 0 && (
                                    <div className="profile-block__statystic-info">
                                <h3 className="profile-block__statystic-number">{products?.length}</h3>
                                <p className='profile-block__statystic-title'>Products</p>
                            </div>
                                )
                            }
                            <div className='profile-block__statystic-line'></div>
                            {
                                myShopData?.availableBalance && (
                                    <div className="profile-block__statystic-info">
                                <h3 className="profile-block__statystic-number">{ myShopData?.availableBalance}</h3>
                                <p className='profile-block__statystic-title'>Balance</p>
                            </div>
                                )
                            }
                            <div className='profile-block__statystic-line'></div>
                           {
                               shopOrder?.length && (
                                    <div className="profile-block__statystic-info">
                                    <h3 className="profile-block__statystic-number">{shopOrder?.length}</h3>
                                    <p className='profile-block__statystic-title'>Orders</p>
                                </div>
                                )
                           }
                        </div>
                        <Link to={`/${myShopData?.role}/${myShopData?._id}`} className='profile-block__uplaod-btn'>
                            Upload Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommonProfile