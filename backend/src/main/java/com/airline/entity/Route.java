package com.airline.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "routes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Route extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "source_airport_id")
    private Airport sourceAirport;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destination_airport_id")
    private Airport destinationAirport;

    private Integer distanceKm;
    private Integer durationMinutes;
}