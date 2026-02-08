import { configureStore } from "@reduxjs/toolkit";

// Slices
import authReducer from "./slices/authSlice";
import flightReducer from "./slices/flightSlice";
import bookingReducer from "./slices/bookingSlice";
import transactionReducer from "./slices/transactionSlice";
import adminReducer from "./slices/adminSlice";
import staffReducer from "./slices/staffSlice";
import paymentReducer from "./slices/paymentSlice";
import routeReducer from "./slices/routeSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    flights: flightReducer,
    bookings: bookingReducer,
    transactions: transactionReducer,
    admin: adminReducer,
    staff: staffReducer,
    payments: paymentReducer,
    routes: routeReducer,
    users: userReducer,
  },
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
