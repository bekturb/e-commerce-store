import React, { useState } from "react";
import sellerAxios from "../../../utils/seller-axios-utils";
import axios from "../../../utils/axios-utils";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UpdateShopPassword = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updatePasswordErr, setUpdatePasswordErr] = useState('')
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async () => {
    const passwordData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const errors = await validateForm(passwordData);
    await setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setUpdateLoading(true);
      if (user.role.toLowerCase() === "user") {
        await axios
        .put("/api/users/update/password", passwordData)
        .then((res) => {
          setUpdateLoading(false);
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          setUpdateLoading(false);
          setUpdatePasswordErr(err?.response?.data)
        });
      }else {
        await sellerAxios
        .put("/api/shops/update/password", passwordData)
        .then((res) => {
          setUpdateLoading(false);
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          setUpdateLoading(false);
          setUpdatePasswordErr(err?.response?.data)
        });
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.newPassword) {
      errors.newPassword = "Old Password is required";
    } else if (data.newPassword.length < 8) {
      errors.newPassword = "Password should be at least 8 characters";
    } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(data.newPassword)) {
      errors.newPassword =
        "Password can only contain Latin characters, digits, and some special characters";
    } else if (!/\d/.test(data.newPassword)) {
      errors.newPassword =
        "Password should contain at least one numeric character";
    } else if (/\s/.test(data.newPassword)) {
      errors.newPassword = "Password cannot contain white spaces";
    }

    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }

    return errors;
  };

  return (
    <div className="profile-info">
      <div className="profile-info__header">
        <h3 className="profile-info__title">Update Password</h3>
        <div className="profile-info__buttons">
          <button
            className="profile-info__btn profile-info__btn--save"
            disabled={updateLoading}
            onClick={() => handleSubmit()}
          >
            {updateLoading ? (
              <FontAwesomeIcon icon={faSpinner} spinPulse />
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </div>
      <hr className="profile-info__line" />
      <form action="" className="profile-info__form">
        <div className="profile-info__form-item">
          <p className="profile-info__input-name">Old Password</p>
          <input
            className="profile-info__input"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            type="password"
          />
          {updatePasswordErr && (
            <p className="profile-info__input-errors">
              {updatePasswordErr}
            </p>
          )}
        </div>
        <div className="profile-info__form-item">
          <p className="profile-info__input-name">New Password</p>
          <input
            className="profile-info__input"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
          />
          {formErrors?.newPassword && (
            <p className="profile-info__input-errors">
              {formErrors?.newPassword}
            </p>
          )}
        </div>
        <div className="profile-info__form-item">
          <p className="profile-info__input-name">Confirm Password</p>
          <input
            className="profile-info__input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
          />
          {formErrors?.confirmPassword && (
            <p className="profile-info__input-errors">
              {formErrors?.confirmPassword}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateShopPassword;
