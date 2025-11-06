package com.example.gamerandomizer.service;

import com.example.gamerandomizer.exception.ResourceNotFoundException;
import com.example.gamerandomizer.model.Criterion;
import com.example.gamerandomizer.repository.CriterionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CriterionService {
    private final CriterionRepository repo;

    public CriterionService(CriterionRepository repo) {
        this.repo = repo;
    }

    public List<Criterion> getAll() {
        return repo.findAll();
    }

    public Criterion getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Criterion not found with id " + id));
    }

    public Criterion create(Criterion criterion) {
        // éventuelles règles métier ici (p.ex. unique name)
        return repo.save(criterion);
    }

    public Criterion update(Long id, Criterion updated) {
        Criterion existing = getById(id);
        existing.setName(updated.getName());
        return repo.save(existing);
    }

    public void delete(Long id) {
        Criterion existing = getById(id);
        repo.delete(existing);
    }
}