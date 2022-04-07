import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    singedIn: null, 
  },

  reducers: {
    login: (state, action) => {
      return {
        ...state,
        singedIn: true,
        user: action.payload,
      };
    },
    logout: (state) => {
      return {
        ...state,
        singedIn: false,
        user: null,
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        singedIn: !!action.payload,
        user: action.payload,
      };
    },
  },
});

export const { login, logout,setUser } = userSlice.actions;

export default userSlice.reducer;
