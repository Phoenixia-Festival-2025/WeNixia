package com.cloud.phoenixia.service;

import com.cloud.phoenixia.dto.FoodTruckResponseDTO;
import com.cloud.phoenixia.dto.MenuItemDTO;
import com.cloud.phoenixia.model.FoodTruck;
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

    // ✅ 생성
    public FoodTruck create(FoodTruck foodTruck) {
        // 연관관계 주입
        foodTruck.getMenuItems().forEach(menu -> menu.setFoodTruck(foodTruck));
        return foodTruckRepository.save(foodTruck);
    }

    // ✅ 수정
    public FoodTruck update(Long id, FoodTruck updatedTruck) {
        return foodTruckRepository.findById(id)
                .map(truck -> {
                    truck.setName(updatedTruck.getName());
                    truck.setDescription(updatedTruck.getDescription());
                    truck.setStatus(updatedTruck.getStatus());
                    // 메뉴 업데이트는 별도 처리 필요할 수도 있음
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
                                        .build()
                                ).collect(Collectors.toList())
                )
                .build();
    }
}