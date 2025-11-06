package com.example.gamerandomizer.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @ManyToMany
    @JoinTable(
            name = "game_criterion",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "criterion_id")
    )
    private Set<Criterion> criteria = new HashSet<>();

    @ManyToMany(mappedBy = "gamesOwned")
    private Set<Player> owners = new HashSet<>();

    // Constructeurs
    public Game() {}

    public Game(String title) {
        this.title = title;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Criterion> getCriteria() {
        return criteria;
    }

    public void setCriteria(Set<Criterion> criteria) {
        this.criteria = criteria;
    }

    public Set<Player> getOwners() {
        return owners;
    }

    public void setOwners(Set<Player> owners) {
        this.owners = owners;
    }
}