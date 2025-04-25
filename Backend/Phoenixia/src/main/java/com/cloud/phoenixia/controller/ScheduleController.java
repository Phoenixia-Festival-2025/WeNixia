package com.cloud.phoenixia.controller;

import com.cloud.phoenixia.dto.ScheduleRequestDTO;
import com.cloud.phoenixia.dto.ScheduleResponseDTO;
import com.cloud.phoenixia.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timetable")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid ScheduleRequestDTO dto) {
        scheduleService.create(dto);
        return ResponseEntity.ok("타임테이블 항목 등록 완료!");
    }

    @GetMapping("/{date}")
    public ResponseEntity<List<ScheduleResponseDTO>> getByDate(@PathVariable String date) {
        return ResponseEntity.ok(scheduleService.getByDate(date));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ScheduleRequestDTO dto) {
        try {
            scheduleService.update(id, dto);
            return ResponseEntity.ok("타임테이블 항목 수정 완료!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        scheduleService.delete(id);
        return ResponseEntity.noContent().build(); // HTTP 204
    }
}