import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const checkLiklyRequest = createAsyncThunk(
  "check/favorite",
  async ({ token, id }) => {
    try {
      const result = await api.post("/check-favorite-data", {
        secret_token: token,
        last_id: id,
      });
      return result;
    } catch (error) {
      return;
    }
  }
);
const checkLiklySlice = createSlice({
  name: "checkfavorite",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [checkLiklyRequest.pending]: (state) => {
      state.loading = true;
    },
    [checkLiklyRequest.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
    },
    [checkLiklyRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default checkLiklySlice.reducer;
