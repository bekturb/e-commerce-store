import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import compareProductsReducer from "../features/compareProducts";
import cartReducer from "../features/miniCartSlice";
import {registerReducer} from "../features/registerSlice";
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
import filterReducer from "../features/productFilterSlice";
import {offerReducer} from "../features/offerSlice";
import {productsReducer} from "../features/productsSlice";
import {productReducer} from "../features/getProduct";
import {categoryReducer} from "../features/singleCategorySlice";
import {shopsReducer} from "../features/shopsSlice";
import {accountReducer} from "../features/accountSlice";
import {wishListReducer} from "../features/wishList";

const store = configureStore({
    reducer: {
        showMenu: menuReducer,
        filterProducts: filterReducer,
        compareProducts: compareProductsReducer,
        showCart: cartReducer,
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
        product: productReducer,
        accounts: accountReducer,
        category: categoryReducer,
        allCategories: allCategoriesReducer,
        wishlist: wishListReducer,
        shops: shopsReducer,
    }
})

export default store;