package com.cloud.phoenixia.dto;


import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoothRequestDTO {
    private String name;
    private String description;
    private String status; // 문자열로 받고 Enum으로 변환
}