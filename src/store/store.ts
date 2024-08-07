import { configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./features/carousel/carouselSlice";
import categoryReducer from "./features/category/categorySlice";
import adReducer from "./features/ad/adSlice";
import brandReducer from "./features/brand/brandSlice";
import reviewsReducer from "./features/customer_reviews/customerReviewsSlice";
import productsReducer from "./features/products/productSlice";
import oneProductReducer from "./features/products/oneProductSlice";
import authSlice from "./features/auth/authSlice";
import favoritesReducer from "./features/favorite/favoriteSlice";
import cartReducer from "./features/cart/cartSlice";
import deliveryReducer from "./features/delivery/deliveryDetailSlice";
import orderHistoryReducer from "./features/orders/orderHistorySlice";

const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    category: categoryReducer,
    ad: adReducer,
    brand: brandReducer,
    favorites: favoritesReducer,
    deliveryDetail: deliveryReducer,
    carts: cartReducer,
    auth: authSlice,
    customerReviews: reviewsReducer,
    products: productsReducer,
    oneProduct: oneProductReducer,
    orderHistory: orderHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
