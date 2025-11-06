package com.example.gamerandomizer.dto;

public record CriterionDTO(
        Long id,
        String name
) {
    // Méthode factory pour convertir depuis l'entité
    public static CriterionDTO from(com.example.gamerandomizer.model.Criterion criterion) {
        return new CriterionDTO(
                criterion.getId(),
                criterion.getName()
        );
    }
}