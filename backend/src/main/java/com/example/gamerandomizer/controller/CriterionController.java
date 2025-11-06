package com.example.gamerandomizer.controller;

import com.example.gamerandomizer.dto.CriterionDTO;
import com.example.gamerandomizer.model.Criterion;
import com.example.gamerandomizer.service.CriterionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/criteria")
public class CriterionController {

    private final CriterionService service;
    public CriterionController(CriterionService service) { this.service = service; }

    @GetMapping
    public List<CriterionDTO> list() {
        return service.getAll().stream()
                .map(CriterionDTO::from)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public CriterionDTO getOne(@PathVariable Long id) {
        return CriterionDTO.from(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<Criterion> create(@Valid @RequestBody Criterion criterion) {
        Criterion created = service.create(criterion);
        URI location = URI.create(String.format("/api/criteria/%d", created.getId()));
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public Criterion update(@PathVariable Long id, @Valid @RequestBody Criterion criterion) {
        return service.update(id, criterion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
