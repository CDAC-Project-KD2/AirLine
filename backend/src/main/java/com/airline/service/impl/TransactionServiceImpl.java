package com.airline.service.impl;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import java.util.List;
import java.math.BigDecimal;
import com.airline.repository.TransactionRepository;
import com.airline.service.TransactionService;
import com.airline.entity.Transaction;
import com.airline.entity.Booking;
import com.airline.entity.TransactionType;
import com.airline.entity.TransactionStatus;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction(Booking booking, BigDecimal amount, TransactionType type, String paymentMethod, String description) {
        Transaction transaction = Transaction.builder()
                .transactionNumber("TXN-" + UUID.randomUUID().toString().substring(0,8).toUpperCase())
                .booking(booking)
                .amount(amount)
                .type(type)
                .status(TransactionStatus.COMPLETED)
                .paymentMethod(paymentMethod)
                .description(description)
                .build();
        
        return transactionRepository.save(transaction);
    }
    
    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByTransactionDateDesc();
    }
    
    @Override
    public List<Transaction> getTransactionsByBookingId(Long bookingId) {
        return transactionRepository.findByBooking_BookingIdOrderByTransactionDateDesc(bookingId);
    }
    
    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found with id: " + id));
    }
}