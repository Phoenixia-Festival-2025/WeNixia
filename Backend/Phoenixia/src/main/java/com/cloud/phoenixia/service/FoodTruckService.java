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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodTruckService {

    private final FoodTruckRepository foodTruckRepository;

    public List<FoodTruckResponseDTO> getAllWithMenus() {
        return foodTruckRepository.findAll().stream()
                .map(truck -> FoodTruckResponseDTO.builder()
                        .id(truck.getId())
                        .name(truck.getName())
                        .description(truck.getDescription())
                        .status(truck.getStatus())
                        .menuItems(
                                truck.getMenuItems().stream()
                                        .map(menu -> MenuItemDTO.builder()
                                                .name(menu.getName())
                                                .description(menu.getDescription())
                                                .price(menu.getPrice())
                                                .imageUrl(menu.getImageUrl())
                                                .status(menu.getStatus() != null ? menu.getStatus().name() : null)
                                                .build())
                                        .toList()
                        )
                        .build())
                .toList();
    }

    // ✅ ID로 조회 후 DTO 변환 (Optional로 반환)
    public Optional<FoodTruckResponseDTO> findDTOById(Long id) {
        return foodTruckRepository.findById(id)
                .map(this::convertToDTO);
    }

    public FoodTruck createFromDTO(FoodTruckRequestDTO dto) {
        FoodTruck truck = FoodTruck.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .status(BoothStatus.valueOf(dto.getStatus()))
                .build();

        List<MenuItem> menuList = dto.getMenuItems().stream()
                .map(item -> {
                    // 🧠 상태 기본값 처리
                    MenuItemStatus status = item.getStatus() != null
                            ? MenuItemStatus.valueOf(item.getStatus())
                            : MenuItemStatus.판매중;

                    return MenuItem.builder()
                            .name(item.getName())
                            .description(item.getDescription())
                            .price(item.getPrice())
                            .imageUrl(item.getImageUrl())
                            .status(status) // ✅ status 설정
                            .foodTruck(truck) // ✅ 연관관계 주입
                            .build();
                }).toList();

        truck.setMenuItems(menuList);
        return foodTruckRepository.save(truck);
    }

    public FoodTruck updateFromDTO(Long id, FoodTruckRequestDTO dto) {
        return foodTruckRepository.findById(id)
                .map(truck -> {
                    truck.setName(dto.getName());
                    truck.setDescription(dto.getDescription());
                    truck.setStatus(BoothStatus.valueOf(dto.getStatus()));

                    if (dto.getMenuItems() != null) {
                        dto.getMenuItems().forEach(item -> {
                            truck.getMenuItems().stream()
                                    .filter(existing -> existing.getName().equals(item.getName()))
                                    .findFirst()
                                    .ifPresent(existing -> {
                                        existing.setStatus(item.getStatus() != null
                                                ? MenuItemStatus.valueOf(item.getStatus())
                                                : MenuItemStatus.판매중);
                                    });
                        });
                    }

                    return foodTruckRepository.save(truck);
                })
                .orElseThrow(() -> new IllegalArgumentException("FoodTruck not found"));
    }

    // ✅ 삭제
    public void delete(Long id) {
        foodTruckRepository.deleteById(id);
    }

    // 🔄 엔티티 → DTO 변환 로직
    private FoodTruckResponseDTO convertToDTO(FoodTruck truck) {
        return FoodTruckResponseDTO.builder()
                .id(truck.getId())
                .name(truck.getName())
                .description(truck.getDescription())
                .status(truck.getStatus())
                .menuItems(
                        truck.getMenuItems().stream()
                                .map(menu -> MenuItemDTO.builder()
                                        .name(menu.getName())
                                        .description(menu.getDescription())
                                        .price(menu.getPrice())
                                        .imageUrl(menu.getImageUrl())
                                        .status(menu.getStatus() != null ? menu.getStatus().name() : null)
                                        .build()
                                ).collect(Collectors.toList())
                )
                .build();
    }
}