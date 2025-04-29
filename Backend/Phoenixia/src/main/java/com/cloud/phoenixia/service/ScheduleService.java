package com.cloud.phoenixia.service;

import com.cloud.phoenixia.dto.ScheduleRequestDTO;
import com.cloud.phoenixia.dto.ScheduleResponseDTO;
import com.cloud.phoenixia.model.Schedule;
import com.cloud.phoenixia.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    public void create(ScheduleRequestDTO dto) {
        Schedule schedule = Schedule.builder()
                .date(dto.getDate())
                .time(dto.getTime())
                .title(dto.getTitle())
                .build();
        scheduleRepository.save(schedule);
    }

    public List<ScheduleResponseDTO> getByDate(String date) {
        return scheduleRepository.findByDate(date).stream()
                .map(s -> ScheduleResponseDTO.builder()
                        .time(s.getTime())
                        .title(s.getTitle())
                        .build())
                .toList();
    }


    public void update(Long id, ScheduleRequestDTO dto) {
        scheduleRepository.findById(id)
                .map(schedule -> {
                    schedule.setDate(dto.getDate());
                    schedule.setTime(dto.getTime());
                    schedule.setTitle(dto.getTitle());
                    return scheduleRepository.save(schedule);
                })
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found"));
    }


    public void delete(Long id) {
        scheduleRepository.deleteById(id);
    }
}