import { createSlice } from "@reduxjs/toolkit";

export const springSlice = createSlice({
  name: "spring",
  initialState: {
    governorate: [],
    banks: [],
    creditType: [],
    admins: [],
    users: [],
    managers: [],
    countAdmin: 0,
    countUser: 0,
    countManager: 0,
    countAllUser: 0,
    countBank: 0,
  },
  reducers: {
    setGovernorate: (state, action) => {
      state.governorate = action.payload;
    },
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
    setCreditType: (state, action) => {
      state.creditType = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setManagers: (state, action) => {
      state.managers = action.payload;
    },
    setCountAdmin: (state, action) => {
      state.countAdmin = action.payload;
    },
    setCountUser: (state, action) => {
      state.countUser = action.payload;
    },
    setCountManager: (state, action) => {
      state.countManager = action.payload;
    },
    setCountBank: (state, action) => {
      state.countBank = action.payload;
    },
  },
});

export const { setGovernorate } = springSlice.actions;
export default springSlice.reducer;
