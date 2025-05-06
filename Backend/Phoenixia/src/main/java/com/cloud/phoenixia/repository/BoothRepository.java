package com.cloud.phoenixia.repository;

import com.cloud.phoenixia.model.Booth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoothRepository extends JpaRepository<Booth, Long> {

    @Override
    @EntityGraph(attributePaths = "posters") // ✅ 이 부분이 핵심!
    List<Booth> findAll();

    @EntityGraph(attributePaths = "posters")
    Optional<Booth> findById(Long id);
}