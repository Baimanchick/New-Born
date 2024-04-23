import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import $axios from "../../../utils/axios";
import { API_URL } from "../../../utils/consts";
import { CategoryI } from "../../../components/CategoryCard/CategoryCard.props";


const initialState: CategoryI = {
    category: []
}

const categoryCardlSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryCard: (state, action: PayloadAction<CategoryI>) => {
            state.category = action.payload.category;
        },
    }
});

export const fetchCategory = () : AppThunk => async (dispatch) => {
    try {
        const response = await $axios.get(`${API_URL}/categories/`)
        const data: CategoryI = {category : response.data.results };
        dispatch(categoryCardlSlice.actions.setCategoryCard(data))
    } catch (error) {
        console.log(error);
    }
}

export const { setCategoryCard } = categoryCardlSlice.actions;
export default categoryCardlSlice.reducer;