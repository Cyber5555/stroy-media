import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const editAplicationsRequest = createAsyncThunk(
  "edit/aplication",
  async (data) => {
    try {
      const result = await api.post("/cat-serv-edit", data);
      return result;
    } catch (error) {
     return error
    }
  }
);
const editAplicationsRequestSlice = createSlice({
  name: "edit/aplication",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [editAplicationsRequest.pending]: (state) => {
      state.loading = true;
    },
    [editAplicationsRequest.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.loading = false;
    },
    [editAplicationsRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default editAplicationsRequestSlice.reducer;
