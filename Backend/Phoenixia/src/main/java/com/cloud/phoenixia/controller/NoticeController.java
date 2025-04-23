package com.cloud.phoenixia.controller;

import com.cloud.phoenixia.dto.NoticeRequestDTO;
import com.cloud.phoenixia.dto.NoticeResponseDTO;
import com.cloud.phoenixia.model.Notice;
import com.cloud.phoenixia.service.NoticeService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<?> create(@RequestBody NoticeRequestDTO dto) {
        Notice saved = noticeService.create(dto);
        return ResponseEntity.ok("공지 등록 완료! ID: " + saved.getId());
    }
}