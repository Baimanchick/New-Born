import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./features/carousel/carouselSlice";
import categoryReducer from "./features/category/categorySlice";




export const store = configureStore({
    reducer: {
        carousel: carouselReducer,
        category: categoryReducer
    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;