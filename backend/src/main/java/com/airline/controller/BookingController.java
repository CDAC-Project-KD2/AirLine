package com.airline.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import com.airline.service.BookingService;
import com.airline.service.TransactionService;
import com.airline.service.UserService;
import com.airline.repository.FlightRepository;
import com.airline.entity.Booking;
import com.airline.entity.Flight;
import com.airline.entity.User;
import com.airline.entity.BookingStatus;
import com.airline.entity.TransactionType;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class BookingController {

    private final BookingService bookingService;
    private final TransactionService transactionService;
    private final FlightRepository flightRepository;
    private final UserService userService;

    @PostMapping
    public synchronized ResponseEntity<?> createBooking(@RequestBody Map<String, Object> bookingRequest, HttpServletRequest request) {
        try {
            String email = (String) request.getAttribute("userEmail");
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Please login to make a booking"));
            }
            
            List<User> users = userService.getAllUsers();
            User currentUser = users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElse(null);
                
            if (currentUser == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }
            
            Long flightId = Long.valueOf(bookingRequest.get("flightId").toString());
            String seatNumber = (String) bookingRequest.get("seatNumber");
            String paymentMethod = (String) bookingRequest.getOrDefault("paymentMethod", "Credit Card");
            
            Flight flight = flightRepository.findById(flightId).orElse(null);
            
            if (flight == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Flight not found"));
            }
            
            if (seatNumber == null || seatNumber.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Seat number is required"));
            }
            
            List<Booking> existingBookings = bookingService.getAllBookings();
            boolean seatTaken = existingBookings.stream()
                    .anyMatch(booking -> booking.getFlight() != null &&
                            booking.getFlight().getFlightId().equals(flightId) &&
                            booking.getStatus() == BookingStatus.CONFIRMED &&
                            seatNumber.equals(booking.getSeatNumber()));
            
            if (seatTaken) {
                return ResponseEntity.badRequest().body(Map.of("error", "Seat " + seatNumber + " is already booked"));
            }
            
            Booking booking = Booking.builder()
                    .passenger(currentUser)
                    .flight(flight)
                    .seatNumber(seatNumber)
                    .totalAmount(BigDecimal.valueOf(5000.00))
                    .status(BookingStatus.CONFIRMED)
                    .numberOfPassengers(1)
                    .build();
            
            Booking createdBooking = bookingService.createBooking(booking);
            
            transactionService.createTransaction(
                createdBooking, 
                flight.getBasePrice(),
                TransactionType.BOOKING_PAYMENT, 
                paymentMethod, 
                "Flight booking payment for " + flight.getFlightNumber()
            );
            
            return ResponseEntity.ok(createdBooking);
            
        } catch (Exception e) {
            e.printStackTrace();
            if (e.getMessage() != null && e.getMessage().contains("Duplicate entry")) {
                return ResponseEntity.badRequest().body(Map.of("error", "Seat is already booked by another user"));
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Booking failed"));
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings(HttpServletRequest request) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        List<User> users = userService.getAllUsers();
        User currentUser = users.stream()
            .filter(u -> u.getEmail().equals(email))
            .findFirst()
            .orElse(null);
            
        if (currentUser == null) {
            return ResponseEntity.ok(java.util.Collections.emptyList());
        }
        
        List<Booking> allBookings = bookingService.getAllBookings();
        List<Booking> userBookings = allBookings.stream()
                .filter(booking -> booking.getPassenger() != null && 
                        booking.getPassenger().getUserId().equals(currentUser.getUserId()))
                .collect(java.util.stream.Collectors.toList());
        
        return ResponseEntity.ok(userBookings);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        return ResponseEntity.ok(booking);
    }
    
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        Booking cancelledBooking = bookingService.cancelBooking(id);
        return ResponseEntity.ok(cancelledBooking);
    }
    
    @GetMapping("/booked-seats/{flightId}")
    public ResponseEntity<List<String>> getBookedSeats(@PathVariable Long flightId) {
        System.out.println("Getting booked seats for flight ID: " + flightId);
        List<Booking> bookings = bookingService.getAllBookings();
        System.out.println("Total bookings: " + bookings.size());
        
        List<String> bookedSeats = bookings.stream()
                .filter(booking -> {
                    boolean hasFlightId = booking.getFlight() != null && 
                            booking.getFlight().getFlightId().equals(flightId);
                    boolean isConfirmed = booking.getStatus() == BookingStatus.CONFIRMED;
                    boolean hasSeatNumber = booking.getSeatNumber() != null;
                    
                    System.out.println("Booking " + booking.getBookingId() + ": flightMatch=" + hasFlightId + 
                                     ", confirmed=" + isConfirmed + ", hasSeat=" + hasSeatNumber + 
                                     ", seat=" + booking.getSeatNumber());
                    
                    return hasFlightId && isConfirmed && hasSeatNumber;
                })
                .map(Booking::getSeatNumber)
                .collect(java.util.stream.Collectors.toList());
        
        System.out.println("Returning booked seats: " + bookedSeats);
        return ResponseEntity.ok(bookedSeats);
    }
    
    @GetMapping("/flight/{flightId}")
    public ResponseEntity<List<Booking>> getBookingsByFlight(@PathVariable Long flightId) {
        List<Booking> bookings = bookingService.getAllBookings();
        List<Booking> flightBookings = bookings.stream()
                .filter(booking -> booking.getFlight() != null && 
                        booking.getFlight().getFlightId().equals(flightId) &&
                        booking.getStatus() == BookingStatus.CONFIRMED)
                .collect(java.util.stream.Collectors.toList());
        
        return ResponseEntity.ok(flightBookings);
    }
    
    @PatchMapping("/{id}/checkin")
    public ResponseEntity<Booking> checkInPassenger(@PathVariable Long id) {
        try {
            Booking booking = bookingService.getBookingById(id);
            if (booking == null) {
                return ResponseEntity.notFound().build();
            }
            
            booking.setCheckedIn(true);
            Booking updatedBooking = bookingService.updateBooking(booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
