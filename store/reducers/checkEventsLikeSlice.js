import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const checkEventsLikeRequest = createAsyncThunk(
  "check/chat",
  async ({ token, id }) => {
    try {
      const result = await api.post("/check-likes-event", {
        secret_token: token,
        event_id: id,
      });
      return result;
    } catch (error) {
    return error
    }
  }
);

const checkEventsLikeSlice = createSlice({
  name: "checkChat",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [checkEventsLikeRequest.pending]: (state) => {
      state.loading = true;
    },
    [checkEventsLikeRequest.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
    },
    [checkEventsLikeRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default checkEventsLikeSlice.reducer;
