package com.example.gamerandomizer.controller;

import com.example.gamerandomizer.dto.PlayerDTO;
import com.example.gamerandomizer.model.Player;
import com.example.gamerandomizer.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService service;
    public PlayerController(PlayerService service) { this.service = service; }

    @GetMapping
    public List<PlayerDTO> list() {
        return service.getAll().stream()
                .map(PlayerDTO::from)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PlayerDTO getOne(@PathVariable Long id) {
        return PlayerDTO.from(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Player> create(@Valid @RequestBody Player player) {
        Player created = service.create(player);
        URI location = URI.create(String.format("/api/players/%d", created.getId()));
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public Player update(@PathVariable Long id, @Valid @RequestBody Player player) {
        return service.update(id, player);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
