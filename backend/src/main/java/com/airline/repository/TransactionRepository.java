package com.airline.repository;

import com.airline.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByBooking_BookingIdOrderByTransactionDateDesc(Long bookingId);
    List<Transaction> findAllByOrderByTransactionDateDesc();
}