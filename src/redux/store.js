import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import cartReducer from "../features/miniCartSlice";
import {registerReducer} from "../features/registerSlice";
import {otpReducer} from "../features/otpSlice";
import {authReducer} from "../features/authSlice";
import {authMeReducer} from "../features/authMeSlice";
import {categoriesReducer} from "../features/categoriesSlice";
import {pagesReducer} from "../features/pageSlice";
import {resendOtpReducer} from "../features/resendOtpSlice";
import {brandsReducer} from "../features/brandSlice";
import {allCategoriesReducer} from "../features/allCategories";
import {offerReducer} from "../features/offerSlice";
import {productReducer} from "../features/productsSlice";
import {categoryReducer} from "../features/singleCategorySlice";
import {shopsReducer} from "../features/shopsSlice";
import {accountReducer} from "../features/accountSlice";
import {wishListReducer} from "../features/wishList";

const store = configureStore({
    reducer: {
        showMenu: menuReducer,
        showCart: cartReducer,
        register: registerReducer,
        otp: otpReducer,
        auth: authReducer,
        authMe: authMeReducer,
        categories: categoriesReducer,
        pages: pagesReducer,
        resendOtp: resendOtpReducer,
        brands: brandsReducer,
        offers: offerReducer,
        products: productReducer,
        accounts: accountReducer,
        category: categoryReducer,
        allCategories: allCategoriesReducer,
        wishlist: wishListReducer,
        shops: shopsReducer,
    }
})

export default store;