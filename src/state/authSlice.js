// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, clearToken } = authSlice.actions;

// Initialize auth state from localStorage
export const initializeAuth = () => (dispatch) => {
  const token = localStorage.getItem("accessToken");
  const userData = localStorage.getItem("userData");

  if (token) {
    dispatch(setToken(token));
  }

  if (userData) {
    try {
      const user = JSON.parse(userData);
      dispatch(setUser(user));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
};
export default authSlice.reducer;
