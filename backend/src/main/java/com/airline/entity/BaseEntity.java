package com.airline.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@Setter
public abstract class BaseEntity {

    @Column(updatable = false, nullable = false)
    protected LocalDateTime createdOn;

    @Column(nullable = false)
    protected LocalDateTime modifiedOn;

    @Column(updatable = false)
    protected String createdBy;

    protected String modifiedBy;

    @PrePersist
    protected void onCreate() {
        this.createdOn = LocalDateTime.now();
        this.modifiedOn = LocalDateTime.now();
        this.createdBy = getCurrentUser();
        this.modifiedBy = getCurrentUser();
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifiedOn = LocalDateTime.now();
        this.modifiedBy = getCurrentUser();
    }

    /**
     * Extract current logged-in user (email) from SecurityContext.
     * Safe fallback for non-auth flows.
     */
    private String getCurrentUser() {
        try {
            return org.springframework.security.core.context.SecurityContextHolder
                    .getContext()
                    .getAuthentication()
                    .getName();
        } catch (Exception e) {
            return "SYSTEM";
        }
    }
}
