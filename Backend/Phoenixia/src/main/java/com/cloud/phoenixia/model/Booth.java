package com.cloud.phoenixia.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private BoothStatus status;

    // ✅ 부스 위치 번호 추가
    @Column(nullable = false)
    private int locationNumber;


    @Column(nullable = true)
    private String imageUrl;
}