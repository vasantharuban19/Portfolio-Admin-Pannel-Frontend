import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      state.message = null;
    },
    loginfailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileResetAfterUpdate(state, action) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.user;
    },
  },
});

export const login = (email, password) => async (dispacth) => {
  dispacth(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "https://portfolio-backend-2sbb.onrender.com/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispacth(userSlice.actions.loginSuccess(data.user));
    toast.success(data.message);
    dispacth(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispacth(userSlice.actions.loginfailed(error.response.data.message));
  }
};

export const getUser = () => async (dispacth) => {
  dispacth(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(
      "https://portfolio-backend-2sbb.onrender.com/api/v1/user/me",
      {
        withCredentials: true,
      }
    );

    dispacth(userSlice.actions.loadUserSuccess(data.user));
    dispacth(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispacth(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};

export const logout = () => async (dispacth) => {
  try {
    const { data } = await axios.get(
      "https://portfolio-backend-2sbb.onrender.com/api/v1/user/logout",
      { withCredentials: true }
    );
    dispacth(userSlice.actions.logoutSuccess(data.message));
    dispacth(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispacth(userSlice.actions.logoutFailed(error.response.data.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispacth) => {
    dispacth(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "https://portfolio-backend-2sbb.onrender.com/api/v1/user//update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispacth(userSlice.actions.updatePasswordSuccess(data.message));
      dispacth(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispacth(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };

export const updateProfile = (data) => async (dispacth) => {
  dispacth(userSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      "https://portfolio-backend-2sbb.onrender.com/api/v1/user/update/me",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispacth(userSlice.actions.updateProfileSuccess(response.data.message));
    dispacth(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispacth(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};

export const resetProfile = () => (dispacth) => {
  dispacth(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUsersErrors = () => (dispacth) => {
  dispacth(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
