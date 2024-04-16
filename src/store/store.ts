import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./features/carousel/carouselSlice";


export const store = configureStore({
    reducer: {
        carousel: carouselReducer
    }
})

export type RootStates = ReturnType<typeof store.getState>;
export type AppThunk <ReturnType = void> = ThunkAction<
  ReturnType,
  RootStates,
  unknown,
  Action<string>
>;