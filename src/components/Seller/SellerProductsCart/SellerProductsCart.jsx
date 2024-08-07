import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CopyLinkButton from "../../../utils/copyLinkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectedProductsActions } from "../../../features/selectProductsSlice";
import toast from "react-hot-toast";
import { deleteProductData } from "../../../features/getShopProductsSlice";

const SellerProductsCart = ({ pro }) => {

  const [isSelected, setIsSelected] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {data: selectedProductData} = useSelector(state => state.selectedProduct);

    const dispatch = useDispatch();

    const handleDeleteProduct = async (id) => {
        try {
            setDeleteLoading(true)
            await dispatch(deleteProductData(id)).then((res) => {
                if (res?.error){
                    return
                }
                toast.success("Product deleted successfully!")
            })
            setDeleteLoading(false)
        } catch (error) {
            toast.error('Error deleting product:', error);
            setDeleteLoading(false)
        }
    }

    const getSelectedProducts = (productId) => {
      dispatch(selectedProductsActions.toggleProductSelection(productId))
  }

  useEffect(() => {
      const findPro = selectedProductData.findIndex(prod => prod === pro._id);
      setIsSelected(findPro !== -1);
  }, [selectedProductData?.length]);

  return (
    <tr className="product-table__contents">
      <td className="flexitem product-table__content-item">
        <div
          className={
            isSelected ? "selected-btn selected-btn--checked" : "selected-btn"
          }
          onClick={() => getSelectedProducts(pro._id)}
        >
          {isSelected ? (
            <span className="selected-btn__icon">
              <i className="ri-check-line"></i>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="product-table__thumbnail">
          <Link to={`/catalog/:id`} className="product-table__link">
            <img
              className="product-table__img"
              src={pro.variants[0].images[0].url}
              alt=""
            />
          </Link>
        </div>
        <div className="content product-table__content">
          <strong>
            <Link to={`/catalog/${pro._id}`} className="content__link">
              {pro.name}
            </Link>
          </strong>
        </div>
      </td>
      <td className="product-table__content-item product-table__content-item--display">
        <div className="flexitem">
          {pro.vendorCode}
          <CopyLinkButton linkToCopy={pro?.vendorCode} />
        </div>
      </td>
      <td className="product-table__content-item">
        {pro.variants[0].discountPrice
          ? `$${pro.variants[0].discountPrice.toFixed(2)}`
          : `$${pro.variants[0].originalPrice.toFixed(2)}`}
      </td>
      <td className="product-table__content-item">{pro.totalQuantity}</td>
      <td className="product-table__content-item">{pro.totalSold}</td>
      <td className="product-table__content-item">
        <Link to={`/shop/update-product/${pro._id}`}>
          <span className="item-remove">
            <i className="ri-pencil-line"></i>
          </span>
        </Link>
      </td>
      <td className="product-table__content-item">
        <span
          className="item-remove"
          onClick={() => handleDeleteProduct(pro._id)}
        >
          {deleteLoading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          ) : (
            <i className="ri-delete-bin-4-line"></i>
          )}
        </span>
      </td>
    </tr>
  );
};

export default SellerProductsCart;
