// src/features/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     user: null,
//     isAuthenticated: false,
//     };

//     const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//     login: (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//     },
//     logout: (state) => {
//         state.user = null;
//         state.isAuthenticated = false;
//         },
//     },
// });

// src/features/authSlice.js

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateUserOrders: (state, action) => {
            state.user.orders = action.payload;
        },
        setTotalOrders: (state, action) => {
            state.totalOrders = action.payload;
        },
    },
});

export const { login, logout, updateUserOrders, setTotalOrders } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
