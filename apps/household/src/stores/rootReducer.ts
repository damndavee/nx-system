import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.reducer";
import { authApi } from "./auth/auth.api";

const rootReducer = combineReducers({
    authReducer,
    [authApi.reducerPath]: authApi.reducer,     
});

export default rootReducer;