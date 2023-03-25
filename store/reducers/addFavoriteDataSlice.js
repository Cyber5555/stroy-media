import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const addFavoriteRequest = createAsyncThunk(
  "addFavorite",
  async ({ token, id }) => {
    await api
      .post("/add-favorite-data", { secret_token: token, company_id: id })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
);

const addFavoriterSlice = createSlice({
  name: "addFavorite",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [addFavoriteRequest.pending]: (state) => {
      state.loading = true;
    },
    [addFavoriteRequest.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
    },
    [addFavoriteRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default addFavoriterSlice.reducer;
