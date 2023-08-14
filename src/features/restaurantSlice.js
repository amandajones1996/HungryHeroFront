import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "../data";

const initialState = {
    restaurantData: null,
};

export const getRestaurantData = createAsyncThunk(
    'restaurant/getRestaurant',
    async (id) => {
        const restaurantObj = data.find(obj => obj.id === Number(id));
        return restaurantObj;
    }
)

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        loadRestaurant: (state, action) => {
            const { restaurantData } = action.payload;
            state.restaurantData = restaurantData;
        }
    },
    extraReducers: {
        [getRestaurantData.fulfilled]: (state, action) => {
            state.restaurantData = action.payload
        },

    }
});

export const { loadRestaurant } = restaurantSlice.actions;

export const selectRestaurant = (state, restaurantId) => state.restaurantData;

export default restaurantSlice.reducer;