import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Toaster, toast} from "react-hot-toast";
import {verifyEmail} from "../../features/otpSlice";
import {fetchAuthMe} from "../../features/authMeSlice";
import {resendOtpNumber} from "../../features/resendOtpSlice";

const Otp = () => {

    const [formData, setFormData] = useState({
        otp: ""
    });
    const [formErrors, setFormErrors] = useState({});

    const {loading, error} = useSelector((state) => state.otp);
    const {isAuthenticated} = useSelector(state => state.authMe);
    const {id: userId} = useParams();

    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            const otp = await dispatch(verifyEmail({...formData, userId}))
            if (otp?.payload?.token) {
                toast.success("You verified your email successfully");
                setTimeout(() => {
                    window.localStorage.setItem("token", otp?.payload?.token)
                    dispatch(fetchAuthMe());
                }, 1000)
            }
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (data.otp.trim().length !== 6) {
            errors.otp = "Otp should be 6 numbers"
        }

        return errors
    };

    const resendOtp = async () => {
        const resendData = await dispatch(resendOtpNumber({userId}));

        console.log(resendData)
    }

    const handleBack = () => {
        window.history.back();
    }

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    if (loading) {
        toast.loading("Please wait, Verifying...");

    }

    return (
        <Helmet title="OTP">
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
                        <div onClick={handleBack} className="register__back back">
                                <span className="back__icon">
                                    <i className="ri-arrow-left-line"></i>
                                </span>
                        </div>
                        <div className="register__glass">
                            <div className="register__head">
                                <h4 className='register__title'>Verification</h4>
                                <span className='register__subtitle'>
                                    Enter OTP to recover password.
                                </span>
                            </div>

                            <form className="form" onSubmit={onSubmit}>
                                <div className="form__wrapper">
                                    {error && <div className="form__errors">
                                        <span className="error form__error-common">*{error}</span>
                                    </div>}
                                    <div className="form__fields">
                                    <span className='form__question'>
                                        Enter 6 digit OTP sent to your email address.
                                    </span>
                                        <p className="form__field">
                                            <label>
                                                <input
                                                    className={formErrors.otp ? "form__input-color" : "form__input"}
                                                    type="number"
                                                    value={formData.otp}
                                                    name="otp"
                                                    placeholder='OTP*'
                                                    onChange={(e) => handleInputChange(e)}
                                                />
                                            </label>
                                            {formErrors.otp &&
                                                <span className="error">*{formErrors.otp}</span>}
                                        </p>
                                        <button className="form__button" type='submit' disabled={loading}>
                                            {loading ? <FontAwesomeIcon icon={faSpinner} spinPulse/> : "Send"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="register__send">
                                        <span className='register__question'>Already Register?
                                            <button className='register__resend' onClick={resendOtp}>Resend</button>
                                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Otp;
