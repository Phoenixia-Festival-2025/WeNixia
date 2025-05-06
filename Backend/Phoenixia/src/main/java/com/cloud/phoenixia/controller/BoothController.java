package com.cloud.phoenixia.controller;

import com.cloud.phoenixia.dto.BoothRequestDTO;
import com.cloud.phoenixia.dto.BoothResponseDTO;
import com.cloud.phoenixia.service.BoothService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/booths")
public class BoothController {

    private final BoothService boothService;

    // ✅ 생성
    @PostMapping
    public ResponseEntity<String> create(@RequestBody BoothRequestDTO dto) {
        boothService.createFromDTO(dto);
        return ResponseEntity.ok("Booth 등록 완료!");
    }

    // ✅ 전체 조회
    @GetMapping
    public List<BoothResponseDTO> getAll() {
        return boothService.getAll();
    }

    // ✅ ID로 조회
    @GetMapping("/{id}")
    public ResponseEntity<BoothResponseDTO> getById(@PathVariable Long id) {
        return boothService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ 수정
    @PutMapping("/{id}")
    public ResponseEntity<BoothResponseDTO> update(@PathVariable Long id, @RequestBody BoothRequestDTO dto) {
        try {
            return ResponseEntity.ok(boothService.updateFromDTO(id, dto));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boothService.delete(id);
        return ResponseEntity.noContent().build();
    }
}