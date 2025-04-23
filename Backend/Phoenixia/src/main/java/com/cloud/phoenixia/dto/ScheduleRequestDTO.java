package com.cloud.phoenixia.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleRequestDTO {
    private String date;   // "25.05.07"
    private String time;   // "13:00"
    private String title;  // "개막식 🔥"
}