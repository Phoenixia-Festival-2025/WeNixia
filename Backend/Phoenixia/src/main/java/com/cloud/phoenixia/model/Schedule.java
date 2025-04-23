package com.cloud.phoenixia.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;   // "25.05.07" 같은 문자열

    private String time;   // "13:00"

    private String title;  // "개막식 🔥"
}