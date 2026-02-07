package com.airline.service;

import com.airline.entity.User;
import java.util.List;

public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
    User getUserById(Long id);
    User updateUserProfile(Long userId, String fullName, String phone);
    boolean changePassword(Long userId, String currentPassword, String newPassword);
    void deleteUser(Long id);
}
