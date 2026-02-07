import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔗 API base URL
const API_URL = "http://localhost:8080/api/staff";

/* ===========================
   ASYNC THUNKS
=========================== */

// 👨‍✈️ Fetch All Staff (Admin)
export const fetchStaff = createAsyncThunk(
  "staff/fetchStaff",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch staff"
      );
    }
  }
);

// ➕ Add Staff (Admin)
export const addStaff = createAsyncThunk(
  "staff/addStaff",
  async (staffData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(API_URL, staffData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add staff"
      );
    }
  }
);

// ✏️ Update Staff (Admin)
export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ id, staffData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(`${API_URL}/${id}`, staffData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update staff"
      );
    }
  }
);

// ❌ Delete Staff (Admin)
export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (staffId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      await axios.delete(`${API_URL}/${staffId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return staffId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete staff"
      );
    }
  }
);

// 📋 Fetch Assigned Flights (Staff)
export const fetchAssignedFlights = createAsyncThunk(
  "staff/fetchAssignedFlights",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(`${API_URL}/assigned-flights`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load assigned flights"
      );
    }
  }
);

// 🧳 Fetch Passenger List (Staff)
export const fetchPassengerList = createAsyncThunk(
  "staff/fetchPassengerList",
  async (flightId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(
        `${API_URL}/flights/${flightId}/passengers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load passengers"
      );
    }
  }
);

// ✅ Check-in Passenger (Staff)
export const checkInPassenger = createAsyncThunk(
  "staff/checkInPassenger",
  async ({ bookingId }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(
        `${API_URL}/check-in/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Check-in failed"
      );
    }
  }
);

/* ===========================
   INITIAL STATE
=========================== */

const initialState = {
  staffList: [],
  assignedFlights: [],
  passengers: [],
  loading: false,
  error: null,
};

/* ===========================
   SLICE
=========================== */

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaffError: (state) => {
      state.error = null;
    },
    resetPassengers: (state) => {
      state.passengers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH STAFF ---------- */
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- ADD STAFF ---------- */
      .addCase(addStaff.fulfilled, (state, action) => {
        state.staffList.push(action.payload);
      })

      /* ---------- UPDATE STAFF ---------- */
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.staffList = state.staffList.map((staff) =>
          staff.id === action.payload.id ? action.payload : staff
        );
      })

      /* ---------- DELETE STAFF ---------- */
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staffList = state.staffList.filter(
          (staff) => staff.id !== action.payload
        );
      })

      /* ---------- ASSIGNED FLIGHTS ---------- */
      .addCase(fetchAssignedFlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignedFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.assignedFlights = action.payload;
      })
      .addCase(fetchAssignedFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- PASSENGER LIST ---------- */
      .addCase(fetchPassengerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPassengerList.fulfilled, (state, action) => {
        state.loading = false;
        state.passengers = action.payload;
      })
      .addCase(fetchPassengerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CHECK-IN PASSENGER ---------- */
      .addCase(checkInPassenger.fulfilled, (state, action) => {
        state.passengers = state.passengers.map((p) =>
          p.bookingId === action.payload.bookingId
            ? action.payload
            : p
        );
      });
  },
});

/* ===========================
   EXPORTS
=========================== */

export const {
  clearStaffError,
  resetPassengers,
} = staffSlice.actions;

export default staffSlice.reducer;
