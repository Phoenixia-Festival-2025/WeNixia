package com.cloud.phoenixia.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FleaMarketRequestDTO {
    private String title;
    private String description;
    private String status;
}