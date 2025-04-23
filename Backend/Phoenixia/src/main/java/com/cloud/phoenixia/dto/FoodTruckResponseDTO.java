package com.cloud.phoenixia.dto;

import com.cloud.phoenixia.model.BoothStatus;
import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodTruckResponseDTO {
    private Long id;
    private String name;
    private String description;
    private BoothStatus status;
    private List<MenuItemDTO> menuItems;
}