import {configureStore} from "@reduxjs/toolkit";
import menuReducer from "../features/menuSlice";
import compareProductsReducer from "../features/compareProducts";
import miniCartReducer from "../features/miniCartSlice";
import filterReducer from "../features/productFilterSlice";
import cartReducer from "../features/cartSlice";
import searchByImageReducer from "../features/searchByImageSlice";
import {registerReducer} from "../features/registerSlice";
import {shopRegisterReducer} from "../features/shopRegisterSlice";
import {searchProductsReducer} from "../features/searchProductsSlice";
import {stripeReducer} from "../features/stripeApiSlice";
import {allReviewsReducer} from "../features/getAllReviewSlice";
import {otpReducer} from "../features/otpSlice";
import {shopOtpReducer} from "../features/shopOtpSlice";
import {authReducer} from "../features/authSlice";
import {authShopReducer} from "../features/authShopSlice";
import {authMeReducer} from "../features/authMeSlice";
import {myShopReducer} from "../features/myShopSlice";
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
        filterProducts: filterReducer,
        compareProducts: compareProductsReducer,
        showCart: miniCartReducer,
        cart: cartReducer,
        searchByImageReducer,
        register: registerReducer,
        shopRegister: shopRegisterReducer,
        searchProducts: searchProductsReducer,
        myShop: myShopReducer,
        allReviewsReducer,
        otp: otpReducer,
        shopOtp: shopOtpReducer,
        auth: authReducer,
        authMe: authMeReducer,
        authShop: authShopReducer,
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