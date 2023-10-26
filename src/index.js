import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox"
import {SkeletonTheme} from "react-loading-skeleton";
import {Provider} from "react-redux";
import App from "./pages/App";
import store from "./redux/store";
import './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <SkeletonTheme>
            <BrowserRouter>
                <SimpleReactLightbox>
                    <App/>
                </SimpleReactLightbox>
            </BrowserRouter>
        </SkeletonTheme>
    </Provider>
);