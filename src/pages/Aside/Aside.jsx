import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AsideNavigation from "../../components/AsideComponents/AsideNavigation/AsideNavigation";
import AsideTopNav from "../../components/AsideComponents/AsideTopNav/AsideTopNav";
import AsideDepartments from "../../components/AsideComponents/AsideDepartments/AsideDepartments";
import "../../styles/aside.scss"
import {menuActions} from "../../features/menuSlice";
import {Link} from "react-scroll";

const Aside = () => {

    const [categoryId, setCategoryId] = useState("")
    const {showMenu} = useSelector(state => state.showMenu)
    const dispatch = useDispatch();

    function closeMenu () {
        dispatch(menuActions.closeMenu())
    }
    function toggleSidebar(id) {
        setCategoryId(id)
    }

    return (
        <aside className={showMenu ? "off show-menu" : "off"}>
            <div className="off__canvas canvas">
                <div className="canvas__head">
                    <div className="logo canvas__logo">
                        <Link className="logo__link" to="/">
                            <span className="logo__circle canvas__circle"></span>.Store
                        </Link>
                    </div>
                    <div onClick={closeMenu} className="close canvas__close" ><i className="ri-close-line"></i></div>
                </div>
                <AsideDepartments categoryId={categoryId} toggleSidebar={toggleSidebar} />
                <AsideNavigation categoryId={categoryId} toggleSidebar={toggleSidebar} />
                <AsideTopNav />
            </div>
        </aside>
    );
};

export default Aside;