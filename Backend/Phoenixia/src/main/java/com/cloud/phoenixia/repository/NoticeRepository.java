package com.cloud.phoenixia.repository;

import com.cloud.phoenixia.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}