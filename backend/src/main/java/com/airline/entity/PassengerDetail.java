package com.airline.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "passenger_details")
public class PassengerDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long passengerDetailId;

    @ManyToOne
    private Booking booking;

    private String fullName;
    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    private Seat seat;
}