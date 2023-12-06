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
import {getAllShops} from "../../features/shopsSlice";
import "./single-category.scss";

const SingleCategory = () => {
    const [hasSubCategory, setHasSubCategory] = useState(false);
    const showRef = useRef(null);

    const {data: category, loading: catLoading, error: catError} = useSelector(state => state.category);
    const {data: allCategories, loading: allCatLoading, error: allCateErr} = useSelector(state => state.allCategories);
    const {data: products} = useSelector(state => state.products);
    const {data: shops} = useSelector(state => state.shops);

    const {slug: categorySlug} = useParams();
    const dispatch = useDispatch();

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
                        <Loader/>
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
                        category={category}
                        shops={shops}
                    />
                ) : !category?.parentId && !hasSubCategory ? (
                    <SubSubCategory
                        category={category}
                        shops={shops}
                    />
                ) : null
            }
        </>
    );
};

export default SingleCategory;
