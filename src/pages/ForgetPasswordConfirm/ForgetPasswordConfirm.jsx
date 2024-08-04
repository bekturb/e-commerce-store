import React, { useState } from 'react';
import Helmet from '../../layout/Helmet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "../../utils/axios-utils";
import sellerAxios from "../../utils/seller-axios-utils";
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ForgetPasswordConfirm = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();
    const { userPosition } = useParams();

    const onSubmit = async (e) => {
      e.preventDefault();
      const errors = validateForm(email);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        setLoading(true);
        if( userPosition === "user"){
          await axios.post("/api/password-reset", {email}).then((res) => {
            setLoading(false);
            toast.success(res.data?.message);
            return navigate(`/${res.data?.user._id}/reset-password/confirmation-otp/user`)
          }).catch((err) => {
            toast.error(err?.response?.data?.message);
            setLoading(false);
          })
        }else if(userPosition === "seller"){
          await sellerAxios.post("/api/shops/post-email/to-reset-password", {email}).then((res) => {
            setLoading(false);
            toast.success(res.data?.message);
            return navigate(`/${res.data?.seller._id}/reset-password/confirmation-otp/seller`)
          }).catch((err) => {
            toast.error(err?.response?.data?.message);
            setLoading(false);
          })
        }
      }
    }

    const validateForm = (email) => {
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9-() ]{6,20}$/;
  
      if (!email) {
        errors.email = "Email is required";
      } else if (
        !emailRegex.test(email.toLowerCase()) &&
        !phoneRegex.test(email)
      ) {
        errors.email = "Email is not valid";
      }
  
      return errors;
    };

  return (
    <Helmet title="Confirmation">
      <div className="register">
        <div className="container">
          <div className="register__wrapper">
            <div className="register__back back">
              <Link to="/">
                <span className="back__icon">
                  <i className="ri-arrow-left-line"></i>
                </span>
              </Link>
            </div>
            <div className="register__glass">
              <div className="register__head">
                <h4 className="register__title">Send Email</h4>
                <span className="register__subtitle">
                  Reset Your Password by sending Email
                </span>
              </div>
              <form className="form" onSubmit={onSubmit}>
                <div className="form__fields">
                  <p className="form__field">
                    <label>
                      <input
                        className={
                          formErrors.email ? "form__input-color" : "form__input"
                        }
                        type="text"
                        value={email}
                        name="email"
                        placeholder="Email*"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    {formErrors.email && (
                      <span className="error">*{formErrors.email}</span>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

export default ForgetPasswordConfirm