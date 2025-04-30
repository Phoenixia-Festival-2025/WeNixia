package com.cloud.phoenixia.service;

import com.cloud.phoenixia.dto.FleaMarketRequestDTO;
import com.cloud.phoenixia.dto.FleaMarketResponseDTO;
import com.cloud.phoenixia.model.FleaMarket;
import com.cloud.phoenixia.model.FleaMarketStatus;
import com.cloud.phoenixia.repository.FleaMarketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FleaMarketService {

    private final FleaMarketRepository fleaMarketRepository;

    public FleaMarket create(FleaMarketRequestDTO dto) {
        FleaMarket fleaMarket = FleaMarket.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .status(FleaMarketStatus.valueOf(dto.getStatus()))
                .build();
        return fleaMarketRepository.save(fleaMarket);
    }

    public List<FleaMarketResponseDTO> getAll() {
        return fleaMarketRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public Optional<FleaMarketResponseDTO> findById(Long id) {
        return fleaMarketRepository.findById(id).map(this::toDTO);
    }

    public FleaMarket update(Long id, FleaMarketRequestDTO dto) {
        return fleaMarketRepository.findById(id)
                .map(market -> {
                    market.setTitle(dto.getTitle());
                    market.setDescription(dto.getDescription());
                    market.setStatus(FleaMarketStatus.valueOf(dto.getStatus()));
                    return fleaMarketRepository.save(market);
                })
                .orElseThrow(() -> new IllegalArgumentException("Flea Market not found"));
    }

    public void delete(Long id) {
        fleaMarketRepository.deleteById(id);
    }

    private FleaMarketResponseDTO toDTO(FleaMarket market) {
        return FleaMarketResponseDTO.builder()
                .id(market.getId())
                .title(market.getTitle())
                .description(market.getDescription())
                .status(market.getStatus())
                .build();
    }
}