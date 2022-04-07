import { createSlice } from "@reduxjs/toolkit";

export const myCurrentLocationSlice = createSlice({
    name: "myLocation",
    initialState: { myLocation: null },
    reducers: {
        setMyCurrentLocation: (state, action) => {
            state.myLocation = action.payload;
        },
    },
});

export const { setMyCurrentLocation } = myCurrentLocationSlice.actions;

export default myCurrentLocationSlice.reducer;
