package com.example.gamerandomizer.service;

import com.example.gamerandomizer.exception.ResourceNotFoundException;
import com.example.gamerandomizer.model.User;
import com.example.gamerandomizer.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    public User getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    public User create(User user) {
        // éventuelles règles métier ici (p.ex. unique name)
        return repo.save(user);
    }

    public User update(Long id, User updated) {
        User existing = getById(id);
        existing.setName(updated.getName());
        return repo.save(existing);
    }

    public void delete(Long id) {
        User existing = getById(id);
        repo.delete(existing);
    }
}