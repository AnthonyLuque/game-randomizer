package com.example.gamerandomizer.repository;

import com.example.gamerandomizer.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Optional<Player> findByUsername(String username);

    // Charge les joueurs avec leurs jeux ET les critères des jeux en une seule requête
    @Query("SELECT DISTINCT p FROM Player p " +
            "LEFT JOIN FETCH p.gamesOwned g " +
            "LEFT JOIN FETCH g.criteria")
    List<Player> findAllWithGames();

    // Utile pour récupérer un joueur spécifique avec toutes ses relations
    @Query("SELECT DISTINCT p FROM Player p " +
            "LEFT JOIN FETCH p.gamesOwned g " +
            "LEFT JOIN FETCH g.criteria " +
            "WHERE p.id = :id")
    Optional<Player> findByIdWithGames(Long id);
}