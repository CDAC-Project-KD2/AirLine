package com.airline.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "check_in")
public class CheckIn extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkinId;

    @OneToOne
    private Booking booking;

    private Boolean checkedIn;
    private Boolean boarded;
    private LocalDateTime checkinTime;
}