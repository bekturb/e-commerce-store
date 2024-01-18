import { useEffect, useState } from 'react';

const UseGetDefinitelyCategories = (filteredProducts, allCategories) => {
    const [categoryCounts, setCategoryCounts] = useState([]);

    useEffect(() => {
        if (filteredProducts && allCategories) {
            const newCategoryCounts = {};

            filteredProducts.forEach((product) => {
                const category = allCategories.find((category) => category._id === product.category);
                if (category) {
                    const categoryName = category.name;
                    const categoryId = category._id;
                    if (!newCategoryCounts[categoryName]) {
                        newCategoryCounts[categoryName] = {
                            id: categoryId,
                            count: 1,
                        };
                    } else {
                        newCategoryCounts[categoryName].count += 1;
                    }
                }
            });

            const categoryCountsArray = Object.entries(newCategoryCounts).map(([name, { id, count }]) => ({
                name,
                id,
                count,
            }));

            setCategoryCounts(categoryCountsArray);
        }
    }, [filteredProducts, allCategories]);

    return categoryCounts;
};

export default UseGetDefinitelyCategories;