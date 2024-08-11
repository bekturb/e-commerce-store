import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios-utils";
import NotFound from "../NotFound/NotFound";
import Loader from "../Loader/Loader";
import { updateMyShopAvatar } from "../../features/myShopSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import UpdateProfile from "../Seller/UpdateProfile/UpdateProfile";
import UpdateShopPassword from "../Seller/UpdateShopPassword/UpdateShopPassword";
import { updateMyAvatar } from "../../features/authMeSlice";
import Avatar from "../../assets/profile.png";
import "./common-update-profile.scss";

const UpdateCommonProfile = ({
  user,
  loading,
  error,
  shopProduct,
  shopOrder,
}) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  const handleSubmitAvatar = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageLoading(true);
      const data = new FormData();
      data.append("image", file);
      if (user?.role.toLowerCase() === "seller") {
        await axios
          .post("/api/upload/single-image", data)
          .then((res) => {
            const imageData = res?.data?.url;
            dispatch(updateMyShopAvatar({ avatar: imageData }))
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
      } else {
        await axios
          .post("/api/upload/single-image", data)
          .then((res) => {
            const imageData = res?.data?.url;
            dispatch(updateMyAvatar({ profilePicture: imageData }))
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
    }
  };

  return (
    <div className="update-profile">
      <div className="container">
        <div className="profile-block">
          <div className="profile-block__header">
            <h1 className="profile-block__title profile-block__title-color">
              Profile
            </h1>
            <ul className="profile-block__nav upload-nav">
              <li
                className={
                  active === 1
                    ? "upload-nav__list upload-nav__list--line"
                    : "upload-nav__list"
                }
                onClick={() => setActive(1)}
              >
                Update Data
              </li>
              <li
                className={
                  active === 2
                    ? "upload-nav__list upload-nav__list--line"
                    : "upload-nav__list"
                }
                onClick={() => setActive(2)}
              >
                Change Password
              </li>
            </ul>
          </div>
          <div className="update-profile__wrapper">
            {loading ? (
              <div className="loader-box">
                <Loader />
              </div>
            ) : error ? (
              <div className="loader-box">
                <NotFound error={error} />
              </div>
            ) : user ? (
              <div className="profile-block__inner">
                <div className="profile-block__image-circle">
                  <img
                    className="profile-block__img"
                    src={user?.avatar || user?.profilePicture || Avatar}
                    alt="Profile Image"
                  />
                  {imageLoading && (
                    <span className="little-loader">
                      <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </span>
                  )}
                </div>
                <div className="profile-block__info">
                  <h2 className="profile-block__name">
                    {user?.name || user?.firstName}
                  </h2>
                  <h4 className="profile-block__address">( {user?.role} )</h4>
                </div>
                {shopProduct && user?.availableBalance && shopOrder && (
                  <div className="profile-block__statystic">
                    {shopProduct && (
                      <>
                        <div className="profile-block__statystic-info">
                          <h3 className="profile-block__statystic-number">
                            {shopProduct?.length}
                          </h3>
                          <p className="profile-block__statystic-title">
                            Products
                          </p>
                        </div>
                        <div className="profile-block__statystic-line"></div>
                      </>
                    )}
                    {user?.availableBalance && (
                      <>
                        <div className="profile-block__statystic-info">
                          <h3 className="profile-block__statystic-number">
                            {user?.availableBalance}
                          </h3>
                          <p className="profile-block__statystic-title">
                            Balance
                          </p>
                        </div>
                        <div className="profile-block__statystic-line"></div>
                      </>
                    )}
                    {shopOrder && (
                      <div className="profile-block__statystic-info">
                        <h3 className="profile-block__statystic-number">
                          {shopOrder?.length}
                        </h3>
                        <p className="profile-block__statystic-title">Orders</p>
                      </div>
                    )}
                  </div>
                )}

                <label className="profile-block__uplaod-btn">
                  <input
                    className="profile-block__uplaod-input"
                    type="file"
                    onChange={(e) => handleSubmitAvatar(e)}
                    disabled={imageLoading}
                  />
                  {imageLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                  ) : (
                    "Upload Profile Photo"
                  )}
                </label>
                {user?.address && (
                  <h4 className="profile-block__address">{user?.address}</h4>
                )}
                <p className="profile-block__email">{user?.email}</p>
              </div>
            ) : (
              <div>No data</div>
            )}
            {active === 1 && <UpdateProfile user={user} />}
            {active === 2 && <UpdateShopPassword user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCommonProfile;
