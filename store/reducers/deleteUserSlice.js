import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const deleteUserRequest = createAsyncThunk(
  "delete",
  async ({ token }) => {
    api
      .post("/delete-user-data", { secret_token: token })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.message;
      });
  }
);
const deletUserSlice = createSlice({
  name: "deletUser",
  initialState: {
    loading: false,
    error: false,
    data: "",
  },
  reducers: {},
  extraReducers: {
    [deleteUserRequest.pending]: (state) => {
      state.loading = true;
    },
    [deleteUserRequest.fulfilled]: (state, action) => {
      state.error = false;
    },
    [deleteUserRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default deletUserSlice.reducer;
