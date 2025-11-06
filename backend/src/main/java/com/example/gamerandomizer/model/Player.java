package com.example.gamerandomizer.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @ManyToMany
    @JoinTable(
            name = "player_game",
            joinColumns = @JoinColumn(name = "player_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    private Set<Game> gamesOwned = new HashSet<>();

    // Constructeurs
    public Player() {}

    public Player(String username) {
        this.username = username;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<Game> getGamesOwned() {
        return gamesOwned;
    }

    public void setGamesOwned(Set<Game> gamesOwned) {
        this.gamesOwned = gamesOwned;
    }
}