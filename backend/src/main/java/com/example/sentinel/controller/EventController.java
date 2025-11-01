package com.example.sentinel.controller;

import com.example.sentinel.entity.Event;
import com.example.sentinel.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Replace * with your frontend domain in production
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // ✅ Log an incoming event
    @PostMapping("/log")
    public Event logEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    // ✅ Fetch events by appId
    @GetMapping("/{appId}")
    public List<Event> getEventsByAppId(@PathVariable String appId) {
        return eventService.getEventsByAppId(appId);
    }

    // ✅ Fetch a single event by database ID
    @GetMapping("/id/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }
}