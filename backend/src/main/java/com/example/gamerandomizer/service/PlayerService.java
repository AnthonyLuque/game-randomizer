package com.example.gamerandomizer.service;

import com.example.gamerandomizer.dto.PlayerUpdateDTO;
import com.example.gamerandomizer.exception.ResourceNotFoundException;
import com.example.gamerandomizer.model.Game;
import com.example.gamerandomizer.model.Player;
import com.example.gamerandomizer.repository.GameRepository;
import com.example.gamerandomizer.repository.PlayerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class PlayerService {
    private final PlayerRepository playerRepository;
    private final GameRepository gameRepository;

    public PlayerService(PlayerRepository playerRepository, GameRepository gameRepository) {
        this.playerRepository = playerRepository;
        this.gameRepository = gameRepository;
    }

    public List<Player> getAll() {
        return playerRepository.findAllWithGames();
    }

    public Player getById(Long id) {
        return playerRepository.findByIdWithGames(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id " + id));
    }

    @Transactional
    public Player create(Player player) {
        return playerRepository.save(player);
    }

    @Transactional
    public Player update(Long id, PlayerUpdateDTO updateDTO) {
        Player existing = playerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id " + id));

        existing.setUsername(updateDTO.username());

        // Mettre à jour les jeux possédés
        Set<Game> games = new HashSet<>();
        if (updateDTO.gameIds() != null) {
            for (Long gameId : updateDTO.gameIds()) {
                gameRepository.findById(gameId).ifPresent(games::add);
            }
        }
        existing.setGamesOwned(games);

        return playerRepository.save(existing);
    }

    public void delete(Long id) {
        Player existing = getById(id);
        playerRepository.delete(existing);
    }
}