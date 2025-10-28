package com.example.gamerandomizer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // 🔹 Constructeur vide pour JPA
    public User() {}

    // 🔹 Constructeur pratique pour créer un User rapidement
    public User(String name) {
        this.name = name;
    }

    // 🔹 Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
