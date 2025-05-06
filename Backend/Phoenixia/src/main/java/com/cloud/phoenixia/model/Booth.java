package com.cloud.phoenixia.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.ArrayList;


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

    @OneToMany(mappedBy = "booth", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoothPoster> posters = new ArrayList<>();
}