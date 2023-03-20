import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const personalMessageRequest = createAsyncThunk(
  "personalMessage",
  async ({ token, name }) => {
    api
      .post("/notification-control/personal-message-email", {
        secret_token: token,
        personal_message_email: name,
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
       return error
      });
  }
);

const personalMessageSlice = createSlice({
  name: "personalMessage",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [personalMessageRequest.pending]: (state) => {
      state.loading = true;
    },
    [personalMessageRequest.fulfilled]: (state) => {
      state.error = false;
    },
    [personalMessageRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default personalMessageSlice.reducer;
