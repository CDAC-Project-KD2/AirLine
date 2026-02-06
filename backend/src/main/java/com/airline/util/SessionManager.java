package com.airline.util;

public class SessionManager {
    private static Long currentUserId = null;
    
    public static void setCurrentUserId(Long userId) {
        currentUserId = userId;
    }
    
    public static Long getCurrentUserId() {
        return currentUserId;
    }
}