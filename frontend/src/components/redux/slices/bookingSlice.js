import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔗 API base URL
const API_URL = "http://localhost:8080/api/bookings";

/* ===========================
   ASYNC THUNKS
=========================== */

// 🎫 Create Booking (Passenger)
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      console.log('Sending booking data to API:', bookingData);
      const response = await axios.post(API_URL, bookingData);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data);
      console.error('Error status:', error.response?.status);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Booking failed";
      return rejectWithValue(errorMessage);
    }
  }
);

// 📋 Get My Bookings (Passenger)
export const fetchMyBookings = createAsyncThunk(
  "bookings/fetchMyBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/my`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load bookings"
      );
    }
  }
);

// 🧑‍💼 Get All Bookings (Admin)
export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load bookings"
      );
    }
  }
);

// ❌ Cancel Booking (Passenger / Staff)
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/${bookingId}/cancel`);
      return bookingId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Cancellation failed"
      );
    }
  }
);

/* ===========================
   INITIAL STATE
=========================== */

const initialState = {
  myBookings: [],
  allBookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  success: false,
};

/* ===========================
   SLICE
=========================== */

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearBookingState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- CREATE BOOKING ---------- */
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentBooking = action.payload;
        state.myBookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Booking creation failed:', action.payload);
      })

      /* ---------- FETCH MY BOOKINGS ---------- */
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.myBookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ALL BOOKINGS ---------- */
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.allBookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CANCEL BOOKING ---------- */
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.myBookings = state.myBookings.map((booking) =>
          booking.bookingId === action.payload
            ? { ...booking, status: "CANCELLED" }
            : booking
        );

        state.allBookings = state.allBookings.map((booking) =>
          booking.bookingId === action.payload
            ? { ...booking, status: "CANCELLED" }
            : booking
        );
      });
  },
});

/* ===========================
   EXPORTS
=========================== */

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
