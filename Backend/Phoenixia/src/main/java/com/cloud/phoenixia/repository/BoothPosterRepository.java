package com.cloud.phoenixia.repository;

import com.cloud.phoenixia.model.BoothPoster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoothPosterRepository extends JpaRepository<BoothPoster, Long> {
    List<BoothPoster> findByBoothId(Long boothId);
}