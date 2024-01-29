import React from 'react';
import {useSelector} from "react-redux";
import SecTop from "../SecTop/SecTop";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";
import BigProduct from "../BigProduct/BigProduct";
import MiniProduct from "../MiniProduct/MiniProduct";
import "./trending.scss";

function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
const Trending = () => {

    const {data: products, loading: productsLoad, error:productsErr} = useSelector(state => state.products);
    const sortedOffers = products ? [...products].filter(pro => pro.salePercentage > 0).sort((a, b) => b.totalSold - a.totalSold).slice(0,9) : [];

    const [bigItem, ...miniItems] = sortedOffers;
    const miniChunks = chunkArray(miniItems, Math.ceil(miniItems.length / 2));

    return (
        <div className="trending">
            <div className="container">
                <div className="trending__wrapper">
                    {
                        sortedOffers?.length > 0 && (
                            <SecTop title="Trending Products"/>
                        )
                    }
                    <div className="trending__column">
                        {
                            productsLoad ? null : productsErr ? (
                                <div className="trending__loader">
                                    <NotFound error={productsErr} />
                                </div>
                            ) : sortedOffers.length > 0 ? (
                                <div className="trending__inner flexwrap">
                                    {
                                        bigItem && (
                                            <BigProduct bigItem={bigItem}/>
                                        )
                                    }
                                    {
                                        miniChunks?.map((miniChunk, chunkIndex) => (
                                            <MiniProduct key={chunkIndex} miniChunk={miniChunk} chunkIndex={chunkIndex}
                                            />
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;