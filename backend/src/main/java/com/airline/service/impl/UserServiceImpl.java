package com.airline.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import lombok.RequiredArgsConstructor;
import java.util.List;
import com.airline.repository.UserRepository;
import com.airline.service.UserService;
import com.airline.entity.User;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    @Override
    public User updateUserProfile(Long userId, String fullName, String phone) {
        User user = getUserById(userId);
        if (fullName != null && !fullName.trim().isEmpty()) {
            user.setFullName(fullName);
        }
        if (phone != null && !phone.trim().isEmpty()) {
            user.setPhone(phone);
        }
        return userRepository.save(user);
    }
    
    @Override
    public boolean changePassword(Long userId, String currentPassword, String newPassword) {
        User user = getUserById(userId);
        
        // Check if current password matches
        if (passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            // Update with new password
            user.setPasswordHash(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }
    
    @Override
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
