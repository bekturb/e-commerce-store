import React from 'react';
import "./overlay.scss";
import {useSelector} from "react-redux";

const Overlay = () => {
    const {showMenu} = useSelector(state => state.showMenu);

    return (
        <div className={showMenu ? "overlay show" : "overlay"}></div>
    );
};

export default Overlay;