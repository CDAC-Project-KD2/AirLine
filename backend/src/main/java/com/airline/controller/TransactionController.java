package com.airline.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.List;
import com.airline.service.TransactionService;
import com.airline.service.UserService;
import com.airline.entity.Transaction;
import com.airline.entity.User;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;
    
    @GetMapping
    public ResponseEntity<?> getAllTransactions(HttpServletRequest request) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(401).body(java.util.Map.of("error", "Unauthorized"));
        }
        
        List<User> users = userService.getAllUsers();
        User currentUser = users.stream()
            .filter(u -> u.getEmail().equals(email))
            .findFirst()
            .orElse(null);
            
        if (currentUser == null) {
            return ResponseEntity.ok(java.util.Collections.emptyList());
        }
        
        List<Transaction> allTransactions = transactionService.getAllTransactions();
        List<Transaction> userTransactions = allTransactions.stream()
                .filter(transaction -> transaction.getBooking() != null &&
                        transaction.getBooking().getPassenger() != null &&
                        transaction.getBooking().getPassenger().getUserId().equals(currentUser.getUserId()))
                .collect(java.util.stream.Collectors.toList());
        
        return ResponseEntity.ok(userTransactions);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Transaction transaction = transactionService.getTransactionById(id);
        return ResponseEntity.ok(transaction);
    }
    
    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<List<Transaction>> getTransactionsByBookingId(@PathVariable Long bookingId) {
        List<Transaction> transactions = transactionService.getTransactionsByBookingId(bookingId);
        return ResponseEntity.ok(transactions);
    }
}