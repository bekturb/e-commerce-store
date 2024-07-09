import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMyShop } from '../../../features/myShopSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./update-profile.scss";

const UpdateProfile = ({ myShopData }) => {

      const [name, setName] = useState(myShopData?.name);
      const [address, setAddress] = useState(myShopData?.address);
      const [zipCode, setZipCode] = useState(myShopData?.zipCode);
      const [phoneNumber, setPhoneNumber] = useState(myShopData?.phoneNumber);
      const [updateLoading, setUpdateLoading] = useState(false);
      const [formErrors, setFormErrors] = useState({});
    
      const dispatch = useDispatch();
    
      const handleSubmit = async () => {
        const profileObj = {
          name,
          address,
          zipCode,
          phoneNumber,
        };
    
        const errors = await validateForm(profileObj);
        await setFormErrors(errors);
    
        if (Object.keys(errors).length === 0) {
          setUpdateLoading(true);
          await dispatch(updateMyShop(profileObj))
            .then(() => {
              setUpdateLoading(false);
            })
            .catch(() => {
              setUpdateLoading(false);
            });
        }
      };
    
      const validateForm = (data) => {
        const errors = {};
    
        if (data.name.trim().length < 3) {
          errors.name = "Name should be more than 3 characters";
        }
        return errors;
      };

  return (
    <div className="profile-info">
              <div className="profile-info__header">
                <h3 className="profile-info__title">Basic Info</h3>
                <div className="profile-info__buttons">
                  <button
                    className="profile-info__btn profile-info__btn--save"
                    disabled={updateLoading}
                    onClick={() => handleSubmit()}
                  >
                    {updateLoading ? (
                      <FontAwesomeIcon icon={faSpinner} spinPulse />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
              <hr className="profile-info__line" />
              <form action="" className="profile-info__form">
                <div className="profile-info__form-item">
                  <p className="profile-info__input-name">Name</p>
                  <input
                    className="profile-info__input"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                  />
                  {formErrors?.name && (
                    <p className="profile-info__input-errors">
                      {formErrors?.name}
                    </p>
                  )}
                </div>
                <div className="profile-info__form-item">
                  <p className="profile-info__input-name">Address</p>
                  <input
                    className="profile-info__input"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                  />
                </div>
                <div className="profile-info__form-item">
                  <p className="profile-info__input-name">ZipCode</p>
                  <input
                    className="profile-info__input"
                    onChange={(e) => setZipCode(e.target.value)}
                    value={zipCode}
                    type="text"
                  />
                </div>
                <div className="profile-info__form-item">
                  <p className="profile-info__input-name">Phone Number</p>
                  <input
                    className="profile-info__input"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    type="text"
                  />
                </div>
              </form>
            </div>
  )
}

export default UpdateProfile