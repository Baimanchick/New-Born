import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CarouselI } from "../../../components/Carousel/Carousel.props";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";


const initialState: CarouselI = {
    carousel: []
    }

const carouselSlice = createSlice({
    name: 'carousel',
    initialState,
    reducers: {
        setCarousel: (state, action: PayloadAction<CarouselI>) => {
            state.carousel = action.payload.carousel;
        },
    }
});

export const fetchCarousel = () : AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/carousel_items/`)
        const data: CarouselI = {carousel : response.data.results };
        dispatch(carouselSlice.actions.setCarousel(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setCarousel } = carouselSlice.actions;
export default carouselSlice.reducer;