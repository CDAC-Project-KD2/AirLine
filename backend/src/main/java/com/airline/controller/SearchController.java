package com.airline.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.time.LocalDate;
import com.airline.service.FlightService;
import com.airline.entity.Flight;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class SearchController {

    private final FlightService flightService;

    @GetMapping("/flights")
    public ResponseEntity<List<Flight>> searchFlights(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) LocalDate departureDate,
            @RequestParam(required = false) LocalDate returnDate,
            @RequestParam(required = false) Integer passengers,
            @RequestParam(required = false) String seatClass) {
        
        List<Flight> flights = flightService.searchFlights(from, to, departureDate, returnDate, passengers);
        return ResponseEntity.ok(flights);
    }
    
    @GetMapping("/destinations")
    public ResponseEntity<List<String>> getPopularDestinations() {
        List<String> destinations = flightService.getPopularDestinations();
        return ResponseEntity.ok(destinations);
    }
}