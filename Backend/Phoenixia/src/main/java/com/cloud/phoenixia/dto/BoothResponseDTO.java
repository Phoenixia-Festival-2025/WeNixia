package com.cloud.phoenixia.dto;

import com.cloud.phoenixia.model.Booth;
import com.cloud.phoenixia.model.BoothStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoothResponseDTO {

    private Long id;
    private String name;
    private String description;
    private BoothStatus status;
    private int locationNumber;
    private String imageUrl;

//    public BoothResponseDTO toResponseDTO(Booth booth) {
//        return BoothResponseDTO.builder()
//                .id(booth.getId())
//                .name(booth.getName())
//                .description(booth.getDescription())
//                .status(booth.getStatus())
//                .locationNumber(booth.getLocationNumber())
//                .imageUrl(
//                        booth.getImageUrl() != null ?
//                                booth.getImageUrl() :
//                                "https://phoenixia-static-assets.s3.ap-northeast-2.amazonaws.com/default.png"
//                )
//                .build();
//    }

}