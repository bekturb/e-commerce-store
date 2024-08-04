import React, { useState } from "react";
import Helmet from "../../layout/Helmet";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import axios from "../../utils/axios-utils";
import sellerAxios from "../../utils/seller-axios-utils";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [visible, setVisisble] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);

  const navigate = useNavigate();
  const { email, userPosition } = useParams();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      if (userPosition === "user") {
        axios
        .put(`/api/users/change-password`, { email, ...formData })
        .then((res) => {
          setLoading(false);
          toast.success(res?.data);
          return navigate(`/login`);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
      }else if (userPosition === "seller") {
        sellerAxios
        .put(`/api/shops/change-password`, { email, ...formData })
        .then((res) => {
          setLoading(false);
          toast.success(res?.data);
          return navigate(`/shop/login`);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.newPassword) {
      errors.newPassword = "Password is required";
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

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    toast.loading("Please wait, Verifying...");
  }

  return (
    <Helmet title="Reset-Password">
      <div className="register">
        <div className="container">
          <div className="register__wrapper">
            <div onClick={handleBack} className="register__back back">
              <span className="back__icon">
                <i className="ri-arrow-left-line"></i>
              </span>
            </div>
            <div className="register__glass">
              <div className="register__head">
                <h4 className="register__title">Reset Password</h4>
                <span className="register__subtitle">
                  Enter a new password to reset a old one.
                </span>
              </div>

              <form className="form" onSubmit={onSubmit}>
                <div className="form__wrapper">
                  {error && (
                    <div className="form__errors">
                      <span className="error form__error-common">*{error}</span>
                    </div>
                  )}
                  <div className="form__fields">
                    <span className="form__question">
                      Enter 8 digit new password
                    </span>
                    <p className="form__field">
                      <label>
                        <input
                          className={
                            formErrors.newPassword
                              ? "form__input-color"
                              : "form__input"
                          }
                          type={visible ? "text" : "password"}
                          value={formData.newPassword}
                          name="newPassword"
                          placeholder="New Password"
                          onChange={(e) => handleInputChange(e)}
                        />
                        <div
                          onClick={() => setVisisble(!visible)}
                          className="form__visible-icon visible-icon"
                        >
                          {visible ? (
                            <FontAwesomeIcon icon={faEyeSlash} />
                          ) : (
                            <FontAwesomeIcon icon={faEye} />
                          )}
                        </div>
                      </label>
                      {formErrors.newPassword && (
                        <span className="error">*{formErrors.newPassword}</span>
                      )}
                    </p>
                    <p className="form__field">
                      <label>
                        <input
                          className={
                            formErrors.confirmPassword
                              ? "form__input-color"
                              : "form__input"
                          }
                          type={confirmPassVisible ? "text" : "password"}
                          value={formData.confirmPassword}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          onChange={(e) => handleInputChange(e)}
                        />
                        <div
                          onClick={() =>
                            setConfirmPassVisible(!confirmPassVisible)
                          }
                          className="form__visible-icon visible-icon"
                        >
                          {confirmPassVisible ? (
                            <FontAwesomeIcon icon={faEyeSlash} />
                          ) : (
                            <FontAwesomeIcon icon={faEye} />
                          )}
                        </div>
                      </label>
                      {formErrors.confirmPassword && (
                        <span className="error">
                          *{formErrors.confirmPassword}
                        </span>
                      )}
                    </p>
                    <button
                      className="form__button"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ResetPassword;