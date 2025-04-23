package com.cloud.phoenixia.dto;


import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduleResponseDTO {
    private String time;
    private String title;
}