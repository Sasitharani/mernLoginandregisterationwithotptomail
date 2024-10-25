// src/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password:'',
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
