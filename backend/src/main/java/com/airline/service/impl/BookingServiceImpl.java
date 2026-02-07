package com.airline.service.impl;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import java.util.List;
import com.airline.repository.BookingRepository;
import com.airline.service.BookingService;
import com.airline.entity.Booking;
import com.airline.entity.BookingStatus;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public Booking createBooking(Booking booking) {
        // Generate PNR if not set
        if (booking.getPnr() == null || booking.getPnr().isEmpty()) {
            booking.setPnr("PNR-" + UUID.randomUUID().toString().substring(0,8).toUpperCase());
        }
        // Set default status if not set
        if (booking.getStatus() == null) {
            booking.setStatus(BookingStatus.CONFIRMED);
        }
        return bookingRepository.save(booking);
    }
    
    @Override
    public List<Booking> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        System.out.println("Service: Found " + bookings.size() + " bookings");
        for (Booking booking : bookings) {
            System.out.println("Service - Booking: " + booking.getPnr() + ", Flight: " + (booking.getFlight() != null ? booking.getFlight().getFlightNumber() : "NULL"));
        }
        return bookings;
    }
    
    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }
    
    @Override
    public Booking cancelBooking(Long id) {
        Booking booking = getBookingById(id);
        booking.setStatus(BookingStatus.CANCELLED);
        return bookingRepository.save(booking);
    }
    
    @Override
    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
    
    @Override
    public List<Booking> getBookingsByUserId(Long userId) {
        // This would need a custom repository method
        return bookingRepository.findAll(); // Placeholder
    }
}
