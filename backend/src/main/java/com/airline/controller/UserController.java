package com.airline.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import java.util.List;
import com.airline.service.UserService;
import com.airline.entity.User;
import com.airline.entity.Role;
import com.airline.entity.Status;
import com.airline.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {

    private final UserService userService;
    
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> userRequest) {
        try {
            String passwordHash = "$2a$10$SODRsynbc3FoSUbRoliqbOehBsEcRea7BwTqNSBZJrM1mQMisTRDq";
            
            User user = User.builder()
                .fullName((String) userRequest.get("fullName"))
                .email((String) userRequest.get("email"))
                .phone((String) userRequest.get("phone"))
                .role(Role.valueOf((String) userRequest.get("role")))
                .status(Status.ACTIVE)
                .passwordHash(passwordHash)
                .build();
            
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "user", createdUser));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to create user: " + e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> loginRequest) {
        try {
            String email = (String) loginRequest.get("email");
            
            List<User> users = userService.getAllUsers();
            User user = users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElse(null);
            
            if (user != null) {
                String token = JwtUtil.generateToken(user.getEmail(), user.getRole());
                return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "user", user
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Login failed"));
        }
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to delete user"));
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        String email = (String) request.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        List<User> users = userService.getAllUsers();
        User user = users.stream()
            .filter(u -> u.getEmail().equals(email))
            .findFirst()
            .orElse(null);
            
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, Object> updateRequest, HttpServletRequest request) {
        try {
            String email = (String) request.getAttribute("userEmail");
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }
            
            List<User> users = userService.getAllUsers();
            User user = users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElse(null);
                
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }
            
            String fullName = (String) updateRequest.get("fullName");
            String phone = (String) updateRequest.get("phone");
            
            User updatedUser = userService.updateUserProfile(user.getUserId(), fullName, phone);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Update failed"));
        }
    }
    
    @PutMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, Object> passwordRequest, HttpServletRequest request) {
        try {
            String email = (String) request.getAttribute("userEmail");
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }
            
            List<User> users = userService.getAllUsers();
            User user = users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElse(null);
                
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }
            
            String currentPassword = (String) passwordRequest.get("currentPassword");
            String newPassword = (String) passwordRequest.get("newPassword");
            
            boolean success = userService.changePassword(user.getUserId(), currentPassword, newPassword);
            
            if (success) {
                return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Current password is incorrect"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", "Password update failed"));
        }
    }
}