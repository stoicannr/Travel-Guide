import { createSlice } from "@reduxjs/toolkit";

export const locationsSlice = createSlice({
  name: "locations",
  initialState: { locations: null },
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
  },
});

export const { setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
