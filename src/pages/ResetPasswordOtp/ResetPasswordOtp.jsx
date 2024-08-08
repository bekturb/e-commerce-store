import React, { useState } from "react";
import Helmet from "../../layout/Helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { resendOtpNumber, resendShopOtp } from "../../features/resendOtpSlice";
import axios from "../../utils/axios-utils";
import sellerAxios from "../../utils/seller-axios-utils";

const ResetPasswordOtp = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { id: userId, userPosition } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          .post(`/api/password-reset/${userId}/verify`, formData)
          .then((res) => {
            setLoading(false);
            return navigate(
              `/reset-password/with-email/${res?.data.user.email}/user`
            );
          })
          .catch((err) => {
            setLoading(false);
            setError(err.response.data);
          });
      } else if (userPosition === "seller") {
        sellerAxios
          .post(`/api/shops/verify-otp/to-reset-password/${userId}`, formData)
          .then((res) => {
            setLoading(false);
            return navigate(
              `/reset-password/with-email/${res?.data.seller.email}/seller`
            );
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

    if (data.otp.trim().length !== 6) {
      errors.otp = "Otp should be 6 numbers";
    }

    return errors;
  };

  const resendOtp = async () => {
    if (userPosition === "user") {
      await dispatch(resendOtpNumber({ userId }));
    } else if (userPosition === "seller") {
      await dispatch(resendShopOtp({userId}))
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (loading) {
    toast.loading("Please wait, Verifying...");
  }

  return (
    <Helmet title="Reset-Password-Otp">
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
                <h4 className="register__title">Verification</h4>
                <span className="register__subtitle">
                  Enter OTP to recover password.
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
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <p className="form__field">
                      <label>
                        <input
                          className={
                            formErrors.otp ? "form__input-color" : "form__input"
                          }
                          type="number"
                          value={formData.otp}
                          name="otp"
                          placeholder="OTP*"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </label>
                      {formErrors.otp && (
                        <span className="error">*{formErrors.otp}</span>
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
              <div className="register__send">
                <span className="register__question">
                  Already Register?
                  <button className="register__resend" onClick={resendOtp}>
                    Resend
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ResetPasswordOtp;
