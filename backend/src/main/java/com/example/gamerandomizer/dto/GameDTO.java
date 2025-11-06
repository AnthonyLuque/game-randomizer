package com.example.gamerandomizer.dto;

import com.example.gamerandomizer.model.Game;
import java.util.List;
import java.util.stream.Collectors;

public record GameDTO(
        Long id,
        String title,
        List<CriterionDTO> criteria
) {
    public static GameDTO from(Game game) {
        return new GameDTO(
                game.getId(),
                game.getTitle(),
                game.getCriteria().stream()
                        .map(CriterionDTO::from)
                        .collect(Collectors.toList())
        );
    }
}