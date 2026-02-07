package com.airline.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cancellations")
public class Cancellation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cancellationId;

    @OneToOne
    private Booking booking;

    @Enumerated(EnumType.STRING)
    private CancelledBy cancelledBy;

    private BigDecimal refundAmount;
}