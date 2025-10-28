import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Game } from '../../models/models';

@Component({
  selector: 'app-games-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './games-list.html',
  styleUrl: './games-list.scss'
})
export class GamesListComponent {
  // Input du parent
  availableGames = input.required<Game[]>();
  
  // État local pour le jeu tiré
  selectedGame = signal<Game | null>(null);
  
  // Méthode de tirage au sort
  randomize() {
    const games = this.availableGames();
    
    if (games.length === 0) {
      // Pas de jeux disponibles
      this.selectedGame.set(null);
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * games.length);
    this.selectedGame.set(games[randomIndex]);
  }

  // Méthode helper pour formater les critères
  getCriteriaNames(game: Game): string {
    return game.criteria.map(c => c.name).join(', ');
  }
  
  getSelectedGameCriteria(): string {
    const game = this.selectedGame();
    if (!game) return '';
    return game.criteria.map(c => c.name).join(' • ');
  }
}
