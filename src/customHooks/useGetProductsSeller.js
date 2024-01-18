import {useEffect, useState} from 'react';

const UseGetProductsSeller = (filteredProducts, shops) => {

    const [productsShop, setProductsShop] = useState([]);

    useEffect(() => {
        if (filteredProducts && shops) {
            const sellers = {};

            filteredProducts.forEach((product) => {
                const shop = shops.find((shop) => shop._id === product.shopId);
                if (shop) {
                    const shopName = shop.name;
                    const shopId = shop._id;
                    if (!sellers[shopName]) {
                        sellers[shopName] = {
                            name: shopName,
                            id: shopId,
                            count: 1,
                        };
                    } else {
                        sellers[shopName].count += 1;
                    }
                }
            });

            const shopsArray = [];
            for (const shopName in sellers) {
                shopsArray.push({
                    name: shopName,
                    id: sellers[shopName].id,
                    count: sellers[shopName].count,
                });
            }

            setProductsShop(shopsArray);
        }
    }, [filteredProducts, shops]);

    return productsShop;
}
export default UseGetProductsSeller;