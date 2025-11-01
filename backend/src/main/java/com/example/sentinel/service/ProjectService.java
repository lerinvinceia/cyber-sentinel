package com.example.sentinel.service;

import com.example.sentinel.entity.Project;
import com.example.sentinel.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // Save a project
    public Project createProject(Project project) {
        project.setCreatedAt(OffsetDateTime.now());  // Use OffsetDateTime.now() as per your config
        return projectRepository.save(project);
    }

    // Get projects by userId
    public List<Project> getProjectsByUserId(String userId) {
        return projectRepository.findByUserId(userId);
    }

    // Get project by userId and name
    public Optional<Project> getProjectByUserIdAndName(String userId, String name) {
        return projectRepository.findByUserIdAndName(userId, name);
    }

    // Get project by apiKey
    public Optional<Project> getProjectByApiKey(String apiKey) {
        return projectRepository.findByApiKey(apiKey);
    }
}
