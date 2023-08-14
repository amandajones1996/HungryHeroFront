import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurantData: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        loadRestaurant: (state, action) => {
            const { restaurantId, restaurantData } = action.payload;
            state[restaurantId] = restaurantData;
        }
    }
});

export const { loadRestaurant } = restaurantSlice.actions;

export const selectRestaurant = (state, restaurantId) => state.restaurant[restaurantId];

export default restaurantSlice.reducer;