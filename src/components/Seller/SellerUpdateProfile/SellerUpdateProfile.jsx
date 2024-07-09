import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../utils/axios-utils";
import { fetchShopProducts } from "../../../features/getShopProductsSlice";
import { getShopOrder } from "../../../features/getShopOrderSlice";
import NotFound from "../../NotFound/NotFound";
import Loader from "../../Loader/Loader";
import {
  updateMyShop,
  updateMyShopAvatar,
} from "../../../features/myShopSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./common-update-profile.scss";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import UpdateShopPassword from "../UpdateShopPassword/UpdateShopPassword";

const SellerUpdateProfile = () => {
  const {
    data: myShopData,
    loading: myShopLoad,
    error: myShopErr,
  } = useSelector((state) => state.myShop);
  const { data: products } = useSelector((state) => state.shopProducts);
  const { data: shopOrder } = useSelector((state) => state.shopOrder);

  const [imageLoading, setImageLoading] = useState(false);
  const [ active, setActive ] = useState(1)
  const dispatch = useDispatch();

  const handleSubmitAvatar = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageLoading(true);
      const data = new FormData();
      data.append("image", file);
      await axios
        .post("/api/upload/single-image", data)
        .then((res) => {
          const imageData = res?.data?.url;
           dispatch(updateMyShopAvatar({avatar: imageData}))
         .then(() => {
          setImageLoading(false);
          })
          .catch(() => {
          setImageLoading(false);
          });
        })
        .catch(() => {
          setImageLoading(false);
        });
    }
  };

  useEffect(() => {
    if (myShopData?._id) {
      dispatch(fetchShopProducts(myShopData._id));
      dispatch(getShopOrder(myShopData._id));
    }
  }, [dispatch, myShopData]);

  return (
    <div className="update-profile">
      <div className="container">
        <div className="profile-block">
          <div className="profile-block__header">
            <h1 className="profile-block__title profile-block__title-color">
              Profile
            </h1>
            <ul className="profile-block__nav upload-nav">
              <li className={active === 1 ? "upload-nav__list upload-nav__list--line": "upload-nav__list"} onClick={() => setActive(1)}>Update Data</li>
              <li className={active === 2 ? "upload-nav__list upload-nav__list--line": "upload-nav__list"} onClick={() => setActive(2)}>Change Password</li>
            </ul>
          </div>
          <div className="update-profile__wrapper">
            {myShopLoad ? (
              <div className="loader-box">
                <Loader />
              </div>
            ) : myShopErr ? (
              <div className="loader-box">
                <NotFound error={myShopErr} />
              </div>
            ) : myShopData ? (
              <div className="profile-block__inner">
                <div className="profile-block__image-circle">
                  <img
                    className="profile-block__img"
                    src={myShopData?.avatar}
                    alt="Profile Image"
                  />
                  {imageLoading && (
                    <span className="little-loader">
                      <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </span>
                  )}
                </div>
                <div className="profile-block__info">
                  <h2 className="profile-block__name">{myShopData?.name}</h2>
                  <h4 className="profile-block__address">{myShopData?.role}</h4>
                </div>
                <div className="profile-block__statystic">
                  <div className="profile-block__statystic-info">
                    <h3 className="profile-block__statystic-number">
                      {products?.length ? products?.length : 0}
                    </h3>
                    <p className="profile-block__statystic-title">Products</p>
                  </div>

                  <div className="profile-block__statystic-line"></div>

                  <div className="profile-block__statystic-info">
                    <h3 className="profile-block__statystic-number">
                      {myShopData?.availableBalance
                        ? myShopData?.availableBalance
                        : 0}
                    </h3>
                    <p className="profile-block__statystic-title">Balance</p>
                  </div>

                  <div className="profile-block__statystic-line"></div>

                  <div className="profile-block__statystic-info">
                    <h3 className="profile-block__statystic-number">
                      {shopOrder?.length ? shopOrder?.length : 0}
                    </h3>
                    <p className="profile-block__statystic-title">Orders</p>
                  </div>
                </div>
                <label className="profile-block__uplaod-btn">
                  <input
                    className="profile-block__uplaod-input"
                    type="file"
                    onChange={(e) => handleSubmitAvatar(e)}
                    disabled={imageLoading}
                  />
                  {imageLoading ? (
                      <FontAwesomeIcon icon={faSpinner} spinPulse />
                  ) : "Upload Profile Photo"
                }
                </label>
                <h4 className="profile-block__address">
                  {myShopData?.address}
                </h4>
                <p className="profile-block__email">{myShopData?.email}</p>
              </div>
            ) : (
              <div>No data</div>
            )}
            {
              active === 1 && (
                <UpdateProfile myShopData={myShopData}/>
              )
            }
             {
              active === 2 && (
                <UpdateShopPassword myShopData={myShopData}/>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerUpdateProfile;
