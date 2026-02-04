package com.airline.service;

import com.airline.entity.Transaction;
import com.airline.entity.Booking;
import com.airline.entity.TransactionType;
import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Booking booking, BigDecimal amount, TransactionType type, String paymentMethod, String description);
    List<Transaction> getAllTransactions();
    List<Transaction> getTransactionsByBookingId(Long bookingId);
    Transaction getTransactionById(Long id);
}