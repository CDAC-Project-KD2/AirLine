package com.airline.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.airline.entity.Route;
import com.airline.entity.Airport;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findBySourceAirport(Airport sourceAirport);
    List<Route> findByDestinationAirport(Airport destinationAirport);
    List<Route> findBySourceAirportAndDestinationAirport(Airport sourceAirport, Airport destinationAirport);
}