package com.airline.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"flight_id", "seat_number"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(nullable = false, unique = true)
    private String pnr;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User passenger;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "flight_id")
    private Flight flight;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime bookingDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;
    
    @Builder.Default
    private Integer numberOfPassengers = 1;
    
    @Column(length = 10)
    private String seatNumber;
    
    @Enumerated(EnumType.STRING)
    private SeatClass seatClass;
    
    @Builder.Default
    private Boolean checkedIn = false;
}
