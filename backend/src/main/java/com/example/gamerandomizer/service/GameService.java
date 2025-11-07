package com.example.gamerandomizer.service;

import com.example.gamerandomizer.dto.GameUpdateDTO;
import com.example.gamerandomizer.exception.ResourceNotFoundException;
import com.example.gamerandomizer.model.Criterion;
import com.example.gamerandomizer.model.Game;
import com.example.gamerandomizer.repository.CriterionRepository;
import com.example.gamerandomizer.repository.GameRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final CriterionRepository criterionRepository;

    public GameService(GameRepository gameRepository, CriterionRepository criterionRepository) {
        this.gameRepository = gameRepository;
        this.criterionRepository = criterionRepository;
    }

    public List<Game> getAll() {
        return gameRepository.findAllWithCriteria();
    }

    public Game getById(Long id) {
        return gameRepository.findByIdWithCriteria(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id " + id));
    }

    @Transactional
    public Game create(Game game) {
        return gameRepository.save(game);
    }

    @Transactional
    public Game update(Long id, GameUpdateDTO updateDTO) {
        Game existing = gameRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found with id " + id));

        existing.setTitle(updateDTO.title());

        // Mettre à jour les critères
        Set<Criterion> criteria = new HashSet<>();
        if (updateDTO.criteriaIds() != null) {
            for (Long criterionId : updateDTO.criteriaIds()) {
                criterionRepository.findById(criterionId).ifPresent(criteria::add);
            }
        }
        existing.setCriteria(criteria);

        return gameRepository.save(existing);
    }

    public void delete(Long id) {
        Game existing = getById(id);
        gameRepository.delete(existing);
    }
}