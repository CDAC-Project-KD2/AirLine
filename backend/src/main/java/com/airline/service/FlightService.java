package com.airline.service;

import com.airline.entity.Flight;
import java.util.List;
import java.time.LocalDate;

public interface FlightService {
    List<Flight> getAllFlights();
    List<Flight> searchFlights(String from, String to, LocalDate departureDate, LocalDate returnDate, Integer passengers);
    Flight getFlightById(Long id);
    Flight createFlight(Flight flight);
    Flight updateFlight(Long id, Flight flight);
    void deleteFlight(Long id);
    Flight updateFlightStatus(Long id, String status);
    List<String> getPopularDestinations();
}
