package com.example.gamerandomizer.dto;

import com.example.gamerandomizer.model.Player;
import java.util.List;
import java.util.stream.Collectors;

public record PlayerDTO(
        Long id,
        String username,
        List<GameDTO> gamesOwned
) {
    public static PlayerDTO from(Player player) {
        return new PlayerDTO(
                player.getId(),
                player.getUsername(),
                player.getGamesOwned().stream()
                        .map(GameDTO::from)
                        .collect(Collectors.toList())
        );
    }
}