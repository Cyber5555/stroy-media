import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const checkChatExistRequest = createAsyncThunk(
  "check/chat",
  async ({ token, id }) => {
    try {
      const result = await api.post("/check-chat-exist", {
        secret_token: token,
        last_id: id,
      });
      return result;
    } catch (error) {
      return error
    }
  }
);

const checkChatExistSlice = createSlice({
  name: "checkChat",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [checkChatExistRequest.pending]: (state) => {
      state.loading = true;
    },
    [checkChatExistRequest.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
    },
    [checkChatExistRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default checkChatExistSlice.reducer;
