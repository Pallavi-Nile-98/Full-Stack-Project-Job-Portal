import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import jobReducer from "./slices/jobSlice";
const store = configureStore({
    reducer: {
        jobs:jobReducer,
        auth: authReducer, 
    },
});

export default store;
