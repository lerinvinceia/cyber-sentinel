package com.example.sentinel.repository;

import com.example.sentinel.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUserId(String userId);

    Optional<Project> findByUserIdAndName(String userId, String name);

    Optional<Project> findByApiKey(String apiKey);
}
