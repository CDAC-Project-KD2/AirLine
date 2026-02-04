
package com.airline.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airline.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByFlightFlightId(Long flightId);
}
