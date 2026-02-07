import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔗 API base URL
const API_URL = "http://localhost:8080/api/payments";

/* ===========================
   ASYNC THUNKS
=========================== */

// 💳 Initiate Payment (Passenger)
export const initiatePayment = createAsyncThunk(
  "payments/initiatePayment",
  async (paymentData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(`${API_URL}/initiate`, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data; // { paymentId, status, amount }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment initiation failed"
      );
    }
  }
);

// ✅ Verify Payment (after gateway callback)
export const verifyPayment = createAsyncThunk(
  "payments/verifyPayment",
  async (verificationData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        `${API_URL}/verify`,
        verificationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data; // { paymentId, status }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

// 📜 Fetch Payment History (Passenger / Admin)
export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payments"
      );
    }
  }
);

// 🔁 Refund Payment (Admin)
export const refundPayment = createAsyncThunk(
  "payments/refundPayment",
  async (paymentId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        `${API_URL}/${paymentId}/refund`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data; // updated payment
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Refund failed"
      );
    }
  }
);

/* ===========================
   INITIAL STATE
=========================== */

const initialState = {
  payments: [],
  currentPayment: null,
  loading: false,
  error: null,
  success: false,
};

/* ===========================
   SLICE
=========================== */

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.error = null;
      state.success = false;
    },
    resetCurrentPayment: (state) => {
      state.currentPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- INITIATE PAYMENT ---------- */
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- VERIFY PAYMENT ---------- */
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentPayment = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH PAYMENTS ---------- */
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- REFUND PAYMENT ---------- */
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.payments = state.payments.map((payment) =>
          payment.id === action.payload.id ? action.payload : payment
        );
      });
  },
});

/* ===========================
   EXPORTS
=========================== */

export const {
  clearPaymentState,
  resetCurrentPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
