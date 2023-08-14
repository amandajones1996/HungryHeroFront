import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import restaurantReducer from "./features/restaurantSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
