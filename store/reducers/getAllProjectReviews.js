import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api";

export const getProjectReviewsRequest = createAsyncThunk(
  "get/reviews",
  async ({ token, id }) => {
    try {
      const result = await api.post("/get-project-reviews", {
        secret_token: token,
        project_id: id,
        service_id: "reviews2",
      });
      return result;
    } catch (error) {
    return error
    }
  }
);

const getAllProjectReviewsSlice = createSlice({
  name: "projectReviews",
  initialState: {
    loading: false,
    error: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getProjectReviewsRequest.pending]: (state) => {
      state.loading = true;
    },
    [getProjectReviewsRequest.fulfilled]: (state, action) => {
      state.data = action.payload.data.data;
      state.error = false;
    },
    [getProjectReviewsRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export default getAllProjectReviewsSlice.reducer;
