import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CriterionService } from '../../../services/criterion.service';
import { Criterion } from '../../../models/models';

// Extension de Criterion avec état d'édition
interface CriterionRow extends Criterion {
  isEditing: boolean;
  originalName?: string; // Pour annuler les modifications
}

@Component({
  selector: 'app-criterion-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './criterion-management.html',
  styleUrl: './criterion-management.scss'
})
export class CriterionManagement implements OnInit {
  criteria = signal<CriterionRow[]>([]);
  displayedColumns = ['name', 'actions'];
  isAdding = signal(false);
  newCriterion: Criterion = { id: 0, name: '' };

  constructor(private criterionService: CriterionService) {}

  ngOnInit() {
    this.loadCriteria();
  }

  loadCriteria() {
    this.criterionService.getAll().subscribe({
      next: (data) => {
        // Convertir en CriterionRow
        this.criteria.set(data.map(c => ({ ...c, isEditing: false })));
      },
      error: (error) => console.error('Erreur chargement critères:', error)
    });
  }

  // Active le mode édition pour une ligne
  startEdit(criterion: CriterionRow) {
    // Désactiver toutes les autres éditions
    this.criteria.update(list => 
      list.map(c => ({ ...c, isEditing: c.id === criterion.id, originalName: c.name }))
    );
  }

  // Sauvegarde les modifications
  saveEdit(criterion: CriterionRow) {
    if (!criterion.name.trim()) {
      alert('Le nom ne peut pas être vide');
      return;
    }

    this.criterionService.update(criterion.id, criterion).subscribe({
      next: () => {
        // Mettre à jour via le signal
        this.criteria.update(list => 
          list.map(c => c.id === criterion.id ? { ...c, isEditing: false } : c)
        );
        console.log('✅ Critère mis à jour');
      },
      error: (error) => {
        console.error('❌ Erreur mise à jour:', error);
        alert('Erreur lors de la mise à jour');
      }
    });
  }

  // Annule l'édition
  cancelEdit(criterion: CriterionRow) {
    if (criterion.originalName) {
      criterion.name = criterion.originalName;
    }
    criterion.isEditing = false;
  }

  // Supprime un critère
  delete(criterion: CriterionRow) {
    if (!confirm(`Supprimer le critère "${criterion.name}" ?`)) {
      return;
    }

    this.criterionService.delete(criterion.id).subscribe({
      next: () => {
        this.criteria.update(list => list.filter(c => c.id !== criterion.id));
        console.log('✅ Critère supprimé');
      },
      error: (error) => {
        console.error('❌ Erreur suppression:', error);
        alert('Erreur lors de la suppression');
      }
    });
  }

  // Active le mode ajout
  startAdd() {
    this.isAdding.set(true);
    this.newCriterion = { id: 0, name: '' };
  }

  // Crée un nouveau critère
  saveNew() {
    if (!this.newCriterion.name.trim()) {
      alert('Le nom ne peut pas être vide');
      return;
    }

    this.criterionService.create(this.newCriterion).subscribe({
      next: (created) => {
        this.criteria.update(list => [...list, { ...created, isEditing: false }]);
        this.isAdding.set(false);
        console.log('✅ Critère créé');
      },
      error: (error) => {
        console.error('❌ Erreur création:', error);
        alert('Erreur lors de la création');
      }
    });
  }

  // Annule l'ajout
  cancelAdd() {
    this.isAdding.set(false);
    this.newCriterion = { id: 0, name: '' };
  }
}