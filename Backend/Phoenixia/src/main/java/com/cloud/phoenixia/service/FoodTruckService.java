package com.cloud.phoenixia.service;

import com.cloud.phoenixia.model.FoodTruck;
import com.cloud.phoenixia.repository.FoodTruckRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FoodTruckService {

    private final FoodTruckRepository foodTruckRepository;

    public List<FoodTruck> findAll() {
        return foodTruckRepository.findAll();
    }

    public Optional<FoodTruck> findById(Long id) {
        return foodTruckRepository.findById(id);
    }

    public FoodTruck create(FoodTruck foodTruck) {
        return foodTruckRepository.save(foodTruck);
    }

    public FoodTruck update(Long id, FoodTruck updatedTruck) {
        return foodTruckRepository.findById(id)
                .map(truck -> {
                    truck.setName(updatedTruck.getName());
                    truck.setMenuName(updatedTruck.getMenuName());
                    truck.setImageUrl(updatedTruck.getImageUrl());
                    truck.setPrice(updatedTruck.getPrice());
                    truck.setDescription(updatedTruck.getDescription());
                    truck.setStatus(updatedTruck.getStatus());
                    return foodTruckRepository.save(truck);
                })
                .orElseThrow(() -> new IllegalArgumentException("FoodTruck not found"));
    }

    public void delete(Long id) {
        foodTruckRepository.deleteById(id);
    }
}