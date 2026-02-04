package com.airline.service;

import com.airline.entity.Booking;
import java.util.List;

public interface BookingService {
    Booking createBooking(Booking booking);
    List<Booking> getAllBookings();
    Booking getBookingById(Long id);
    Booking cancelBooking(Long id);
    Booking updateBooking(Booking booking);
    List<Booking> getBookingsByUserId(Long userId);
}
