import Layout from "../../layout/Layout";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe} from "../../features/authMeSlice";
import '../../styles/App.scss';

function App() {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(fetchAuthMe());
        },[dispatch]);

  return (
    <>
      <Layout />
    </>
  )
}

export default App;
