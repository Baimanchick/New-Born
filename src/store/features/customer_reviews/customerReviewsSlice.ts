import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { CustomerReviewsCarouselI } from "../../../components/Carousel/CustomerReviews.props";


const initialState: CustomerReviewsCarouselI  = {
    customerReviews: []
}

const customerReviewsSlice = createSlice({
    name: 'customerReviews',
    initialState,
    reducers: {
        setCustomerReviews: (state, action: PayloadAction<CustomerReviewsCarouselI>) => {
            state.customerReviews = action.payload.customerReviews;
        },
    }
});

export const fetchCustomerReviews = () : AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/customereviews/`)
        const data: CustomerReviewsCarouselI = {customerReviews : response.data.results };        
        dispatch(customerReviewsSlice.actions.setCustomerReviews(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setCustomerReviews } = customerReviewsSlice.actions;
export default customerReviewsSlice.reducer;