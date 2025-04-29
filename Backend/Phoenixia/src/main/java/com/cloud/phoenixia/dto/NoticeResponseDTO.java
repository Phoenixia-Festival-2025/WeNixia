package com.cloud.phoenixia.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeResponseDTO {
    private Long id;
    private String title;
    private String date; // ISO 포맷 문자열 (yyyy-MM-dd)
    private String content;
}