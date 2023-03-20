import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../Api";

export const loginRequest = createAsyncThunk("login", async (data) => {
  const result = await api
    .post("/user-login", data)
    .then((result) => {
      AsyncStorage.setItem("token", result.data.data.secret_token);
      return result.data.data.secret_token;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: false,
    token: "",
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      AsyncStorage.removeItem("token").then((value) => value);
    },
  },
  extraReducers: {
    [loginRequest.pending]: (state) => {
      state.loading = true;
    },
    [loginRequest.fulfilled]: (state, action) => {
      const succes = action.payload + "";
      if (succes.includes(422)) {
        state.token = "";
        state.loading = false;
        state.error = "неверный пароль или адрес электронной почты";
      } else {
        state.token = action.payload;
      }
    },
    [loginRequest.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
