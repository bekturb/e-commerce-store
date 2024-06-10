import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedProductsActions } from "../../../features/selectProductsSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import { addSaleToProduct } from "../../../features/getShopProductsSlice";
import "./add-sale.scss";

const AddSaleToPro = ({ setSaleWindow, selectedProductData }) => {
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const { loading } = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch();

  const onSubmitSale = async (e) => {
    e.preventDefault();

    const saleObj = {
      startDate,
      endDate,
      salePercentage: percentage,
      productIds: selectedProductData
    };

    await dispatch(addSaleToProduct(saleObj));
    await dispatch(selectedProductsActions.resetAllProdSelections());
    setSaleWindow(false)
  };

  return (
    <div className="add-sale">
      <div className="add-sale__wrapper">
        <div className="add-sale__close">
          <span
            className="add-sale__close-icon"
            onClick={() => setSaleWindow(false)}
          >
            <i className="ri-close-line"></i>
          </span>
        </div>
        <h3 className="add-sale__title">Add Discount Price</h3>
        <div className="add-sale__fields">
          <form className="form add-sale__form" onSubmit={onSubmitSale}>
            <div className="form-item add-sale__form-item">
              <p className="form-item__title">From</p>
              <div className="form-item__input-block add-sale__input-block">
                <input
                  className="input form-item__input"
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Write Your Start Date"
                />
                {/* {
                                formErrors?.name && (
                                    <p className="error form-item__error">*{formErrors.name}</p>
                                )
                            } */}
              </div>
            </div>
            <div className="form-item add-sale__form-item">
              <p className="form-item__title">To</p>
              <div className="form-item__input-block add-sale__input-block">
                <input
                  className="input form-item__input"
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Write Your End Date"
                />
                {/* {
                                formErrors?.name && (
                                    <p className="error form-item__error">*{formErrors.name}</p>
                                )
                            } */}
              </div>
            </div>
            <div className="form-item add-sale__form-item">
              <p className="form-item__title">Percentage</p>
              <div className="form-item__input-block add-sale__input-block">
                <input
                  className="input form-item__input"
                  type="number"
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="Write Your Start Sale Percentage"
                />
                {/* {
                                formErrors?.name && (
                                    <p className="error form-item__error">*{formErrors.name}</p>
                                )
                            } */}
              </div>
            </div>
            <button className="secondary-button add-sale__button" type="submit">
              {loading ? <FontAwesomeIcon icon={faSpinner} spinPulse/> : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSaleToPro;
