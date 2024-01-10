import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {loading, isAuthenticated} = useSelector(state => state.myShop);

    if (loading === false) {
        if (!isAuthenticated){
            return <Navigate to="/shop-login" replace/>
        }
        return children
    }
};

export default ProtectedRoute;