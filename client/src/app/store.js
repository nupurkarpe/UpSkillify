import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "@/features/api/authApi.js";
import reducer from "@/features/authSlice.js";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi.js";
import { feedbackApi } from "@/features/api/feedbackApi.js";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware,
      feedbackApi.middleware
    ),
});

const initailizeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initailizeApp();
