package com.cloud.phoenixia.controller;

import com.cloud.phoenixia.dto.NoticeRequestDTO;
import com.cloud.phoenixia.dto.NoticeResponseDTO;
import com.cloud.phoenixia.model.Notice;
import com.cloud.phoenixia.service.NoticeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public List<NoticeResponseDTO> getAll() {
        return noticeService.getAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid NoticeRequestDTO dto) {
        Notice saved = noticeService.create(dto);
        return ResponseEntity.ok("공지 등록 완료! ID: " + saved.getId());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody NoticeRequestDTO dto) {
        try {
            Notice updated = noticeService.update(id, dto);
            return ResponseEntity.ok("공지 수정 완료!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        noticeService.delete(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

}