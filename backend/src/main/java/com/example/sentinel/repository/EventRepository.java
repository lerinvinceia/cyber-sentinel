package com.example.sentinel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sentinel.entity.Event;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByAppId(String appId);
}
