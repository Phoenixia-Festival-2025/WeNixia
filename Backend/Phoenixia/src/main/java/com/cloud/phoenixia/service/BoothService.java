package com.cloud.phoenixia.service;

import com.cloud.phoenixia.dto.BoothRequestDTO;
import com.cloud.phoenixia.dto.BoothResponseDTO;
import com.cloud.phoenixia.model.Booth;
import com.cloud.phoenixia.model.BoothStatus;
import com.cloud.phoenixia.repository.BoothRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoothService {

    private final BoothRepository boothRepository;

    public Booth createFromDTO(BoothRequestDTO dto) {
        Booth booth = Booth.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .status(BoothStatus.valueOf(dto.getStatus()))
                .locationNumber(dto.getLocationNumber()) // ✅ 추가
                .build();
        return boothRepository.save(booth);
    }

    public List<BoothResponseDTO> getAll() {
        return boothRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<BoothResponseDTO> findById(Long id) {
        return boothRepository.findById(id).map(this::convertToDTO);
    }


    // 수정
    public BoothResponseDTO updateFromDTO(Long id, BoothRequestDTO dto) {
        return boothRepository.findById(id)
                .map(booth -> {
                    booth.setName(dto.getName());
                    booth.setDescription(dto.getDescription());
                    booth.setStatus(BoothStatus.valueOf(dto.getStatus()));
                    booth.setLocationNumber(dto.getLocationNumber()); // ✅ 추가
                    return convertToDTO(boothRepository.save(booth));
                })
                .orElseThrow(() -> new IllegalArgumentException("Booth not found"));
    }

    // 삭제
    public void delete(Long id) {
        boothRepository.deleteById(id);
    }

    private BoothResponseDTO convertToDTO(Booth booth) {
        return BoothResponseDTO.builder()
                .id(booth.getId())
                .name(booth.getName())
                .description(booth.getDescription())
                .status(booth.getStatus())
                .locationNumber(booth.getLocationNumber()) // ✅ 추가
                .build();
    }
}