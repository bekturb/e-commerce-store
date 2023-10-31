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

const SingleCategory = () => {
     const showRef = useRef(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [uniqueColors, setUniqueColors] = useState([]);
    const [brandCounts, setBrandCounts] = useState([]);
    const [hasSubCategory, setHasSubCategory] = useState(false);

    const {data: category, loading: catLoading, error: catError} = useSelector(state => state.category);
    const {data: allCategories, loading: allCatLoading, error: allCateErr} = useSelector(state => state.allCategories);
    const {data: categories} = useSelector(state => state.categories);
    const {data: products} = useSelector(state => state.products);
    const {data: brands} = useSelector(state => state.brands);

    const dispatch = useDispatch();
    const {slug: categorySlug} = useParams();

    useEffect(() => {
        dispatch(fetchCategory(categorySlug));
        dispatch(fetchAllCategories())
        dispatch(fetchBrands());
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
        if (categorySlug && categories) {
            const newFilteredCategories = categories.filter(categoryItem => categoryItem.slug === categorySlug);
            setFilteredCategories(newFilteredCategories);
        } else {
            setFilteredCategories([]);
        }
    }, [categorySlug, categories]);

    useEffect(() => {
        if (categorySlug && products) {
            const newFilteredProducts = products.filter(product => product.tags.includes(categorySlug));
            setFilteredProducts(newFilteredProducts);
        } else {
            setFilteredProducts([]);
        }
    }, [categorySlug, products]);

    useEffect(() => {
        if (filteredProducts) {
            const colors = new Set();
            filteredProducts.forEach(product => {
                product.variants.forEach(variant => {
                    colors.add(variant.color);
                });
            });
            setUniqueColors([...colors]);
        }
    }, [filteredProducts]);

    useEffect(() => {
        if (filteredProducts && brands) {
            const brandCounts = {};

            filteredProducts.forEach(product => {
                const brand = brands.find(brand => brand._id === product.brand);
                if (brand) {
                    const brandName = brand.name;
                    const brandId = brand._id;
                    if (!brandCounts[brandName]) {
                        brandCounts[brandName] = {
                            id: brandId,
                            count: 1,
                        };
                    } else {
                        brandCounts[brandName].count += 1;
                    }
                }
            });

            const brandCountsArray = [];
            for (const brandName in brandCounts) {
                brandCountsArray.push({
                    name: brandName,
                    id: brandCounts[brandName].id,
                    count: brandCounts[brandName].count,
                });
            }

            setBrandCounts(brandCountsArray);
        }
    }, [filteredProducts, brands]);

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
                        filteredCategories={filteredCategories}
                        filteredProducts={filteredProducts}
                        uniqueColors={uniqueColors}
                        brandCounts={brandCounts}
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
                        products={products}
                        category={category}
                    />
                ) : !category?.parentId && !hasSubCategory ? (
                    <SubSubCategory />
                ) : null
            }
        </>
    );
};

export default SingleCategory;
