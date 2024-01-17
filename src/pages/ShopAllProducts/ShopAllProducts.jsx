import React, {useEffect, useState} from 'react';
import HeaderDashboard from "../../components/Dashboard/HeaderDashboard";
import SellerSidebar from "../../components/Seller/SellerSidebar/SellerSidebar";
import Helmet from "../../layout/Helmet";
import SellerAllProducts from "../../components/Seller/SellerProducts/SellerAllProducts";
import SecTop from "../../components/SecTop/SecTop";
import SortByAdvantages from "../../components/FilterItems/SortByAdvantages";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import {Link} from "react-router-dom";
import {fetchProducts} from "../../features/productsSlice";

const ShopAllProducts = () => {

    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const {data: myShopData} = useSelector(state => state.myShop);
    const {data: products} = useSelector(state => state.products);
    const {productSort, perPage} = useSelector(state => state.filterProducts);

    const dispatch = useDispatch();

    const [pageItem, setPageItem] = useState({
        start: 0,
        end: perPage
    });

    const filteredProducts = products
        ? [...products].filter(el =>
            el.shopId === myShopData?._id && (
                el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                +el.vendorCode === +searchValue
            )).sort((a, b) => {
            if (productSort === 'Product Name') {
                return a.name.localeCompare(b.name);
            } else if (productSort === 'Descending Price') {
                return Math.floor(b.variants[0].originalPrice) - Math.floor(a.variants[0].originalPrice);
            } else if (productSort === 'Ascending Price') {
                return Math.floor(a.variants[0].originalPrice) - Math.floor(b.variants[0].originalPrice);
            } else if (productSort === 'Popularity') {
                return Math.floor(a.totalSold) - Math.floor(b.totalSold);
            } else if (productSort === 'Rating') {
                return Math.floor(a.totalRating) - Math.floor(b.totalRating);
            } else if (productSort === 'New') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            return 0;
        })
        : [];

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <Helmet title="Seller-Products">
            <HeaderDashboard setOpenSidebar={setOpenSidebar}/>
            <div className="dashboard">
                <div className="dashboard__container">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__sidebar">
                            <SellerSidebar active={2} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
                        </div>
                        <div className="dashboard__products">
                            <SecTop title="All Products"/>
                            <div className="dropdown flexitem">
                                <div className="dropdown__items">
                                    <SortByAdvantages productSort={productSort}/>
                                </div>
                                <div className="search dashboard__search">
                                        <span className="icon-sm dashboard__search-icon">
                                             <i className="ri-search-line"></i>
                                         </span>
                                    <input
                                        className="dashboard__input"
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                                <Link to="/shop/add-product">
                                    <button className="dashboard__button">Add Product</button>
                                </Link>
                            </div>
                            <SellerAllProducts filteredProducts={filteredProducts} pageItem={pageItem}/>
                            {
                                filteredProducts.length > 1 && (
                                    <Pagination
                                        posts={filteredProducts}
                                        setPageItem={setPageItem}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default ShopAllProducts;