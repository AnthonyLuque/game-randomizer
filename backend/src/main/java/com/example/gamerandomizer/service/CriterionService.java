package com.example.gamerandomizer.service;

import com.example.gamerandomizer.dto.CriterionUpdateDTO;
import com.example.gamerandomizer.exception.ResourceNotFoundException;
import com.example.gamerandomizer.model.Criterion;
import com.example.gamerandomizer.repository.CriterionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CriterionService {
    private final CriterionRepository criterionRepository;

    public CriterionService(CriterionRepository criterionRepository) {
        this.criterionRepository = criterionRepository;
    }

    public List<Criterion> getAll() {
        return criterionRepository.findAll();
    }

    public Criterion getById(Long id) {
        return criterionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Criterion not found with id " + id));
    }

    @Transactional
    public Criterion create(Criterion criterion) {
        return criterionRepository.save(criterion);
    }

    @Transactional
    public Criterion update(Long id, CriterionUpdateDTO updateDTO) {
        Criterion existing = getById(id);
        existing.setName(updateDTO.name());
        return criterionRepository.save(existing);
    }

    public void delete(Long id) {
        Criterion existing = getById(id);
        criterionRepository.delete(existing);
    }
}