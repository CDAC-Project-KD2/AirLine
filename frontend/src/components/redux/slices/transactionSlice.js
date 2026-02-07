import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔗 API base URL
const API_URL = "http://localhost:8080/api/transactions";

/* ===========================
   ASYNC THUNKS
=========================== */

// 📋 Get All Transactions
export const fetchAllTransactions = createAsyncThunk(
  "transactions/fetchAllTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load transactions"
      );
    }
  }
);

// 📋 Get Transaction by ID
export const fetchTransactionById = createAsyncThunk(
  "transactions/fetchTransactionById",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${transactionId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load transaction"
      );
    }
  }
);

/* ===========================
   INITIAL STATE
=========================== */

const initialState = {
  transactions: [],
  currentTransaction: null,
  loading: false,
  error: null,
};

/* ===========================
   SLICE
=========================== */

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransactionState: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ALL TRANSACTIONS ---------- */
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH TRANSACTION BY ID ---------- */
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ===========================
   EXPORTS
=========================== */

export const { clearTransactionState } = transactionSlice.actions;
export default transactionSlice.reducer;