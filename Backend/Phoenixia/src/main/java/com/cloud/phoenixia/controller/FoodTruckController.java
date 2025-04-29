package com.cloud.phoenixia.controller;

import com.cloud.phoenixia.dto.FoodTruckRequestDTO;
import com.cloud.phoenixia.model.FoodTruck;
import com.cloud.phoenixia.service.FoodTruckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cloud.phoenixia.dto.FoodTruckResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/foodtrucks")
public class FoodTruckController {

    private final FoodTruckService foodTruckService;


    @GetMapping
    public List<FoodTruckResponseDTO> getAll() {
        return foodTruckService.getAllWithMenus();
    }


    @GetMapping("/{id}")
    public ResponseEntity<FoodTruckResponseDTO> getOne(@PathVariable Long id) {
        return foodTruckService.findDTOById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<?> create(@RequestBody FoodTruckRequestDTO dto) {
        FoodTruck foodTruck = foodTruckService.createFromDTO(dto);
        return ResponseEntity.ok("푸드트럭 등록 성공!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody FoodTruckRequestDTO dto) {
        try {
            FoodTruck updated = foodTruckService.updateFromDTO(id, dto);
            return ResponseEntity.ok("수정 완료");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        foodTruckService.delete(id);
        return ResponseEntity.noContent().build();
    }
}