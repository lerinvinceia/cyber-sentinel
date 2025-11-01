package com.example.sentinel.service;

import com.example.sentinel.entity.Event;
import com.example.sentinel.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // ✅ Save an event
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    // ✅ Get all events by appId
    public List<Event> getEventsByAppId(String appId) {
        return eventRepository.findByAppId(appId);
    }

    // ✅ Get a single event by id
    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
}
