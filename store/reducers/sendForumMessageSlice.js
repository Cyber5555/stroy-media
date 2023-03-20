import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const sendForumMessageRequest = createAsyncThunk(
  "send/forum/message",
  async (data) => {
    try {
      const result = await api.post("/forum-send-message", data);
      return result;
    } catch (error) {
      return error
    }
  }
);

const sendForumMessageSlice = createSlice({
  name: "send/forum/message",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [sendForumMessageRequest.pending]: (state) => {
      state.loading = true;
    },
    [sendForumMessageRequest.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
    },
    [sendForumMessageRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default sendForumMessageSlice.reducer;
