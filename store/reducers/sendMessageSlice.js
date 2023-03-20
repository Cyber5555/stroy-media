import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const sendMessageRequest = createAsyncThunk(
  "send/message",
  async (data) => {
    try {
      const result = await api.post("/chat-send-message", data);
      return result;
    } catch (error) {
      return error
    }
  }
);

const sendMessageSlice = createSlice({
  name: "send/message",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [sendMessageRequest.pending]: (state) => {
      state.loading = true;
    },
    [sendMessageRequest.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
    },
    [sendMessageRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default sendMessageSlice.reducer;
