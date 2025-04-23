package com.cloud.phoenixia.service;

import com.cloud.phoenixia.model.Booth;
import com.cloud.phoenixia.repository.BoothRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoothService {

    private final BoothRepository boothRepository;

    public List<Booth> findAll() {
        return boothRepository.findAll();
    }

    public Optional<Booth> findById(Long id) {
        return boothRepository.findById(id);
    }

    public Booth create(Booth booth) {
        return boothRepository.save(booth);
    }

    public Booth update(Long id, Booth updatedBooth) {
        return boothRepository.findById(id)
                .map(booth -> {
                    booth.setName(updatedBooth.getName());
                    booth.setDescription(updatedBooth.getDescription());
                    booth.setStatus(updatedBooth.getStatus());
                    return boothRepository.save(booth);
                })
                .orElseThrow(() -> new IllegalArgumentException("Booth not found"));
    }

    public void delete(Long id) {
        boothRepository.deleteById(id);
    }
}