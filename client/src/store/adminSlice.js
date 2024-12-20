import {createSlice} from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLoggedIn: false,
        emailAddress: "",
        session: ""
    },
    reducers: {
        login: (state, action) => {
            state.session = action.payload.session;
            state.emailAddress = action.payload.emailAddress;
            state.isLoggedIn = true;
        },
        logout: (state, action) => {
            state.session = null;
            state.emailAddress = null;
            state.isLoggedIn = false;
        },
        getSession: (state, action) => {
            return state.session;
        },
        getLoginStatus: (state, action) => {
            return state.isLoggedIn
        },
        getEmailAddress: (state, action) => {
            return state.emailAddress;
        }
    }
})

export const {login, logout, getSession, getLoginStatus, getEmailAddress} = adminSlice.actions;

export default adminSlice.reducer;