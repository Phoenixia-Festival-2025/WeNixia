package com.cloud.phoenixia.service;

import com.cloud.phoenixia.dto.FoodTruckRequestDTO;
import com.cloud.phoenixia.dto.FoodTruckResponseDTO;
import com.cloud.phoenixia.dto.MenuItemDTO;
import com.cloud.phoenixia.model.BoothStatus;
import com.cloud.phoenixia.model.FoodTruck;
import com.cloud.phoenixia.model.MenuItem;
import com.cloud.phoenixia.model.MenuItemStatus;
import com.cloud.phoenixia.repository.FoodTruckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodTruckService {

    private static final String DEFAULT_IMAGE_URL = "https://phoenixia-static-assets.s3.ap-northeast-2.amazonaws.com/foddtruckImg.png";
    private static final String DEFAULT_MENU_IMAGE_URL = "https://phoenixia-static-assets.s3.ap-northeast-2.amazonaws.com/foodDefault.png";

    private final FoodTruckRepository foodTruckRepository;

    // 전체 조회
    public List<FoodTruckResponseDTO> getAllWithMenus() {
        return foodTruckRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 단건 조회
    public Optional<FoodTruckResponseDTO> findDTOById(Long id) {
        return foodTruckRepository.findById(id).map(this::convertToDTO);
    }

    // 생성
    public FoodTruck createFromDTO(FoodTruckRequestDTO dto) {
        FoodTruck truck = FoodTruck.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .status(BoothStatus.valueOf(dto.getStatus()))
                .imageUrl(resolveImageUrl(dto.getImageUrl(), DEFAULT_IMAGE_URL))
                .build();

        List<MenuItem> menuItems = dto.getMenuItems().stream()
                .map(item -> MenuItem.builder()
                        .name(item.getName())
                        .description(item.getDescription())
                        .price(item.getPrice())
                        .status(resolveStatus(item.getStatus()))
                        .imageUrl(resolveImageUrl(item.getImageUrl(), DEFAULT_MENU_IMAGE_URL))
                        .foodTruck(truck)
                        .build()
                ).collect(Collectors.toList());

        truck.setMenuItems(menuItems);
        return foodTruckRepository.save(truck);
    }

    public FoodTruck updateFromDTO(Long id, FoodTruckRequestDTO dto) {
        return foodTruckRepository.findById(id)
                .map(truck -> {
                    truck.setName(dto.getName());
                    truck.setDescription(dto.getDescription());
                    truck.setStatus(BoothStatus.valueOf(dto.getStatus()));
                    truck.setImageUrl(resolveImageUrl(dto.getImageUrl(), DEFAULT_IMAGE_URL));

                    // ✅ 기존 메뉴 삭제 후 다시 추가
                    truck.getMenuItems().clear();
                    List<MenuItem> updatedItems = dto.getMenuItems().stream()
                            .map(item -> MenuItem.builder()
                                    .name(item.getName())
                                    .description(item.getDescription())
                                    .price(item.getPrice())
                                    .imageUrl(resolveImageUrl(item.getImageUrl(), DEFAULT_MENU_IMAGE_URL))
                                    .status(resolveStatus(item.getStatus()))
                                    .foodTruck(truck)
                                    .build())
                            .collect(Collectors.toList());

                    truck.getMenuItems().addAll(updatedItems); // ✅ 기존 리스트에 추가

                    return foodTruckRepository.save(truck);
                })
                .orElseThrow(() -> new IllegalArgumentException("FoodTruck not found"));
    }

    // 삭제
    public void delete(Long id) {
        foodTruckRepository.deleteById(id);
    }

    // Entity → DTO 변환
    private FoodTruckResponseDTO convertToDTO(FoodTruck truck) {
        return FoodTruckResponseDTO.builder()
                .id(truck.getId())
                .name(truck.getName())
                .description(truck.getDescription())
                .status(truck.getStatus())
                .imageUrl(resolveImageUrl(truck.getImageUrl(), DEFAULT_IMAGE_URL))
                .menuItems(
                        truck.getMenuItems().stream()
                                .map(menu -> MenuItemDTO.builder()
                                        .name(menu.getName())
                                        .description(menu.getDescription())
                                        .price(menu.getPrice())
                                        .imageUrl(resolveImageUrl(menu.getImageUrl(), DEFAULT_MENU_IMAGE_URL))
                                        .status(menu.getStatus() != null ? menu.getStatus().name() : null)
                                        .build())
                                .collect(Collectors.toList())
                )
                .build();
    }

    // 🔧 유틸: 이미지 경로 설정
    private String resolveImageUrl(String url, String fallback) {
        return Optional.ofNullable(url)
                .filter(s -> !s.isBlank())
                .orElse(fallback);
    }

    // 🔧 유틸: 상태값 처리
    private MenuItemStatus resolveStatus(String status) {
        return Optional.ofNullable(status)
                .map(MenuItemStatus::valueOf)
                .orElse(MenuItemStatus.판매중);
    }
}