package com.cloud.phoenixia.dto;

import com.cloud.phoenixia.model.BoothStatus;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoothResponseDTO {
    private Long id;
    private String name;
    private String description;
    private BoothStatus status;
}