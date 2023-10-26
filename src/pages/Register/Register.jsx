import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {fetchUserData} from "../../features/registerSlice";
import Helmet from "../../layout/Helmet";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import axios from "../../utils/axios-utils";
import toast, {Toaster} from 'react-hot-toast';
import Profile from "../../assets/profile.png";
import "../../styles/register.scss";

const Register = () => {
    const [formData, setFormData] = useState({
        profilePicture: "",
        firstName: "Baimamatov",
        lastName: "Bektursun",
        email: "+996220643466",
        hash_password: "Bekakyrgyz@100599",
        confirmPassword: "Bekakyrgyz@100599",
        phoneNumber: 996220643466
    });
    const [formErrors, setFormErrors] = useState({});
    const [imageLoading, setImageLoading] = useState(false);
    const {loading, error} = useSelector((state) => state.register);
    const {isAuthenticated} = useSelector(state => state.authMe);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = async (event) => {
        const {name, value, files} = event.target;
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
                        profilePicture: imageData,
                    }));
                    setImageLoading(false);
                } catch (error) {
                    console.error("Error uploading image:", error);
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
            if (!formData.profilePicture) {
                delete formData.profilePicture
            }
            delete formData.confirmPassword;
            const data = await dispatch(fetchUserData(formData));

            if (data?.payload?._id) {
                return navigate(`/${data?.payload?._id}/otp`)
            }
        }
    };

    const validateForm = (data) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9-() ]{6,20}$/;
        const pattern = /^[0-9]+$/;

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email.toLowerCase()) && !phoneRegex.test(data.email)) {
            errors.email = 'Email is not valid';
        }
        if (data.firstName.trim().length < 3) {
            errors.firstName = "First name should be more than 3 characters"
        }
        if (data.lastName.trim().length < 3) {
            errors.lastName = "Last name should be more than 3 characters"
        }
        if (!data.hash_password) {
            errors.hash_password = 'Password is required';
        } else if (data.hash_password.length < 8) {
            errors.hash_password = 'Password should be at least 8 characters';
        } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(data.hash_password)) {
            errors.hash_password = "Password can only contain Latin characters, digits, and some special characters";
        } else if (!/\d/.test(data.hash_password)) {
            errors.hash_password = "Password should contain at least one numeric character";
        } else if (/\s/.test(data.hash_password)) {
            errors.hash_password = "Password cannot contain white spaces";
        }

        if (data.hash_password !== data.confirmPassword) {
            errors.confirmPassword = 'Password does not match';
        }
        if (!pattern.test(data.phoneNumber)) {
            errors.phoneNumber = 'Phone number should be only number';
        }

        return errors
    };

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    if (loading) {
        toast.loading("Please wait, registering...");
    }

    return (
        <Helmet title="Register">
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 2000, style: {
                    height: "40px"
                }
            }}
        />
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
                            <h4 className='register__title'>Register</h4>
                            <span className='register__subtitle'>
                                    Happy to join you!
                                </span>
                        </div>

                        <form className="form" onSubmit={onSubmit}>
                            <div className='form__profile'>
                                <label htmlFor="profile">
                                    <img className="form__img"
                                         src={formData.profilePicture ? formData.profilePicture : Profile}
                                         alt="avatar"/>
                                    {imageLoading && <span className="form__loader">
                                        <FontAwesomeIcon icon={faSpinner} spinPulse/>
                                    </span>
                                    }
                                </label>
                                <input
                                    className="form__upload"
                                    type="file"
                                    id='profile'
                                    name='profilePicture'
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            {error && <div className="form__errors">
                                <span className="error form__error-common">*{error}</span>
                            </div>}
                            <div className="form__fields">
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={formErrors.email ? "form__input-color" : "form__input"}
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            placeholder='Email*'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                    {formErrors.email &&
                                        <span className="error form__error">*{formErrors.email}</span>}
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={formErrors.firstName ? "form__input-color" : "form__input"}
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            placeholder='First Name*'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                    {formErrors.firstName &&
                                        <span className="error form__error">*{formErrors.firstName}</span>}
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={formErrors.lastName ? "form__input-color" : "form__input"}
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            placeholder='Last Name*'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                    {formErrors.lastName &&
                                        <span className="error form__error">*{formErrors.lastName}</span>}
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={formErrors.hash_password ? "form__input-color" : "form__input"}
                                            type="password"
                                            name="hash_password"
                                            value={formData.hash_password}
                                            placeholder='Password*'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                    {formErrors.hash_password &&
                                        <span className="error form__error">*{formErrors.hash_password}</span>}
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={formErrors.confirmPassword ? "form__input-color" : "form__input"}
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            placeholder='Confirm Password*'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                    {formErrors.confirmPassword &&
                                        <span className="error form__error">*{formErrors.confirmPassword}</span>}
                                </p>
                                <p className="form__field">
                                    <label>
                                        <input
                                            className={formErrors.phoneNumber ? "form__input-color" : "form__input"}
                                            type="number"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            placeholder='Phone Number*'
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </label>
                                    {formErrors.phoneNumber &&
                                        <span className="error form__error">*{formErrors.phoneNumber}</span>}
                                </p>
                                <button className="form__button" type='submit' disabled={loading}>
                                    {loading ? <FontAwesomeIcon icon={faSpinner} spinPulse/> : "Register"}
                                </button>
                            </div>

                            <div className="form__exist">
                                    <span className='form__question'>Already Register?
                                        <Link className='form__link' to="/login">Login Now</Link>
                                    </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Helmet>);
};

export default Register;