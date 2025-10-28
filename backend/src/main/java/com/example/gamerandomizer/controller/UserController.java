package com.example.gamerandomizer.controller;

import com.example.gamerandomizer.model.User;
import com.example.gamerandomizer.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @GetMapping
    public List<User> list() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public User getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponseEntity<User> create(@Valid @RequestBody User user) {
        User created = service.create(user);
        URI location = URI.create(String.format("/api/users/%d", created.getId()));
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @Valid @RequestBody User user) {
        return service.update(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
