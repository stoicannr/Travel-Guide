import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import locationReducer from "./locationSlice";
import myCurrentLocation from "./myCurrentLocationSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    locations: locationReducer,
    myCurrentLocation: myCurrentLocation
  },
});
