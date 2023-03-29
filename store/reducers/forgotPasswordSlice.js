import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const forgotPasswordRequest = createAsyncThunk(
  "forgotPassword",
  async ({ email }) => {
    console.log(email, "email");
    await api
      .post("/user-lost-start", { email: email })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: false,
    message: "",
  },
  reducers: {
    [forgotPasswordRequest.pending]: (state) => {
      state.loading = true;
    },
    [forgotPasswordRequest.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.error = false;
      console.log(action);
    },
    [forgotPasswordRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default forgotPasswordSlice.reducer;
