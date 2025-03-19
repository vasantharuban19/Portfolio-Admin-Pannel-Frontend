import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "softwareApplications",
  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllApplicationsRequest(state, action) {
      state.softwareApplications = [];
      state.error = null;
      state.loading = true;
    },
    getAllApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllApplicationsFailed(state, action) {
      state.softwareApplications = state.softwareApplications;
      state.error = action.payload;
      state.loading = false;
    },
    addNewApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetApplicationSlice(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
    },
  },
});

export const getAllApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.getAllApplicationsRequest());
  try {
    const response = await axios.get(
      "https://portfolio-backend-rmjr.onrender.com/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.getAllApplicationsSuccess(
        response.data.softwareApplications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.getAllApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const addNewApplication = (data) => async (dispatch) => {
  dispatch(applicationSlice.actions.addNewApplicationsRequest());
  try {
    const response = await axios.post(
      "https://portfolio-backend-rmjr.onrender.com/api/v1/softwareapplication/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    // console.log(response)
    dispatch(
      applicationSlice.actions.addNewApplicationsSuccess(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.addNewApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteApplicationsRequest());
  try {
    const response = await axios.delete(
      `https://portfolio-backend-rmjr.onrender.com/api/v1/softwareapplication/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.deleteApplicationsSuccess(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.deleteApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
