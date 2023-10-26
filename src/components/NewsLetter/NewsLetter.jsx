import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAccount} from "../../features/accountSlice";
import toast, {Toaster} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import "./news-letter.scss";

const NewsLetter = () => {

    const [formData, setFormData] = useState({
        email: "bekkgboy2@gmail.com",
    });
    const [formErrors, setFormErrors] = useState({});
    const {loading,} = useSelector(state => state.accounts);

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
           const data = await dispatch(fetchAccount(formData));
            if (data?.hasOwnProperty("error")) {
                toast.error(data?.payload);
            } else {
                toast.success("We sent message to your email");
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

        return errors
    };

    if (loading) {
        toast.loading("Please wait, registering...");
    }

    if (formErrors.email){
        toast.error(formErrors.email);
    }

    return (
        <div className="newsletter">
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
            <div className="container">
                <div className="newsletter__wrapper">
                    <div className="newsletter__box">
                        <div className="newsletter__content">
                            <h3 className="newsletter__title">Join Our Newsletter</h3>
                            <p className="newsletter__subtitle">Get E-mail about our latest shop and <strong className="newsletter__strong">special offers</strong></p>
                        </div>
                        <div className="search newsletter__search">
                            <form className="search__form" onSubmit={onSubmit}>
                                <span className="search__icon icon-lg "><i className="ri-mail-line"></i></span>
                                <input
                                    className="search__input"
                                    type="mail"
                                    placeholder="Your email address"
                                    value={formData.email}
                                    name="email"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <button className="search__btn" type="submit" disabled={loading}>{loading ? <FontAwesomeIcon icon={faSpinner} spinPulse/> : "Sign Up"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;