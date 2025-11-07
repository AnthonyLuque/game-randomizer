package com.example.gamerandomizer.dto;

import java.util.List;

public record GameUpdateDTO(
        String title,
        List<Long> criteriaIds
) {}