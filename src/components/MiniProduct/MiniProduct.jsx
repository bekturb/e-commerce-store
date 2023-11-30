import React from 'react';
import {useSelector} from "react-redux";
import MiniProductCart from "./MiniProductCart";

const MiniProduct = ({miniChunk, chunkIndex}) => {

    const {data: wishListData, loading: wishListLoading} = useSelector(state => state.wishlist);
    const {data: compareProducts} = useSelector(state => state.compareProducts);

    return (
        <div className="products mini" key={chunkIndex}>
            {
                miniChunk?.map((miniProduct) => (
                    <MiniProductCart
                        key={ miniProduct._id}
                        miniProduct={miniProduct}
                        wishListData={wishListData}
                        wishListLoading={wishListLoading}
                        compareProducts={compareProducts}
                    />
                ))
            }
        </div>
    );
};

export default MiniProduct;