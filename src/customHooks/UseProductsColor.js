import {useEffect, useState} from 'react';

const UseProductsColor = (filteredProducts) => {

    const [uniqueColors, setUniqueColors] = useState([]);

    useEffect(() => {
        const uniqueColorsObj = {};

        if (filteredProducts) {
            filteredProducts.forEach((product) => {
                product.variants.forEach((variant) => {
                    const color = variant.color;
                    if (uniqueColorsObj[color]) {
                        uniqueColorsObj[color]++;
                    } else {
                        uniqueColorsObj[color] = 1;
                    }
                });
            });
        }

        const uniqueColorsArray = Object.keys(uniqueColorsObj).map((color) => ({
            color,
            count: uniqueColorsObj[color],
        }));

        setUniqueColors(uniqueColorsArray);
    }, [filteredProducts]);

    return uniqueColors;
};

export default UseProductsColor;