import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const searchMembersRequest = createAsyncThunk(
  "search/members",
  async (data) => {
    try {
      const result = await api.post("/chat-search-contact", data);
      return result;
    } catch (error) {
      return error
    }
  }
);

const searchMembersSlice = createSlice({
  name: "search/members",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [searchMembersRequest.pending]: (state) => {
      state.loading = true;
    },
    [searchMembersRequest.fulfilled]: (state, action) => {
      state.data = action.payload.data.data.users;
      state.error = false;
    },
    [searchMembersRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default searchMembersSlice.reducer;
