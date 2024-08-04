import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../../../utils/axios-utils";
import toast from "react-hot-toast";
import Profile from "../../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Helmet from "../../../layout/Helmet";
import { registerShop } from "../../../features/shopRegisterSlice";

const ShopRegister = () => {
  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    zipCode: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.shopRegister);
  const [visible, setVisisble] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.myShop);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = async (event) => {
    const { name, value, files } = event.target;
    if (name === "profilePicture") {
      const file = files[0];
      if (file) {
        setImageLoading(true);
        const data = new FormData();
        data.append("image", file);
        try {
          const response = await axios.post("/api/upload/single-image", data);
          const imageData = response?.data?.url;
          setFormData((prevState) => ({
            ...prevState,
            avatar: imageData,
          }));
          setImageLoading(false);
        } catch (error) {
          toast.error("Error uploading image:", error);
          setImageLoading(false);
        }
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      if (!formData.avatar) {
        delete formData.avatar;
      }
      delete formData.confirmPassword;
      const data = await dispatch(registerShop(formData));

      if (data?.payload?._id) {
        return navigate(`/${data?.payload?._id}/shop-otp`);
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9-() ]{6,20}$/;
    const pattern = /^[0-9]+$/;

    if (!data.email) {
      errors.email = "Email is required";
    } else if (
      !emailRegex.test(data.email.toLowerCase()) &&
      !phoneRegex.test(data.email)
    ) {
      errors.email = "Email is not valid";
    }
    if (data.name.trim().length < 3) {
      errors.name = "First name should be more than 3 characters";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password should be at least 8 characters";
    } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(data.password)) {
      errors.password =
        "Password can only contain Latin characters, digits, and some special characters";
    } else if (!/\d/.test(data.password)) {
      errors.password =
        "Password should contain at least one numeric character";
    } else if (/\s/.test(data.password)) {
      errors.password = "Password cannot contain white spaces";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }
    if (!pattern.test(data.phoneNumber)) {
      errors.phoneNumber = "Phone number should be only number";
    }
    if (data.address.trim().length === "") {
      errors.name = "Address is required";
    }

    if (!data.zipCode.trim().length === "") {
      errors.name = "ZipCode is required";
    }

    return errors;
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (loading) {
    toast.loading("Please wait, registering...");
  }

  return (
    <Helmet title="Shop Register">
      <div className="register">
        <div className="container">
          <div className="register__wrapper">
            <div className="back">
              <Link to="/">
                <span className="back__icon">
                  <i className="ri-arrow-left-line"></i>
                </span>
              </Link>
            </div>
            <div className="register__glass">
              <div className="register__head">
                <h4 className="register__title">Register as a Seller</h4>
                <span className="register__subtitle">Happy to join you!</span>
              </div>

              <form className="form" onSubmit={onSubmit}>
                <div className="form__profile">
                  <label htmlFor="avatar">
                    <img
                      className="form__img"
                      src={formData.avatar ? formData.avatar : Profile}
                      alt="avatar"
                    />
                    {imageLoading && (
                      <span className="form__loader">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                      </span>
                    )}
                  </label>
                  <input
                    className="form__upload"
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                {error && (
                  <div className="form__errors">
                    <span className="error form__error-common">*{error}</span>
                  </div>
                )}
                <div className="form__fields">
                  <p className="form__field">
                    <label>
                      <input
                        className={
                          formErrors.email ? "form__input-color" : "form__input"
                        }
                        type="text"
                        name="email"
                        value={formData.email}
                        placeholder="Email*"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </label>
                    {formErrors.email && (
                      <span className="error form__error">
                        *{formErrors.email}
                      </span>
                    )}
                  </p>
                  <p className="form__field">
                    <label>
                      <input
                        className={
                          formErrors.name ? "form__input-color" : "form__input"
                        }
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Name*"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </label>
                    {formErrors.name && (
                      <span className="error form__error">
                        *{formErrors.name}
                      </span>
                    )}
                  </p>
                  <p className="form__field">
                    <label>
                      <input
                        className={
                          formErrors.password
                            ? "form__input-color"
                            : "form__input"
                        }
                        type={visible ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        placeholder="Password*"
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
                    {formErrors.password && (
                      <span className="error form__error">
                        *{formErrors.password}
                      </span>
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
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        placeholder="Confirm Password*"
                        onChange={(e) => handleInputChange(e)}
                      />
                      <div onClick={() => setConfirmPassVisible(!confirmPassVisible)} className="form__visible-icon visible-icon">
                         {
                            confirmPassVisible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />
                         }
                      </div>
                    </label>
                    {formErrors.confirmPassword && (
                      <span className="error form__error">
                        *{formErrors.confirmPassword}
                      </span>
                    )}
                  </p>
                  <p className="form__field">
                    <label>
                      <input
                        className={
                          formErrors.phoneNumber
                            ? "form__input-color"
                            : "form__input"
                        }
                        type="number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        placeholder="Phone Number*"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </label>
                    {formErrors.phoneNumber && (
                      <span className="error form__error">
                        *{formErrors.phoneNumber}
                      </span>
                    )}
                  </p>
                  <p className="form__field">
                    <label>
                      <input
                        className={
                          formErrors.address
                            ? "form__input-color"
                            : "form__input"
                        }
                        type="text"
                        name="address"
                        value={formData.address}
                        placeholder="Country*"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </label>
                    {formErrors.address && (
                      <span className="error form__error">
                        *{formErrors.address}
                      </span>
                    )}
                  </p>
                  <p className="form__field">
                    <label>
                      <input
                        className={
                          formErrors.zipCode
                            ? "form__input-color"
                            : "form__input"
                        }
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        placeholder="Zip-Code*"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </label>
                    {formErrors.zipCode && (
                      <span className="error form__error">
                        *{formErrors.zipCode}
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
                      "Register"
                    )}
                  </button>
                </div>

                <div className="form__exist">
                  <span className="form__question">
                    Already Register?
                    <Link className="form__link" to="/shop/login">
                      Login Now
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ShopRegister;
