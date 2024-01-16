import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../features/categoriesSlice";
import "./add-product.scss"

const AddProduct = () => {

    const [open, setOpen] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [subSubCategory, setSubSubCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);

    const dispatch = useDispatch();

    const {data: categories} = useSelector(state => state.categories);

    const filterCategory = (children, name) => {
        setCategory(name)
        setSubCategories(children)
        setSubSubCategories([])
        setSubCategory("")
        setSubSubCategory("")
        setOpen("")
    }

    const filterSubCategory = (children, name) => {
        setSubCategory(name)
        setSubSubCategories(children)
        setSubSubCategory("")

        if (!children?.length > 0){
            setOpen("")
        }
    }

    const filterSubSubCategory = (name) => {
        setSubSubCategory(name)
        setOpen("")
    }

    useEffect(() => {

        dispatch(fetchCategories());

    }, [dispatch]);

    return (
        <div className="add-product">
            <div className="add-product__inner">
                <h1 className="add-product__main-title">Feature</h1>
                <div className="form add-product__form">
                    <div className="add-product__form-item">
                        <p className="add-product__title">Name</p>
                        <input
                            className="input add-product__input"
                            type="text"
                        />
                    </div>
                    <div className="add-product__form-item">
                        <p className="add-product__title">Main Category</p>
                        <div className="unique-dropdown">
                            <div className="unique-dropdown__cap">
                                <button className="unique-dropdown__button" onClick={open === "category" ? () => setOpen("") : () => setOpen("category")}>
                                    {
                                        category ? category : "Select Main Category"
                                    }
                                    {
                                        open === "category" ?
                                            <span className="unique-dropdown__icon">
                                                <i className="ri-arrow-up-s-line"></i>
                                            </span> :
                                            <span className="unique-dropdown__icon">
                                                <i className="ri-arrow-down-s-line"></i>
                                            </span>
                                    }
                                </button>
                            </div>
                            {
                                open === "category" && categories?.length > 0 &&
                                <div className="unique-dropdown__body">
                                    <ul className="unique-dropdown__list">
                                        {
                                            categories.map(cat => (
                                                <li key={cat._id} onClick={() => filterCategory(cat.children, cat.name)} className={category === cat.name ? "unique-dropdown__list-item unique-dropdown__list-item--active" : "unique-dropdown__list-item"}>
                                                    {cat.name}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        subCategories.length > 0 && (
                            <div className="add-product__form-item">
                                <p className="add-product__title">Category</p>
                                <div className="unique-dropdown">
                                    <div className="unique-dropdown__cap">
                                        <button className="unique-dropdown__button" onClick={open === "subCategory" ? () => setOpen("") : () => setOpen("subCategory")}>
                                            {
                                                subCategory && subSubCategory ? subSubCategory : subCategory ? subCategory : "Select Category"
                                            }
                                            {
                                                open === "subCategory" ?
                                                    <span className="unique-dropdown__icon">
                                                <i className="ri-arrow-up-s-line"></i>
                                            </span> :
                                                    <span className="unique-dropdown__icon">
                                                <i className="ri-arrow-down-s-line"></i>
                                            </span>
                                            }
                                        </button>
                                    </div>
                                    {
                                        open === "subCategory" && subCategories?.length > 0 &&
                                        <div className="unique-dropdown__body">
                                            <ul className="unique-dropdown__list">
                                                {
                                                    subCategories.map(cat => (
                                                        <li onClick={() => filterSubCategory(cat.children, cat.name)} className={subCategory === cat.name ? "unique-dropdown__list-item unique-dropdown__list-item--active" : "unique-dropdown__list-item"}>
                                                            {cat.name}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            {
                                                subSubCategories.length > 0 && (
                                                    <ul className="unique-dropdown__list">
                                                        {
                                                            subSubCategories.map(cat => (
                                                                <li onClick={() => filterSubSubCategory(cat.name)} className={subSubCategory === cat.name ? "unique-dropdown__list-item unique-dropdown__list-item--active" : "unique-dropdown__list-item"}>
                                                                    {cat.name}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    }
                    {/*<div className="add-product__form-item">*/}
                    {/*    <p className="add-product__title">Brand</p>*/}
                    {/*    <div className="unique-dropdown">*/}
                    {/*        <div className="unique-dropdown__cap">*/}
                    {/*            <button className="unique-dropdown__button" onClick={open === "brand" ? () => setOpen("") : () => setOpen("brand")}>*/}
                    {/*                Select Category*/}
                    {/*                {*/}
                    {/*                    open === "brand" ?*/}
                    {/*                        <span className="unique-dropdown__icon">*/}
                    {/*                            <i className="ri-arrow-up-s-line"></i>*/}
                    {/*                        </span> :*/}
                    {/*                        <span className="unique-dropdown__icon">*/}
                    {/*                            <i className="ri-arrow-down-s-line"></i>*/}
                    {/*                        </span>*/}
                    {/*                }*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*        {*/}
                    {/*            open === "brand" &&*/}
                    {/*            <div className="unique-dropdown__body">*/}
                    {/*                <ul className="unique-dropdown__list">*/}
                    {/*                    <li className="unique-dropdown__list-item unique-dropdown__list-item--active">Women</li>*/}
                    {/*                    <li className="unique-dropdown__list-item">Women</li>*/}
                    {/*                    <li className="unique-dropdown__list-item">Women</li>*/}
                    {/*                </ul>*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;