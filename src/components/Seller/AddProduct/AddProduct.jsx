import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../features/categoriesSlice";
import {fetchProducts} from "../../../features/productsSlice";
import AddProductVariants from "../AddProductVariants/AddProductVariants";
import "./add-product.scss";

const AddProduct = () => {

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [variants, setVariants] = useState([{ color: '', image: '' }]);

    const [open, setOpen] = useState("");
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [subSubCategory, setSubSubCategory] = useState("");
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const {data: categories} = useSelector(state => state.categories);
    const {data: products} = useSelector(state => state.products);

    const dispatch = useDispatch();

    const filteredProducts = products ? [...products].filter(el => el.category === categoryId) : [];

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, [dispatch]);

    const filterCategory = (children, name, categoryId) => {
        setCategory(name)
        setSubSubCategories([])
        setSubCategory("")
        setSubSubCategory("")

        if (children?.length > 0){
            setSubCategories(children)
            setCategoryId("")
            setOpen("")
        }else {
            setSubCategories([])
            setCategoryId(categoryId)
            setOpen("")
        }
    }

    const filterSubCategory = (children, name, categoryId) => {

        setSubCategory(name)
        setSubSubCategory("")

        if (children?.length > 0) {
            setSubSubCategories(children)
            setCategoryId("")
            setOpen("")
        }else {
            setCategoryId(categoryId)
            setSubSubCategories(children)
            setOpen("")
        }
    }

    const filterSubSubCategory = (name, categoryId) => {
        setSubSubCategory(name)
        setCategoryId(categoryId)
        setOpen("")
    }

    const uniqueBrands = [...new Set(filteredProducts.map((product) => product.brand))];

    const handleSearch = (e) => {
        const {value} = e.target
        setSelectedBrand(value)

        if (!value) {
            setBrands([])
        } else {
            const filterBrands = uniqueBrands?.filter(brand => brand.includes(value))
            setBrands(filterBrands)
        }
    }

    const handleChangeBrand = (value) => {
        setSelectedBrand(value)
        setBrands([])
    }

    const handleAddTags = (event) => {
        if (event.target.value !== "") {
            setSelectedTags([...selectedTags, event.target.value]);
            event.target.value = ""
        }
    }

    const removeTags = (indexToRemove) => {
        setSelectedTags(selectedTags.filter((_, index) => index !== indexToRemove));
    }

    return (
        <div className="add-product">
            <div className="add-product__inner">
                <h1 className="add-product__main-title">Feature</h1>
                <form className="form add-product__form">
                    <div className="form-item add-product__form-item">
                        <p className="form-item__title">Name</p>
                        <input
                            className="input form-item__input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-item add-product__form-item">
                        <p className="form-item__title">Description</p>
                        <textarea
                            className="input form-item__input form-item__input--area"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-item add-product__form-item">
                        <p className="form-item__title">Main Category</p>
                        <div className="unique-dropdown">
                            <div className="unique-dropdown__cap">
                                <button className="unique-dropdown__button" type="button" onClick={open === "category" ? () => setOpen("") : () => setOpen("category")}>
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
                                                <li key={cat._id} onClick={() => filterCategory(cat.children, cat.name, cat._id)} className={category === cat.name ? "unique-dropdown__list-item unique-dropdown__list-item--active" : "unique-dropdown__list-item"}>
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
                            <div className="form-item add-product__form-item">
                                <p className="form-item__title">Category</p>
                                <div className="unique-dropdown">
                                    <div className="unique-dropdown__cap">
                                        <button className="unique-dropdown__button" type="button" onClick={open === "subCategory" ? () => setOpen("") : () => setOpen("subCategory")}>
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
                                                        <li key={cat._id} onClick={() => filterSubCategory(cat.children, cat.name, cat._id)} className={subCategory === cat.name ? "unique-dropdown__list-item unique-dropdown__list-item--active" : "unique-dropdown__list-item"}>
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
                                                                <li key={cat._id} onClick={() => filterSubSubCategory(cat.name, cat._id)} className={subSubCategory === cat.name ? "unique-dropdown__list-item unique-dropdown__list-item--active" : "unique-dropdown__list-item"}>
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
                    <div className="form-item add-product__form-item">
                        <p className="form-item__title">Brand</p>
                        <div className="unique-dropdown">
                            <div className="unique-dropdown__cap">
                                <input
                                    className="input unique-dropdown__input"
                                    type="text"
                                    value={selectedBrand}
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                            {
                                brands.length > 0 && (
                                    <div className="unique-dropdown__body unique-dropdown__body--visibility">
                                        <ul className="unique-dropdown__list">
                                            {
                                                brands.map((brand, idx) => (
                                                    <li key={idx} onClick={() => handleChangeBrand(brand)} className={selectedBrand === brand ? "unique-dropdown__list-item unique-dropdown__list-item--active" : "unique-dropdown__list-item"}>
                                                        {brand}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="form-item add-product__form-item">
                        <p className="form-item__title">Stock</p>
                        <input
                            className="input form-item__input"
                            type="text"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="form-item add-product__form-item">
                        <p className="form-item__title">Tags</p>
                        <div className="tags-field">
                            {
                                selectedTags?.length > 0 && (
                                    <ul className="tags-field__list">
                                        {
                                            selectedTags.map((tag, index) => (
                                                <li className="tags-field__list-item" key={index}>
                                                    <span className="tags-field__item-name">
                                                        {tag}
                                                    </span>
                                                    <span onClick={() => removeTags(index)} className="tags-field__item-icon">
                                                        <i className="ri-close-line"></i>
                                                    </span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                            <input
                                className="tags-field__input"
                                type="text"
                                placeholder="Press enter to add tags"
                                onKeyUp={(e) => (e.key === "Enter" ? handleAddTags(e) : null) }
                            />
                        </div>
                    </div>
                    <AddProductVariants variants={variants} setVariants={setVariants}/>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;