package com.example.gamerandomizer.repository;

import com.example.gamerandomizer.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    // Charge les jeux avec leurs critères
    @Query("SELECT DISTINCT g FROM Game g LEFT JOIN FETCH g.criteria")
    List<Game> findAllWithCriteria();

    @Query("SELECT DISTINCT g FROM Game g LEFT JOIN FETCH g.criteria WHERE g.id = :id")
    Optional<Game> findByIdWithCriteria(Long id);
}