import { useEffect, useState } from 'react';

function useFilteredCategoryProducts({
                                         filteredProducts,
                                         productCategory,
                                         productBrand,
                                         productColor,
                                         productMinPrice,
                                         productMaxPrice,
                                         productShop,
                                         productSort,
                                     }) {
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        if (
            filteredProducts?.length > 0
        ) {
            const updatedFilteredProducts = filteredProducts?.filter((product) => {
                if (
                    (!productBrand || productBrand.length === 0 || productBrand.includes(product.brand)) &&
                    (!productCategory || productCategory.length === 0 || productCategory.includes(product.category)) &&
                    (!productColor || productColor.length === 0 || product.variants.some((variant) => productColor.includes(variant.color.name))) &&
                    (!productShop || productShop.length === 0 || productShop.includes(product.shopId)) &&
                    (!productMinPrice || productMinPrice.length === 0 || !productMaxPrice || productMaxPrice.length === 0 || product.variants.some((variant) => variant.originalPrice >= productMinPrice && variant.originalPrice <= productMaxPrice))
                ) {
                    return true;
                }
                return false;
            });

            const sortedProducts = sortProducts(updatedFilteredProducts, productSort);
            setCategoryProducts(sortedProducts);
        } else {
            setCategoryProducts(filteredProducts);
        }
    }, [
        filteredProducts,
        productCategory,
        productBrand,
        productColor,
        productShop,
        productMinPrice,
        productMaxPrice,
        productSort,
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