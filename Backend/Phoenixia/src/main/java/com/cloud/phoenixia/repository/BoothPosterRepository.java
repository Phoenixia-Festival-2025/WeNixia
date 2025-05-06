package com.cloud.phoenixia.repository;

import com.cloud.phoenixia.model.BoothPoster;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoothPosterRepository extends JpaRepository<BoothPoster, Long> {
    List<BoothPoster> findByBoothId(Long boothId);
}