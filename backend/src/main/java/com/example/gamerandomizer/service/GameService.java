package com.example.gamerandomizer.service;

import com.example.gamerandomizer.exception.ResourceNotFoundException;
import com.example.gamerandomizer.model.Game;
import com.example.gamerandomizer.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {
    private final GameRepository repo;

    public GameService(GameRepository repo) {
        this.repo = repo;
    }

    public List<Game> getAll() {
        return repo.findAllWithCriteria();
    }

    public Game getById(Long id) {
        return repo.findByIdWithCriteria(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id " + id));
    }

    public Game create(Game game) {
        // éventuelles règles métier ici (p.ex. unique name)
        return repo.save(game);
    }

    public Game update(Long id, Game updated) {
        Game existing = getById(id);
        existing.setTitle(updated.getTitle());
        return repo.save(existing);
    }

    public void delete(Long id) {
        Game existing = getById(id);
        repo.delete(existing);
    }
}
