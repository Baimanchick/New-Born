import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { BrandI } from "../../../components/BrandCard/BrandCard.props";


const initialState: BrandI = {
    brand: []
}

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setBrand: (state, action: PayloadAction<BrandI>) => {
            state.brand = action.payload.brand;
        },
    }
});

export const fetchBrand = () : AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/brands/`)
        const data: BrandI = {brand : response.data.results };
        console.log(data);
        
        dispatch(brandSlice.actions.setBrand(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setBrand } = brandSlice.actions;
export default brandSlice.reducer;