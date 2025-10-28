package com.example.gamerandomizer.repository;

import com.example.gamerandomizer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}