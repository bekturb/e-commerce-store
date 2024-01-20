import {useEffect, useState} from 'react';

const UseProductsColor = (filteredProducts) => {

    const [uniqueColors, setUniqueColors] = useState([]);

    useEffect(() => {
        const uniqueColorsObj = {};

        if (filteredProducts?.length > 0) {
            filteredProducts.forEach((product) => {
                product.variants.forEach((variant) => {
                    const color = variant.color.name;
                    const hex = variant.color.hex;
                    if (!uniqueColorsObj[color]) {
                        uniqueColorsObj[color] = {
                            name: color,
                            hex,
                            count: 1
                        };
                    } else {
                        uniqueColorsObj[color].count += 1;
                    }
                });
            });
        }

        const uniqueColorsArray = Object.keys(uniqueColorsObj).map((color) => ({
            name: uniqueColorsObj[color].name,
            hex: uniqueColorsObj[color].hex,
            count: uniqueColorsObj[color].count
        }));

        setUniqueColors(uniqueColorsArray);
    }, [filteredProducts]);

    return uniqueColors;
};

export default UseProductsColor;