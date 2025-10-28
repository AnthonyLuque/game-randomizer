import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Criterion } from '../../models/models';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-criterion-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './criterion-selector.html',
  styleUrl: './criterion-selector.scss'
})
export class CriterionSelectorComponent {
  // Données reçues du parent (read-only)
  selectableCriteria = input.required<Criterion[]>();
  selectedCriteria = input.required<Criterion[]>();
  
  // Événements émis vers le parent
  criterionAdded = output<Criterion>();
  criterionRemoved = output<Criterion>();
  
  // Méthodes pour gérer les interactions
  onAddCriterion(criterion: Criterion) {
    this.criterionAdded.emit(criterion);
  }
  
  onRemoveCriterion(criterion: Criterion) {
    this.criterionRemoved.emit(criterion);
  }

  searchControl = new FormControl('');
  searchValue = toSignal(this.searchControl.valueChanges, { initialValue: '' });
  filteredCriteria = computed(() => {
    const search = this.searchValue()?.toLowerCase() || '';
    return this.selectableCriteria().filter(c => 
      c.name.toLowerCase().includes(search)
    );
  });

  onCriterionSelected(event: MatAutocompleteSelectedEvent) {
    const criterion = event.option.value as Criterion;
    this.criterionAdded.emit(criterion);
    
    // Réinitialiser le champ de recherche
    this.searchControl.setValue('');
  }
}