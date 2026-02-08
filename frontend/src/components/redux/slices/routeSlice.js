import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/routes";

export const fetchRoutes = createAsyncThunk(
  "routes/fetchRoutes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load routes"
      );
    }
  }
);

export const deleteRoute = createAsyncThunk(
  "routes/deleteRoute",
  async (routeId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${routeId}`);
      return routeId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete route"
      );
    }
  }
);

const initialState = {
  routes: [],
  loading: false,
  error: null,
};

const routeSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    clearRouteError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.routes = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRoute.fulfilled, (state, action) => {
        state.routes = state.routes.filter(
          (route) => route.routeId !== action.payload
        );
      });
  },
});

export const { clearRouteError } = routeSlice.actions;
export default routeSlice.reducer;