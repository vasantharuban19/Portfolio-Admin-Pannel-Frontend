import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice.js";
import messageReducer from "./slices/messageSlice.js";
import timelineReducer from "./slices/timelineSlice.js";
import skillReducer from "./slices/skillSlice.js";
import applicationReducer from "./slices/applicationSlice.js";
import projectReducer from "./slices/projectSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messageReducer,
    timeline: timelineReducer,
    skill: skillReducer,
    softwareApplications: applicationReducer,
    project: projectReducer,
  },
});
