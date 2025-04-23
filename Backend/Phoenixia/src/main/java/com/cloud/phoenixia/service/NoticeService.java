package com.cloud.phoenixia.service;

import com.cloud.phoenixia.dto.NoticeRequestDTO;
import com.cloud.phoenixia.dto.NoticeResponseDTO;
import com.cloud.phoenixia.model.Notice;
import com.cloud.phoenixia.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public List<NoticeResponseDTO> getAll() {
        return noticeRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Notice create(NoticeRequestDTO dto) {
        Notice notice = Notice.builder()
                .title(dto.getTitle())
                .date(LocalDate.parse(dto.getDate()))
                .content(dto.getContent())
                .build();
        return noticeRepository.save(notice);
    }

    private NoticeResponseDTO convertToDTO(Notice notice) {
        return NoticeResponseDTO.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .date(notice.getDate().toString())
                .content(notice.getContent())
                .build();
    }
}