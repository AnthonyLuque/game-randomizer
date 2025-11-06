import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { GameService } from '../../../services/game.service';
import { CriterionService } from '../../../services/criterion.service';
import { Game, Criterion } from '../../../models/models';

interface GameRow extends Game {
  isEditing: boolean;
  originalTitle?: string;
  originalCriteria?: Criterion[];
}

@Component({
  selector: 'app-game-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule
  ],
  templateUrl: './game-management.html',
  styleUrl: './game-management.scss'
})
export class GameManagement implements OnInit {
  games = signal<GameRow[]>([]);
  allCriteria = signal<Criterion[]>([]);
  displayedColumns = ['title', 'criteria', 'actions'];
  isAdding = signal(false);
  newGame: Game = { id: 0, title: '', criteria: [] };

  constructor(
    private gameService: GameService,
    private criterionService: CriterionService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Charger les jeux
    this.gameService.getAll().subscribe({
      next: (data) => {
        this.games.set(data.map(g => ({ ...g, isEditing: false })));
      },
      error: (error) => console.error('Erreur chargement jeux:', error)
    });

    // Charger tous les critères disponibles
    this.criterionService.getAll().subscribe({
      next: (data) => {
        this.allCriteria.set(data);
      },
      error: (error) => console.error('Erreur chargement critères:', error)
    });
  }

  startEdit(game: GameRow) {
    this.games.update(list => 
      list.map(g => ({ 
        ...g, 
        isEditing: g.id === game.id,
        originalTitle: g.title,
        originalCriteria: [...g.criteria]
      }))
    );
  }

  saveEdit(game: GameRow) {
    if (!game.title.trim()) {
      alert('Le titre ne peut pas être vide');
      return;
    }

    this.gameService.update(game.id, game).subscribe({
      next: () => {
        this.games.update(list => 
          list.map(g => g.id === game.id ? { ...g, isEditing: false } : g)
        );
        console.log('✅ Jeu mis à jour');
      },
      error: (error) => {
        console.error('❌ Erreur mise à jour:', error);
        alert('Erreur lors de la mise à jour');
      }
    });
  }

  cancelEdit(game: GameRow) {
    this.games.update(list => 
      list.map(g => g.id === game.id 
        ? { 
            ...g, 
            title: g.originalTitle || g.title,
            criteria: g.originalCriteria || g.criteria,
            isEditing: false 
          } 
        : g
      )
    );
  }

  delete(game: GameRow) {
    if (!confirm(`Supprimer le jeu "${game.title}" ?`)) {
      return;
    }

    this.gameService.delete(game.id).subscribe({
      next: () => {
        this.games.update(list => list.filter(g => g.id !== game.id));
        console.log('✅ Jeu supprimé');
      },
      error: (error) => {
        console.error('❌ Erreur suppression:', error);
        alert('Erreur lors de la suppression');
      }
    });
  }

  // Gestion des critères (tags)
  toggleCriterion(game: GameRow, criterion: Criterion) {
    const hasCriterion = game.criteria.some(c => c.id === criterion.id);
    
    if (hasCriterion) {
      // Retirer le critère
      game.criteria = game.criteria.filter(c => c.id !== criterion.id);
    } else {
      // Ajouter le critère
      game.criteria = [...game.criteria, criterion];
    }
  }

  hasCriterion(game: GameRow, criterion: Criterion): boolean {
    return game.criteria.some(c => c.id === criterion.id);
  }

  // Ajout d'un nouveau jeu
  startAdd() {
    this.isAdding.set(true);
    this.newGame = { id: 0, title: '', criteria: [] };
  }

  saveNew() {
    if (!this.newGame.title.trim()) {
      alert('Le titre ne peut pas être vide');
      return;
    }

    this.gameService.create(this.newGame).subscribe({
      next: (created) => {
        this.games.update(list => [...list, { ...created, isEditing: false }]);
        this.isAdding.set(false);
        console.log('✅ Jeu créé');
      },
      error: (error) => {
        console.error('❌ Erreur création:', error);
        alert('Erreur lors de la création');
      }
    });
  }

  cancelAdd() {
    this.isAdding.set(false);
    this.newGame = { id: 0, title: '', criteria: [] };
  }

  toggleNewGameCriterion(criterion: Criterion) {
    const hasCriterion = this.newGame.criteria.some(c => c.id === criterion.id);
    
    if (hasCriterion) {
      this.newGame.criteria = this.newGame.criteria.filter(c => c.id !== criterion.id);
    } else {
      this.newGame.criteria = [...this.newGame.criteria, criterion];
    }
  }

  newGameHasCriterion(criterion: Criterion): boolean {
    return this.newGame.criteria.some(c => c.id === criterion.id);
  }
}