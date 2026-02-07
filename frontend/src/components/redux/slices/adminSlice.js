import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔗 API base URL
const API_URL = "http://localhost:8080/api/admin";

/* ===========================
   ASYNC THUNKS
=========================== */

// 📊 Get Dashboard Statistics
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load dashboard stats"
      );
    }
  }
);

// ✈️ Delete Flight
export const deleteFlight = createAsyncThunk(
  "admin/deleteFlight",
  async (flightId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8080/api/flights/${flightId}`);
      return flightId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete flight"
      );
    }
  }
);

/* ===========================
   INITIAL STATE
=========================== */

const initialState = {
  dashboardStats: {
    totalFlights: 0,
    totalBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
  },
  loading: false,
  error: null,
};

/* ===========================
   SLICE
=========================== */

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH DASHBOARD STATS ---------- */
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE FLIGHT ---------- */
      .addCase(deleteFlight.fulfilled, (state, action) => {
        // Flight deleted successfully - will be handled by flight slice
      })
      .addCase(deleteFlight.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

/* ===========================
   EXPORTS
=========================== */

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;