package com.example.gamerandomizer.controller;

import com.example.gamerandomizer.dto.GameDTO;
import com.example.gamerandomizer.dto.GameUpdateDTO;
import com.example.gamerandomizer.model.Game;
import com.example.gamerandomizer.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService service;
    public GameController(GameService service) { this.service = service; }

    @GetMapping
    public List<GameDTO> list() {
        return service.getAll().stream()
                .map(GameDTO::from)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public GameDTO getOne(@PathVariable Long id) {
        return GameDTO.from(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Game> create(@Valid @RequestBody Game game) {
        Game created = service.create(game);
        URI location = URI.create(String.format("/api/games/%d", created.getId()));
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public GameDTO update(@PathVariable Long id, @Valid @RequestBody GameUpdateDTO updateDTO) {
        return GameDTO.from(service.update(id, updateDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
