import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../../models/models';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-player-selector',
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
  templateUrl: './player-selector.html',
  styleUrl: './player-selector.scss'
})
export class PlayerSelectorComponent {
  // Données reçues du parent (read-only)
  selectablePlayers = input.required<Player[]>();
  selectedPlayers = input.required<Player[]>();
  warnings = input.required<Map<number, string>>();
  
  // Événements émis vers le parent
  playerAdded = output<Player>();
  playerRemoved = output<Player>();
  
  // Méthodes pour gérer les interactions
  onAddPlayer(player: Player) {
    this.playerAdded.emit(player);
  }
  
  onRemovePlayer(player: Player) {
    this.playerRemoved.emit(player);
  }

  searchControl = new FormControl('');
  searchValue = toSignal(this.searchControl.valueChanges, { initialValue: '' });
  filteredPlayers = computed(() => {
    const search = this.searchValue()?.toLowerCase() || '';
    return this.selectablePlayers().filter(p => 
      p.username.toLowerCase().includes(search)
    );
  });

  onPlayerSelected(event: MatAutocompleteSelectedEvent) {
    const player = event.option.value as Player;
    this.playerAdded.emit(player);
    
    // Réinitialiser le champ de recherche
    this.searchControl.setValue('');
  }
}