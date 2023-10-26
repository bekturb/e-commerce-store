import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import toast, {Toaster} from "react-hot-toast";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth} from "../../features/authSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {fetchAuthMe} from "../../features/authMeSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "+996220643466",
        password: "Bekakyrgyz@100599",
    });
    const [formErrors, setFormErrors] = useState({});
    const {loading, error,} = useSelector(state => state.auth);
    const {isAuthenticated} = useSelector(state => state.authMe);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            const data = await dispatch(fetchAuth(formData));
            if (data.payload.hasOwnProperty("token")) {
                toast.success("You verified your email successfully");
                setTimeout(() => {
                    window.localStorage.setItem("token", data?.payload?.token);
                    dispatch(fetchAuthMe());
                }, 1000)
            } else if(data?.payload?.hasOwnProperty("user")) {
                return navigate(`/${data?.payload?.user?._id}/otp`);
            }
        }
    };

    const validateForm = (data) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9-() ]{6,20}$/;

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email.toLowerCase()) && !phoneRegex.test(data.email)) {
            errors.email = 'Email is not valid';
        }
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password should be at least 8 characters';
        } else if (!/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/.test(data.password)) {
            errors.password = "Password can only contain Latin characters, digits, and some special characters";
        } else if (!/\d/.test(data.password)) {
            errors.password = "Password should contain at least one numeric character";
        } else if (/\s/.test(data.password)) {
            errors.password = "Password cannot contain white spaces";
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
        <Helmet title="Login">
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 2000,
                    style: {
                        height: "40px"
                    }
                }}
            />
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
                                <h4 className='register__title'>Login</h4>
                                <span className='register__subtitle'>
                                    Explore More by connecting with us.
                                </span>
                            </div>

                            <form className="form" onSubmit={onSubmit}>
                                {error && (
                                    <div className="form__errors">
                                        <span className="error form__error-common">*{error}</span>
                                    </div>
                                )}
                                <div className="form__fields">
                                    <p className="form__field">
                                        <label>
                                            <input
                                                className={formErrors.email ? "form__input-color" : "form__input"}
                                                type="text"
                                                value={formData.email}
                                                name="email"
                                                placeholder='Email*'
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </label>
                                        {formErrors.email &&
                                            <span className="error">*{formErrors.email}</span>}
                                    </p>
                                    <p className="form__field">
                                        <label>
                                            <input
                                                className={formErrors.password ? "form__input-color" : "form__input"}
                                                type="password"
                                                value={formData.password}
                                                name="password"
                                                placeholder='Password*'
                                                onChange={(e) => handleInputChange(e)}
                                            />
                                        </label>
                                        {formErrors.password &&
                                            <span className="error">*{formErrors.password}</span>}
                                    </p>
                                    <button className="form__button" type='submit' disabled={loading}>
                                        {loading ? <FontAwesomeIcon icon={faSpinner} spinPulse/> : "Login"}
                                    </button>
                                </div>

                                <div className="form__exist">
                                    <span className='form__question'>Not a Member? <Link className='form__link'
                                                                                         to="/register">Register Now</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Login;