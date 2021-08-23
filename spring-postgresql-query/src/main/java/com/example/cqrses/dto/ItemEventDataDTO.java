package com.example.cqrses.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ItemEventDataDTO {
    private UUID id;
    private UUID itemId;
    private String name;
    private Integer quantity;
    private String eventType;
    private LocalDateTime timestamp;
}
