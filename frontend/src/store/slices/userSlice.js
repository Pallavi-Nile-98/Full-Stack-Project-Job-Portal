import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null,
        message: null,
    },
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        registerFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload.error; // Ensure error is an object with key 'error'
            state.message = null;
        },

        loginRequest(state) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
            state.message = action.payload.message;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload.error; // Ensure error is an object with key 'error'
            state.message = null;
        },
        clearAllErrors(state) {
            state.error = null;
        },
    },
});

export const register = (data) => async (dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/user/register",
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(userSlice.actions.registerSuccess(response.data));
    } catch (error) {
        dispatch(
            userSlice.actions.registerFailed({ error: error.response?.data?.message || "Registration failed" })
        );
    }
};

export const login = (data)=>async(dispatch)=>{
    dispatch(userSlice.actions.loginRequest());
    try{
        const response = await axios.post("http://localhost:4000/api/v1/user/login",data,{
            withCredentials:true,
            headers:{"content-Type": "application/json"}
        })
        dispatch(userSlice.actions.loginSuccess(response.data));
        dispatch(userSlice.actions.clearAllErrors());

    }catch(error){
        dispatch(userSlice.actions.loginFailed(error.response.data.message));

    }
};



export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
