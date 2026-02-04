package com.airline.service.impl;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Arrays;
import java.time.LocalDate;
import com.airline.repository.FlightRepository;
import com.airline.repository.BookingRepository;
import com.airline.service.FlightService;
import com.airline.entity.Flight;
import com.airline.entity.FlightStatus;

@Service
@RequiredArgsConstructor
public class FlightServiceImpl implements FlightService {

    private final FlightRepository flightRepository;
    private final BookingRepository bookingRepository;

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }
    
    @Override
    public List<Flight> searchFlights(String from, String to, LocalDate departureDate, LocalDate returnDate, Integer passengers) {
        // For now, return all flights. You can implement custom search logic here
        return flightRepository.findAll();
    }
    
    @Override
    public Flight getFlightById(Long id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found with id: " + id));
    }
    
    @Override
    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }
    
    @Override
    public Flight updateFlight(Long id, Flight flight) {
        Flight existingFlight = getFlightById(id);
        
        existingFlight.setFlightNumber(flight.getFlightNumber());
        existingFlight.setRoute(flight.getRoute());
        existingFlight.setAircraft(flight.getAircraft());
        existingFlight.setDepartureTime(flight.getDepartureTime());
        existingFlight.setArrivalTime(flight.getArrivalTime());
        existingFlight.setBasePrice(flight.getBasePrice());
        existingFlight.setStatus(flight.getStatus());
        existingFlight.setAvailableSeats(flight.getAvailableSeats());
        existingFlight.setTotalSeats(flight.getTotalSeats());
        
        return flightRepository.save(existingFlight);
    }
    
    @Override
    public void deleteFlight(Long id) {
        if (bookingRepository.existsByFlightFlightId(id)) {
            throw new RuntimeException("Cannot delete flight with existing bookings. Please cancel all bookings first.");
        }
        Flight flight = getFlightById(id);
        flightRepository.delete(flight);
    }
    
    @Override
    public Flight updateFlightStatus(Long id, String status) {
        Flight flight = getFlightById(id);
        flight.setStatus(FlightStatus.valueOf(status.toUpperCase()));
        return flightRepository.save(flight);
    }
    
    @Override
    public List<String> getPopularDestinations() {
        // Return some popular destinations for now
        return Arrays.asList(
            "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
            "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Goa"
        );
    }
}
