import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔗 API base URL
const API_URL = "http://localhost:8080/api/flights";

/* ===========================
   ASYNC THUNKS
=========================== */

// ✈️ Fetch All Flights (Public / Admin / Staff)
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch flights"
      );
    }
  }
);

// 🔍 Search Flights (Passenger)
export const searchFlights = createAsyncThunk(
  "flights/searchFlights",
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Flight search failed"
      );
    }
  }
);

// ➕ Add Flight (Admin)
export const addFlight = createAsyncThunk(
  "flights/addFlight",
  async (flightData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, flightData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add flight"
      );
    }
  }
);

// ✏️ Update Flight (Admin / Staff)
export const updateFlight = createAsyncThunk(
  "flights/updateFlight",
  async ({ id, flightData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, flightData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update flight"
      );
    }
  }
);

// ❌ Delete Flight (Admin)
export const deleteFlight = createAsyncThunk(
  "flights/deleteFlight",
  async (flightId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${flightId}`);
      return flightId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete flight"
      );
    }
  }
);

// ⏱ Update Flight Status (Staff)
export const updateFlightStatus = createAsyncThunk(
  "flights/updateFlightStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}/status`,
        status,
        {
          headers: { 'Content-Type': 'text/plain' },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update flight status"
      );
    }
  }
);

/* ===========================
   INITIAL STATE
=========================== */

const initialState = {
  flights: [],
  searchedFlights: [],
  selectedFlight: null,
  loading: false,
  error: null,
};

/* ===========================
   SLICE
=========================== */

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    clearFlightError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH FLIGHTS ---------- */
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- SEARCH FLIGHTS ---------- */
      .addCase(searchFlights.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedFlights = action.payload;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- ADD FLIGHT ---------- */
      .addCase(addFlight.fulfilled, (state, action) => {
        state.flights.push(action.payload);
      })

      /* ---------- UPDATE FLIGHT ---------- */
      .addCase(updateFlight.fulfilled, (state, action) => {
        state.flights = state.flights.map((flight) =>
          flight.flightId === action.payload.flightId ? action.payload : flight
        );
      })

      /* ---------- DELETE FLIGHT ---------- */
      .addCase(deleteFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter(
          (flight) => flight.flightId !== action.payload
        );
      })

      /* ---------- UPDATE FLIGHT STATUS ---------- */
      .addCase(updateFlightStatus.fulfilled, (state, action) => {
        state.flights = state.flights.map((flight) =>
          flight.id === action.payload.id ? action.payload : flight
        );
      });
  },
});

/* ===========================
   EXPORTS
=========================== */

export const {
  setSelectedFlight,
  clearFlightError,
} = flightSlice.actions;

export default flightSlice.reducer;
