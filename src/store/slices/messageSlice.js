import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
    message: null,
    messages: [],
  },
  reducers: {
    getAllMessagesRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.messages = [];
    },
    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.messages = state.messages;
    },
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetMessageSlice(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = state.messages;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const response = await axios.get(
      "https://portfolio-backend-2sbb.onrender.com/api/v1/message/getall",
      { withCredentials: true }
    );
    // console.log(response);
    dispatch(
      messageSlice.actions.getAllMessagesSuccess(response.data.messages)
    );
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const response = await axios.delete(
      `https://portfolio-backend-2sbb.onrender.com/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(response.data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(error.response.data.message)
    );
  }
};

export const clearAllMessageErrors = () => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
