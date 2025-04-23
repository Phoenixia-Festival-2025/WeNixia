package com.cloud.phoenixia.controller;

import com.cloud.phoenixia.model.Booth;
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

    @GetMapping
    public List<Booth> getAll() {
        return boothService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booth> getOne(@PathVariable Long id) {
        return boothService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Booth create(@RequestBody Booth booth) {
        return boothService.create(booth);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booth> update(@PathVariable Long id, @RequestBody Booth booth) {
        try {
            return ResponseEntity.ok(boothService.update(id, booth));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boothService.delete(id);
        return ResponseEntity.noContent().build();
    }
}