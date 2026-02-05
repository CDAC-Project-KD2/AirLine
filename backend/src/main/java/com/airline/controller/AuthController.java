package com.airline.controller;

import com.airline.dto.AuthResponse;
import com.airline.dto.LoginRequest;
import com.airline.dto.RegisterRequest;
import com.airline.entity.*;
import com.airline.repository.UserRepository;
import com.airline.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"})
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest r) {

        if (userRepository.findByEmail(r.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }

        User user = User.builder()
                .fullName(r.getName())
                .email(r.getEmail())
                .passwordHash(encoder.encode(r.getPassword()))
                .role(Role.USER)
                .status(Status.ACTIVE)
                .build();

        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest r) {
        try {
            System.out.println("Login attempt for email: " + r.getEmail());
            
            User user = userRepository.findByEmail(r.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            System.out.println("User found: " + user.getEmail());
            System.out.println("Password match: " + encoder.matches(r.getPassword(), user.getPasswordHash()));

            if (!encoder.matches(r.getPassword(), user.getPasswordHash())) {
                throw new RuntimeException("Invalid credentials");
            }

            AuthResponse response = new AuthResponse(
                    JwtUtil.generateToken(user.getEmail(), user.getRole())
            );
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Login error: " + e.getMessage());
            throw new RuntimeException("Invalid email or password");
        }
    }
    
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        
        // In a real application, you would send an email with a reset link
        // For now, just return a success message
        return ResponseEntity.ok("Password reset link sent to your email");
    }
}
