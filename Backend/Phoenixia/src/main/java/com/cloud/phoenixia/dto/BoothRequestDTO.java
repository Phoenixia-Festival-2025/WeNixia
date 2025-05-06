package com.cloud.phoenixia.dto;


import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoothRequestDTO {
    private String name;
    private String description;
    private String status; // 문자열로 받고 Enum으로 변환

    // ✅ 추가
    private int locationNumber;

    private String imageUrl; // ✅ optional 필드

    private List<String> posterUrls; // ✅ 추가
}