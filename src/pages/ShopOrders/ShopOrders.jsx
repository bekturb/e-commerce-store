import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOpenDrop from "../../customHooks/useOpenDrop";
import { getShopOrder } from "../../features/getShopOrderSlice";
import Helmet from "../../layout/Helmet";
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";
import SecTop from "../../components/SecTop/SecTop";
import ShopOrderTable from "../../components/Seller/ShopOrderTable/ShopOrderTable";
import Pagination from "../../components/Pagination/Pagination";
import "../../styles/shop-orders.scss";

const ShopOrders = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [productSort, setProductSort] = useState("All Orders");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { handleOpenDrop, open } = useOpenDrop();
  const { perPage } = useSelector((state) => state.filterProducts);
  const { data: myShopData } = useSelector((state) => state.myShop);
  const { data: shopOrder } = useSelector((state) => state.shopOrder);
  const [filteredOrders, setFilteredOrders] = useState(shopOrder);

  const [pageItem, setPageItem] = useState({
    start: 0,
    end: perPage,
  });

  const dispatch = useDispatch();

  const getFilteredOrders = (shopOrder, sortItem, startDate, endDate) => {
    if (shopOrder?.length > 0) {
      const filteringOrders = shopOrder.filter((el) => {
        const statusMatch = sortItem === "All Orders" || el.status === sortItem;

        const orderDate = new Date(el.createdAt);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        console.log(orderDate, start, end);

        const dateMatch =
          (!start || orderDate >= start) && (!end || orderDate <= end);

        return statusMatch && dateMatch;
      });

      setFilteredOrders(filteringOrders);
    }
  };

  useEffect(() => {
    getFilteredOrders(shopOrder, productSort, startDate, endDate);
  }, [startDate, endDate, productSort, shopOrder]);

  useEffect(() => {
    dispatch(getShopOrder(myShopData._id));
  }, [dispatch, myShopData]);

  return (
    <Helmet title="Seller-Orders">
      <HeaderDashboard setOpenSidebar={setOpenSidebar} />
      <div className="dashboard">
        <div className="dashboard__container">
          <div className="dashboard__wrapper">
            <div className="dashboard__sidebar">
              <SellerSidebar
                active={3}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            </div>
            <div className="dashboard__products">
              <SecTop title="All Orders" />
              <div className="dropdown flexitem">
                <div className="date-wrapper">
                  <div className="date-picker">
                    <input
                      onChange={(e) => setStartDate(e.target.value)}
                      className="date-picker__input"
                      type="date"
                    />
                  </div>
                  <span className="date-picker__title">to</span>
                  <div className="date-picker">
                    <input
                      onChange={(e) => setEndDate(e.target.value)}
                      className="date-picker__input"
                      type="date"
                    />
                  </div>
                </div>
                <div
                  className={
                    open === "filter" ? "dropdown__sort open" : "dropdown__sort"
                  }
                >
                  <button
                    className="dropdown__button"
                    onClick={() => handleOpenDrop("filter")}
                  >
                    <span className="dropdown__select">{productSort}</span>
                    {open === "filter" ? (
                      <span className="dropdown__icon">
                        <i className="ri-arrow-down-s-line"></i>
                      </span>
                    ) : (
                      <span className="dropdown__icon">
                        <i className="ri-arrow-up-s-line"></i>
                      </span>
                    )}
                  </button>
                  <div className="dropdown__filter">
                    <div className="down">
                      <div className="down__form desktop-hide">
                        <label>
                          <input className="down__input" type="text" />
                        </label>
                      </div>
                      <ul className="down__list">
                        <li className="down__item">
                          <div className="radio-with-text">
                            <input
                              onChange={(e) => setProductSort(e.target.value)}
                              name="filter"
                              checked={productSort === "All Orders"}
                              className="radio-with-text__input"
                              value="All Orders"
                              type="radio"
                              id="All Orders"
                            />
                            <label
                              htmlFor="All Orders"
                              className="radio-with-text__label"
                            >
                              <span className="radio-with-text__decor"></span>
                              <span className="radio-with-text__text">
                                All Orders
                              </span>
                            </label>
                          </div>
                        </li>
                        <li className="down__item">
                          <div className="radio-with-text">
                            <input
                              onChange={(e) => setProductSort(e.target.value)}
                              name="filter"
                              checked={productSort === "Delivered"}
                              className="radio-with-text__input"
                              value="Delivered"
                              type="radio"
                              id="Delivered"
                            />
                            <label
                              htmlFor="Delivered"
                              className="radio-with-text__label"
                            >
                              <span className="radio-with-text__decor"></span>
                              <span className="radio-with-text__text">
                                Delivered
                              </span>
                            </label>
                          </div>
                        </li>
                        <li className="down__item">
                          <div className="radio-with-text">
                            <input
                              onChange={(e) => setProductSort(e.target.value)}
                              name="filter"
                              checked={productSort === "Processing"}
                              className="radio-with-text__input"
                              value="Processing"
                              type="radio"
                              id="Processing"
                            />
                            <label
                              htmlFor="Processing"
                              className="radio-with-text__label"
                            >
                              <span className="radio-with-text__decor"></span>
                              <span className="radio-with-text__text">
                                Processing
                              </span>
                            </label>
                          </div>
                        </li>
                        <li className="down__item">
                          <div className="radio-with-text">
                            <input
                              onChange={(e) => setProductSort(e.target.value)}
                              name="filter"
                              checked={productSort === "Pending"}
                              className="radio-with-text__input"
                              value="Pending"
                              type="radio"
                              id="Pending"
                            />
                            <label
                              htmlFor="Pending"
                              className="radio-with-text__label"
                            >
                              <span className="radio-with-text__decor"></span>
                              <span className="radio-with-text__text">
                                Pending
                              </span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <ShopOrderTable
                pageItem={pageItem}
                filteredOrders={filteredOrders}
              />
              {shopOrder?.length > 1 && (
                <Pagination posts={shopOrder} setPageItem={setPageItem} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ShopOrders;
