import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategory} from "../../features/singleCategorySlice";
import {fetchBrands} from "../../features/brandSlice";
import {fetchAllCategories} from "../../features/allCategories";
import Subcategory from "../Subcategory/Subcategory";
import MainCategory from "../MainCategory/MainCategory";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import SubSubCategory from "../SubSubCategory/SubSubCategory";
import "./single-category.scss";
import {getAllShops} from "../../features/shopsSlice";

const SingleCategory = () => {
     const showRef = useRef(null);
    const [hasSubCategory, setHasSubCategory] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedItem, setSortedItem] = useState("Popularity");
    const [perPage, setPerPage] = useState("10");
    const [productBrand, setProductBrand] = useState([]);
    const [productColor, setProductColor] = useState([]);
    const [productPrice, setProductPrice] = useState(0);

    const {data: category, loading: catLoading, error: catError} = useSelector(state => state.category);
    const {data: allCategories, loading: allCatLoading, error: allCateErr} = useSelector(state => state.allCategories);
    const {data: products} = useSelector(state => state.products);
    const {data: shops, loading: shopsLoading, error: shopsErr} = useSelector(state => state.shops);

    const dispatch = useDispatch();
    const {slug: categorySlug} = useParams();

    useEffect(() => {
        dispatch(fetchCategory(categorySlug));
        dispatch(fetchAllCategories());
        dispatch(fetchBrands());
        dispatch(getAllShops());
    }, [categorySlug]);

    useEffect(() => {
        if (category && allCategories) {
            const categoryHasChildren = allCategories.some(cat => cat.parentId === category._id);
            setHasSubCategory(categoryHasChildren);
        } else {
            setHasSubCategory(false);
        }
    }, [category, allCategories]);

        useEffect(() => {
        const handleDocumentClick = (e) => {
            const isClosest = e.target.closest(".filter");
            if (!isClosest && showRef.current && showRef.current.classList.contains("show")) {
                showRef.current.classList.remove("show");
            }
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    function paginateProducts(products, currentPage, perPage) {
        if (perPage === 'All') {
            return products;
        }

        const startIndex = (currentPage - 1) * +perPage;
        const endIndex = startIndex + +perPage;
        return products.slice(startIndex, endIndex);
    }

    function handlePerPageChange(page) {
        setPerPage(page);
        setCurrentPage(1);
    }

    function loadMoreProducts() {
        const plusToPerPage = +perPage + 10
        setPerPage(plusToPerPage);
    }

    const handleBrandCheckboxChange = (event) => {
        const {value, checked} = event.target;

        if (checked) {
            setProductBrand([...productBrand, value]);
        } else {
            setProductBrand(productBrand.filter((item) => item !== value));
        }
    };

    const handleColorCheckboxChange = (event) => {
        const {value, checked} = event.target;

        if (checked) {
            setProductColor([...productColor, value]);
        } else {
            setProductColor(productColor.filter((item) => item !== value));
        }
    };

    const handleSort = (value) => {
        setSortedItem(value)
    }

    const showMenu = () => {
        setTimeout(() => {
            showRef.current.classList.add("show")
        }, 250);
    }

    return (
        <>
            {
                allCatLoading || catLoading ? (
                    <div className="loader-box">
                        <Loader />
                    </div>
                ) : allCateErr || catError ? (
                    <div className="loader-box">
                        <NotFound error={allCateErr || catError}/>
                    </div>
                ) : !category?.parentId && hasSubCategory ? (
                    <MainCategory
                        categorySlug={categorySlug}
                        category={category}
                        products={products}
                        currentPage={currentPage}
                        sortedItem={sortedItem}
                        productColor={productColor}
                        productBrand={productBrand}
                        productPrice={productPrice}
                        perPage={perPage}
                        setProductPrice={setProductPrice}
                        paginateProducts={paginateProducts}
                        handlePerPageChange={handlePerPageChange}
                        loadMoreProducts={loadMoreProducts}
                        handleBrandCheckboxChange={handleBrandCheckboxChange}
                        handleColorCheckboxChange={handleColorCheckboxChange}
                        handleSort={handleSort}
                        showRef={showRef}
                        showMenu={showMenu}
                    />
                ) : category?.parentId && hasSubCategory ? (
                    <Subcategory
                        category={category}
                        allCategories={allCategories}
                        showRef={showRef}
                        showMenu={showMenu}
                    />
                ) : category?.parentId && !hasSubCategory ? (
                    <SubSubCategory
                        categorySlug={categorySlug}
                        products={products}
                        category={category}
                        currentPage={currentPage}
                        sortedItem={sortedItem}
                        productColor={productColor}
                        productBrand={productBrand}
                        productPrice={productPrice}
                        perPage={perPage}
                        setProductPrice={setProductPrice}
                        paginateProducts={paginateProducts}
                        handlePerPageChange={handlePerPageChange}
                        handleBrandCheckboxChange={handleBrandCheckboxChange}
                        handleColorCheckboxChange={handleColorCheckboxChange}
                        handleSort={handleSort}
                        shops={shops}
                    />
                ) : !category?.parentId && !hasSubCategory ? (
                    <SubSubCategory />
                ) : null
            }
        </>
    );
};

export default SingleCategory;
