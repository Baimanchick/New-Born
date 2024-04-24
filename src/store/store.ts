import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./features/carousel/carouselSlice";
import categoryReducer from "./features/category/categorySlice";
import adReducer from "./features/ad/adSlice";
import brandReducer from "./features/brand/brandSlice";
import reviewsReducer from "./features/customer_reviews/customerReviewsSlice";
import productsReducer from "./features/products/productSlice";




export const store = configureStore({
    reducer: {
        carousel: carouselReducer,
        category: categoryReducer,
        ad: adReducer,
        brand: brandReducer,
        customerReviews: reviewsReducer,
        products: productsReducer,

    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;