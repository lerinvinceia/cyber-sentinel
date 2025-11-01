package com.example.sentinel.controller;

import com.example.sentinel.entity.Project;
import com.example.sentinel.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Adjust this in production to your frontend origin
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @GetMapping
    public List<Project> getProjectsByUserId(@RequestParam String userId) {
        return projectService.getProjectsByUserId(userId);
    }

    @GetMapping("/by-name")
    public ResponseEntity<Project> getProjectByName(
            @RequestParam String userId,
            @RequestParam String projectName) {

        return projectService.getProjectByUserIdAndName(userId, projectName)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-apikey")
    public ResponseEntity<Project> getProjectByApiKey(@RequestParam String apiKey) {
        return projectService.getProjectByApiKey(apiKey)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}