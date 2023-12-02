import Layout from "../../layout/Layout";
import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {fetchAuthMe} from "../../features/authMeSlice";
import '../../styles/App.scss';
import {Toaster} from "react-hot-toast";

function App() {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchAuthMe());
        },[dispatch]);

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
      <Layout />
    </>
  )
}

export default App;
