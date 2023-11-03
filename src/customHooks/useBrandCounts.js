import { useEffect, useState } from 'react';

function useBrandCounts(filteredProducts, brands) {
    const [brandCounts, setBrandCounts] = useState([]);

    useEffect(() => {
        if (filteredProducts && brands) {
            const brandCounts = {};

            filteredProducts.forEach((product) => {
                const brand = brands.find((brand) => brand._id === product.brand);
                if (brand) {
                    const brandName = brand.name;
                    const brandId = brand._id;
                    if (!brandCounts[brandName]) {
                        brandCounts[brandName] = {
                            id: brandId,
                            count: 1,
                        };
                    } else {
                        brandCounts[brandName].count += 1;
                    }
                }
            });

            const brandCountsArray = [];
            for (const brandName in brandCounts) {
                brandCountsArray.push({
                    name: brandName,
                    id: brandCounts[brandName].id,
                    count: brandCounts[brandName].count,
                });
            }

            setBrandCounts(brandCountsArray);
        }
    }, [filteredProducts, brands]);

    return brandCounts;
}

export default useBrandCounts;