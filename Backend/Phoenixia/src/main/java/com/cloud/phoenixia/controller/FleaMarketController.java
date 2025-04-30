package com.cloud.phoenixia.controller;

import com.cloud.phoenixia.dto.FleaMarketRequestDTO;
import com.cloud.phoenixia.dto.FleaMarketResponseDTO;
import com.cloud.phoenixia.model.FleaMarket;
import com.cloud.phoenixia.service.FleaMarketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fleamarkets")
@RequiredArgsConstructor
public class FleaMarketController {

    private final FleaMarketService fleaMarketService;

    @PostMapping
    public ResponseEntity<FleaMarket> create(@RequestBody @Valid FleaMarketRequestDTO dto) {
        return ResponseEntity.ok(fleaMarketService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<FleaMarketResponseDTO>> getAll() {
        return ResponseEntity.ok(fleaMarketService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FleaMarketResponseDTO> getOne(@PathVariable Long id) {
        return fleaMarketService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FleaMarket> update(@PathVariable Long id, @RequestBody FleaMarketRequestDTO dto) {
        return ResponseEntity.ok(fleaMarketService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fleaMarketService.delete(id);
        return ResponseEntity.noContent().build();
    }
}