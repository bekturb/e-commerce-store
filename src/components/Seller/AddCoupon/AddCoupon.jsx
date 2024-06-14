import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopProducts } from "../../../features/getShopProductsSlice";

const AddCoupon = () => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { data: myShopData } = useSelector((state) => state.myShop);
  const {
    data: products,
    // loading: productsLoading,
    // error: productsErr,
  } = useSelector((state) => state.shopProducts);

  const dispatch = useDispatch();

  const handleChangeProduct = (productId) => {
    setSelectedProduct(productId);
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      value: couponValue,
      maxAmount,
      minAmount,
      selectedProduct,
    };

    const errors = validateForm(formData);
    setFormErrors(errors);
  };

  const validateForm = (data) => {
    const errors = {};

    if (data.name.trim().length < 3) {
      errors.name = "Name should be more than 3 characters";
    }
    if (!data.value) {
      errors.value = "Coupon value is required";
    }
    if (!data.maxAmount) {
      errors.maxAmount = "Max Amount is required";
    }
    if (!data.minAmount) {
      errors.minAmount = "Min Amount is required";
    }
    if (!data.productId) {
      errors.productId = "ProductId is required";
    }
    return errors;
  };

  useEffect(() => {
    dispatch(fetchShopProducts(myShopData._id));
  }, [dispatch, myShopData._id]);

  return (
    <div className="add-product">
      <div className="add-product__inner">
        <h1 className="add-product__main-title">Feature</h1>
        <form className="form add-product__form">
          <div className="form-item add-product__form-item">
            <p className="form-item__title">Name</p>
            <div className="form-item__input-block">
              <input
                className="input form-item__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors?.name && (
                <p className="error form-item__error">*{formErrors.name}</p>
              )}
            </div>
          </div>
          <div className="form-item add-product__form-item">
            <p className="form-item__title">Coupon Value</p>
            <div className="form-item__input-block">
              <input
                className="input form-item__input"
                type="text"
                value={couponValue}
                onChange={(e) => setCouponValue(e.target.value)}
              />
              {formErrors?.value && (
                <p className="error form-item__error">*{formErrors.name}</p>
              )}
            </div>
          </div>
          <div className="form-item add-product__form-item">
            <p className="form-item__title">Max Amount</p>
            <div className="form-item__input-block">
              <input
                className="input form-item__input"
                type="text"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
              {formErrors?.maxAmount && (
                <p className="error form-item__error">*{formErrors.name}</p>
              )}
            </div>
          </div>
          <div className="form-item add-product__form-item">
            <p className="form-item__title">Min Amount</p>
            <div className="form-item__input-block">
              <input
                className="input form-item__input"
                type="text"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
              />
              {formErrors?.minAmount && (
                <p className="error form-item__error">*{formErrors.name}</p>
              )}
            </div>
          </div>
          <div className="form-item add-product__form-item">
            <p className="form-item__title">Product</p>
            <div className="form-item__input-block">
              <div className="unique-dropdown">
                <div className="unique-dropdown__cap">
                  <button
                    className="unique-dropdown__button"
                    type="button"
                    onClick={() => setOpen(!open)}
                  >
                    Select a Product
                    {open ? (
                      <span className="unique-dropdown__icon">
                        <i className="ri-arrow-up-s-line"></i>
                      </span>
                    ) : (
                      <span className="unique-dropdown__icon">
                        <i className="ri-arrow-down-s-line"></i>
                      </span>
                    )}
                  </button>
                </div>
                {open && products?.length > 0 && (
                  <div className="unique-dropdown__body">
                    <ul className="unique-dropdown__list">
                      {products.map((pro) => (
                        <li
                          key={pro._id}
                          onClick={() => handleChangeProduct(pro?._id)}
                          className={
                            selectedProduct === pro?._id
                              ? "unique-dropdown__list-item unique-dropdown__list-item--active"
                              : "unique-dropdown__list-item"
                          }
                        >
                          {pro.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {formErrors?.productId && (
                <p className="error form-item__error">*{formErrors.category}</p>
              )}
            </div>
          </div>
          <button
            className="secondary-button add-product__button"
            type="button"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
