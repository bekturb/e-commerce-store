import { useEffect, useState } from 'react';

function useFilteredCategoryProducts({
                                         filteredProducts,
                                         categorySlug,
                                         productBrand,
                                         productColor,
                                         productPrice,
                                         sortedItem,
                                     }) {
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        if (
            filteredProducts?.length > 0 &&
            categorySlug
        ) {
            const updatedFilteredProducts = filteredProducts?.filter((product) => {
                if (
                    (!productBrand || productBrand.length === 0 || productBrand.includes(product.brand)) &&
                    (!productColor || productColor.length === 0 || product.variants.some((variant) => productColor.includes(variant.color))) &&
                    (!productPrice || productPrice.length === 0 || product.variants.some((variant) => variant.originalPrice >= productPrice))
                ) {
                    return true;
                }
                return false;
            });

            const sortedProducts = sortProducts(updatedFilteredProducts, sortedItem);
            setCategoryProducts(sortedProducts);
        } else {
            setCategoryProducts(filteredProducts);
        }
    }, [
        filteredProducts,
        categorySlug,
        productBrand,
        productColor,
        productPrice,
        sortedItem,
    ]);

    function sortProducts(products, sortedItem) {
        return [...products].sort((a, b) => {
            if (sortedItem === 'Product Name') {
                return a.name.localeCompare(b.name);
            } else if (sortedItem === 'Descending Price') {
                return Math.floor(b.variants[0].originalPrice) - Math.floor(a.variants[0].originalPrice);
            }else if (sortedItem === 'Ascending Price') {
                return Math.floor(a.variants[0].originalPrice) - Math.floor(b.variants[0].originalPrice);
            } else if (sortedItem === 'Popularity') {
                return Math.floor(a.totalSold) - Math.floor(b.totalSold);
            }else if (sortedItem === 'Rating') {
                return Math.floor(a.totalRating) - Math.floor(b.totalRating);
            }else if (sortedItem === 'New') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            return 0;
        });
    }

    return categoryProducts;
}

export default useFilteredCategoryProducts;