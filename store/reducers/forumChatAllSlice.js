import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";
import axios from "axios";

export const allChatForumRequest = createAsyncThunk(
  "all/forum",
  async ({ token }) => {
    try {
      const result = await api.post("/auth-chat-forum-all", {
        secret_token: token,
      });

      return result;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let error = err;
        if (!error.response) {
          throw err;
        }
        return rejectWithValue(error.response.data);
      }
      throw err;
    }
  }
);

const allChatForumSlice = createSlice({
  name: "forum",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [allChatForumRequest.pending]: (state) => {
      state.loading = true;
    },
    [allChatForumRequest.fulfilled]: (state, action) => {
      state.data = action.payload.data.data.contacts;
      state.error = false;
      state.loading = false;
    },
    [allChatForumRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default allChatForumSlice.reducer;
