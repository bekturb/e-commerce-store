import React, {useState} from 'react';
import {useSelector} from "react-redux";
import "./aside-departments.scss"

const AsideDepartments = ({categoryId, toggleSidebar}) => {

    const {data} = useSelector(state => state.categories);

    const [categoriesToExclude] = useState(["Shop", "Women", "Men"]);
    const filteredCategories = data ? data.filter(category => !categoriesToExclude.includes(category.name)) : [];

    function chunkArray(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }

    return (
        <div className="departments category">
            <div className="category__cat">
                <div className="category__head">
                    <div className="category__text">
                        All Departments
                    </div>
                    <div className="mini-text category__mini-text">
                        Total 1059 Products
                    </div>
                    <a className="category__trigger" href="#">
                        <i className="ri-menu-3-line ri-xl"></i>
                    </a>
                </div>
                <div className="menu departments__menu">
                    <ul className="menu__list">
                        {
                            filteredCategories.map(category => (
                                <li key={category._id} onClick={() => toggleSidebar(category._id)} className={categoryId === category._id ? "menu__item child expand" : "menu__item child"}>
                                    <div className="menu__link">
                                                <span className="menu__icon  icon-lg">
                                                    <i className={category.icon}></i>
                                                </span>
                                        {category.name}
                                        {
                                            category.children.length > 0 &&
                                            <span className="menu__icon icon-sm">
                                                    <i className="ri-arrow-right-s-line"></i>
                                                </span>
                                        }
                                    </div>
                                    {
                                        category.children.length > 0 && (
                                            category.children.filter(subcategory => subcategory.children.length > 0).length > 0  ? (
                                                <div className="kit child__kit">
                                                    <div className="kit__wrapper">
                                                        {
                                                            chunkArray(category.children, 2).map((rowSubcategories, rowIndex) => (
                                                                <div key={rowIndex} className="kit__inner flexcol">
                                                                    {
                                                                        rowSubcategories.map(subcategory => (
                                                                            <div  key={subcategory._id} className="kit__row">
                                                                                <h4 className="kit__main-title">
                                                                                    <a className="kit__main-link" href="">{subcategory.name}</a>
                                                                                </h4>
                                                                                {
                                                                                    subcategory.children.length > 0 && (
                                                                                        <ul className='kit__list'>
                                                                                            {
                                                                                                subcategory.children.map(subsubcategory => (
                                                                                                    <li key={subsubcategory._id} className="kit__category">
                                                                                                        <a className="kit__link" href="#">{subsubcategory.name}</a>
                                                                                                    </li>
                                                                                                ))
                                                                                            }
                                                                                        </ul>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="child__item">
                                                    <ul className="child__list">
                                                        {
                                                            category.children.map(subcategory => (
                                                                <li key={subcategory._id} className="child__category">
                                                                    <a className="child__link" href="#">{subcategory.name}</a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AsideDepartments;