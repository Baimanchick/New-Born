import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { AdI } from "../../../components/AdCard/AdCard.props";


const initialState: AdI = {
    ad: []
}

const adSlice = createSlice({
    name: 'ad',
    initialState,
    reducers: {
        setAd: (state, action: PayloadAction<AdI>) => {
            state.ad = action.payload.ad;
        },
    }
});

export const fetchAd = () : AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/promotion/`)
        const data: AdI = {ad : response.data.results };
        dispatch(adSlice.actions.setAd(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setAd } = adSlice.actions;
export default adSlice.reducer;