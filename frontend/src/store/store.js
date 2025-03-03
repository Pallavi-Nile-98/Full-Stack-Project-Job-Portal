import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
const store = configureStore({
    reducer: {
        jobs:jobReducer,
        auth: authReducer, 
        user:userReducer,

    },
});

export default store;
