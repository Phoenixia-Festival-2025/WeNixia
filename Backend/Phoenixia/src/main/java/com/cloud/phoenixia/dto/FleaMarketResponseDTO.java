package com.cloud.phoenixia.dto;

import com.cloud.phoenixia.model.FleaMarketStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FleaMarketResponseDTO {
    private Long id;
    private String title;
    private String description;
    private FleaMarketStatus status;
}