package com.cloud.phoenixia.dto;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeRequestDTO {
    private String title;
    private String date; // 문자열로 받고 LocalDate로 변환
    private String content;
}