import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./features/carousel/carouselSlice";
import categoryReducer from "./features/category/categorySlice";
import adReducer from "./features/ad/adSlice";





export const store = configureStore({
    reducer: {
        carousel: carouselReducer,
        category: categoryReducer,
        ad: adReducer

    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;