package com.cloud.phoenixia.dto;

import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodTruckRequestDTO {
    private String name;
    private String description;
    private String status; // 문자열로 받고, 나중에 Enum 변환

    private String imageUrl; // ✅ 추가됨
    private List<MenuItemDTO> menuItems;
}