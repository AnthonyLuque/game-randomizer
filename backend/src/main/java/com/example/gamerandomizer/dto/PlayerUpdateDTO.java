package com.example.gamerandomizer.dto;

import java.util.List;

public record PlayerUpdateDTO(
        String username,
        List<Long> gameIds
) {}
