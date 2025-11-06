package com.example.gamerandomizer.service;

import com.example.gamerandomizer.exception.ResourceNotFoundException;
import com.example.gamerandomizer.model.Player;
import com.example.gamerandomizer.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    private final PlayerRepository repo;

    public PlayerService(PlayerRepository repo) {
        this.repo = repo;
    }

    public List<Player> getAll() {
        return repo.findAllWithGames(); // ← Au lieu de findAll()
    }

    public Player getById(Long id) {
        return repo.findByIdWithGames(id) // ← Au lieu de findById()
                .orElseThrow(() -> new ResourceNotFoundException("Player not found with id " + id));
    }

    public Player create(Player player) {
        // éventuelles règles métier ici (p.ex. unique name)
        return repo.save(player);
    }

    public Player update(Long id, Player updated) {
        Player existing = getById(id);
        existing.setUsername(updated.getUsername());
        return repo.save(existing);
    }

    public void delete(Long id) {
        Player existing = getById(id);
        repo.delete(existing);
    }
}