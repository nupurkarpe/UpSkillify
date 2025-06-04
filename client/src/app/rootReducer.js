import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi.js";
import { feedbackApi } from "@/features/api/feedbackApi.js";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [purchaseApi.reducerPath]: purchaseApi.reducer,
  [courseProgressApi.reducerPath]: courseProgressApi.reducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
  auth: authReducer,
});

export default rootReducer;
