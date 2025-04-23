package com.cloud.phoenixia.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemDTO {
    private String name;
    private String description;
    private int price;
    private String imageUrl;
}

