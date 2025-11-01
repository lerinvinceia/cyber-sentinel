package com.example.sentinel.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "event")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("app_id")
    @Column(name = "app_id")
    private String appId;

    @JsonProperty("message")
    @Column(name = "message")
    private String message;

    @JsonProperty("source")
    @Column(name = "source")
    private String source;

    @JsonProperty("lineno")
    @Column(name = "lineno")
    private Integer lineno;

    @JsonProperty("colno")
    @Column(name = "colno")
    private Integer colno;

    @JsonProperty("stack_trace")
    @Column(name = "stack_trace", columnDefinition = "TEXT")
    private String stackTrace;

    @JsonProperty("timestamp")
    @Column(name = "timestamp")
    private OffsetDateTime timestamp;

    @JsonProperty("event_key")
    @Column(name = "event_key")
    private String eventKey;

    @JsonProperty("old_value")
    @Column(name = "old_value", columnDefinition = "TEXT")
    private String oldValue;

    @JsonProperty("new_value")
    @Column(name = "new_value", columnDefinition = "TEXT")
    private String newValue;

    @JsonProperty("attempts")
    @Column(name = "attempts")
    private Integer attempts;

    @JsonProperty("extra_info")
    @Column(name = "extra_info", columnDefinition = "TEXT")
    private String extraInfo;
}