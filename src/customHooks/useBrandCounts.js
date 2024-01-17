import { useEffect, useState } from 'react';

function useBrandCounts(filteredProducts) {
    const [brandCounts, setBrandCounts] = useState([]);

    useEffect(() => {
        if (filteredProducts) {
            const brandCounts = {};

            filteredProducts.forEach((product) => {
                const brandName = product.brand;
                if (!brandCounts[brandName]) {
                    brandCounts[brandName] = {
                        brandName,
                        count: 1,
                    };
                } else {
                    brandCounts[brandName].count += 1;
                }
            });

            const brandCountsArray = [];
            for (const brandName in brandCounts) {
                brandCountsArray.push({
                    name: brandName,
                    count: brandCounts[brandName].count,
                });
            }

            setBrandCounts(brandCountsArray);
        }
    }, [filteredProducts]);

    return brandCounts;
}

export default useBrandCounts;