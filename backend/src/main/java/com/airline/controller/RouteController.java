package com.airline.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;
import com.airline.repository.RouteRepository;
import com.airline.entity.Route;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class RouteController {

    private final RouteRepository routeRepository;
    
    @GetMapping
    public ResponseEntity<List<Route>> getAllRoutes() {
        List<Route> routes = routeRepository.findAll();
        return ResponseEntity.ok(routes);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRoute(@PathVariable Long id) {
        try {
            routeRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Route deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to delete route"));
        }
    }
}