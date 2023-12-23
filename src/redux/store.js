import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import searchReducer from "../features/searchProductsSlice";
import compareProductsReducer from "../features/compareProducts";
import miniCartReducer from "../features/miniCartSlice";
import filterReducer from "../features/productFilterSlice";
import cartReducer from "../features/cartSlice";
import {registerReducer} from "../features/registerSlice";
import {stripeReducer} from "../features/stripeApiSlice";
import {allReviewsReducer} from "../features/getAllReviewSlice";
import {otpReducer} from "../features/otpSlice";
import {authReducer} from "../features/authSlice";
import {authMeReducer} from "../features/authMeSlice";
import {categoriesReducer} from "../features/categoriesSlice";
import {pagesReducer} from "../features/pageSlice";
import {resendOtpReducer} from "../features/resendOtpSlice";
import {brandsReducer} from "../features/brandSlice";
import {brandReducer} from "../features/getSingleBrand";
import {allCategoriesReducer} from "../features/allCategories";
import {offerReducer} from "../features/offerSlice";
import {productsReducer} from "../features/productsSlice";
import {productReducer} from "../features/getProduct";
import {categoryReducer} from "../features/singleCategorySlice";
import {shopsReducer} from "../features/shopsSlice";
import {accountReducer} from "../features/accountSlice";
import {wishListReducer} from "../features/wishList";
import {couponReducer} from "../features/couponSlice";

const store = configureStore({
    reducer: {
        showMenu: menuReducer,
        searchProducts: searchReducer,
        filterProducts: filterReducer,
        compareProducts: compareProductsReducer,
        showCart: miniCartReducer,
        cart: cartReducer,
        register: registerReducer,
        allReviewsReducer,
        otp: otpReducer,
        auth: authReducer,
        authMe: authMeReducer,
        categories: categoriesReducer,
        pages: pagesReducer,
        resendOtp: resendOtpReducer,
        brands: brandsReducer,
        singleBrand: brandReducer,
        offers: offerReducer,
        products: productsReducer,
        stripe: stripeReducer,
        product: productReducer,
        accounts: accountReducer,
        category: categoryReducer,
        allCategories: allCategoriesReducer,
        wishlist: wishListReducer,
        shops: shopsReducer,
        coupons: couponReducer,
    }
})

export default store;