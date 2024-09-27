import Routers from "../../routers/Routers";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {fetchAuthMe} from "../../features/authMeSlice";
import {Toaster} from "react-hot-toast";
import {fetchMyShop} from "../../features/myShopSlice";
import '../../styles/App.scss';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
        dispatch(fetchMyShop());
    }, [dispatch]);

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 2000,
                    style: {
                        height: "40px"
                    }
                }}
            />
            <Routers/>
        </>
    )
}

export default App;
