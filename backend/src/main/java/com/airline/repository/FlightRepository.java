
package com.airline.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.airline.entity.Flight;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}
