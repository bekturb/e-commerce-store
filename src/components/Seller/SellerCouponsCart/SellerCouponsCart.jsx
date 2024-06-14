import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteCoupon } from '../../../features/couponSlice';

const SellerCouponsCart = ({coupon}) => {

    const [deleteLoading, setDeleteLoading] = useState(false);

    const dispatch = useDispatch();

    const handleDeleteCoupon = async (id) => {
        try {
            setDeleteLoading(true)
            await dispatch(deleteCoupon(id)).then((res) => {
                if (res?.error){
                    return
                }
                toast.success("Coupon deleted successfully!")
            })
            setDeleteLoading(false)
        } catch (error) {
            toast.error('Error deleting coupon:', error);
            setDeleteLoading(false)
        }
    }

  return (
    <tr className="product-table__contents">
      <td className="product-table__content-item">
        <div className="product-table__content-table">{coupon.name}</div>
      </td>
      <td className="product-table__content-item">
        <div className="product-table__content-table">{coupon.value}</div>
      </td>
      <td className="product-table__content-item">
        <div className="product-table__content-table">{coupon.maxAmount}</div>
      </td>
      <td className="product-table__content-item">
        <div className="product-table__content-table">{coupon.minAmount}</div>
      </td>
      <td className="product-table__content-item">
        <Link to={`/shop/upload-coupon/${coupon._id}`}>
          <span className="item-remove">
            <i className="ri-pencil-line"></i>
          </span>
        </Link>
      </td>
      <td className="product-table__content-item">
        <span
          className="item-remove"
          onClick={() => handleDeleteCoupon(coupon._id)}
        >
          {deleteLoading ? (
            <FontAwesomeIcon icon={faSpinner} spinPulse />
          ) : (
            <i className="ri-delete-bin-4-line"></i>
          )}
        </span>
      </td>
    </tr>
  )
}

export default SellerCouponsCart