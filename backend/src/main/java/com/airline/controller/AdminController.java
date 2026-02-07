package com.airline.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal;
import com.airline.service.BookingService;
import com.airline.service.FlightService;
import com.airline.service.TransactionService;
import com.airline.entity.BookingStatus;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminController {

    private final BookingService bookingService;
    private final FlightService flightService;
    private final TransactionService transactionService;
    
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            
            // Get total flights
            long totalFlights = flightService.getAllFlights().size();
            
            // Get total bookings
            long totalBookings = bookingService.getAllBookings().size();
            
            // Get cancelled bookings
            long cancelledBookings = bookingService.getAllBookings().stream()
                    .mapToLong(booking -> booking.getStatus() == BookingStatus.CANCELLED ? 1 : 0)
                    .sum();
            
            // Calculate total revenue from transactions
            BigDecimal totalRevenue = transactionService.getAllTransactions().stream()
                    .map(transaction -> transaction.getAmount())
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            stats.put("totalFlights", totalFlights);
            stats.put("totalBookings", totalBookings);
            stats.put("cancelledBookings", cancelledBookings);
            stats.put("totalRevenue", totalRevenue);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
}