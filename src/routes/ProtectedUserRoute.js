import React from 'react';
import {useSelector} from "react-redux";
import NotFound from '../components/NotFound/NotFound';

const ProtectedUserRoute = ({children}) => {
    const {data, loading, isAuthenticated} = useSelector(state => state.authMe);    

    if (loading === false) {
        if (!isAuthenticated && data.role === "user"){
            return (
                <NotFound error={{status: 404}}/>
            )
        }
        return children
    }
};

export default ProtectedUserRoute;