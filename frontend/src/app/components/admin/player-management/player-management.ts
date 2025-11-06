import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { PlayerService } from '../../../services/player.service';
import { GameService } from '../../../services/game.service';
import { Player, Game } from '../../../models/models';

interface PlayerRow extends Player {
  isEditing: boolean;
  originalUsername?: string;
  originalGamesOwned?: Game[];
}

@Component({
  selector: 'app-player-management',
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
  templateUrl: './player-management.html',
  styleUrl: './player-management.scss'
})
export class PlayerManagement implements OnInit {
  players = signal<PlayerRow[]>([]);
  allGames = signal<Game[]>([]);
  displayedColumns = ['username', 'gamesOwned', 'actions'];
  isAdding = signal(false);
  newPlayer: Player = { id: 0, username: '', gamesOwned: [] };

  constructor(
    private playerService: PlayerService,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Charger les joueurs
    this.playerService.getAll().subscribe({
      next: (data) => {
        this.players.set(data.map(p => ({ ...p, isEditing: false })));
      },
      error: (error) => console.error('Erreur chargement joueurs:', error)
    });

    // Charger tous les jeux disponibles
    this.gameService.getAll().subscribe({
      next: (data) => {
        this.allGames.set(data);
      },
      error: (error) => console.error('Erreur chargement jeux:', error)
    });
  }

  startEdit(player: PlayerRow) {
    this.players.update(list => 
      list.map(p => ({ 
        ...p, 
        isEditing: p.id === player.id,
        originalUsername: p.username,
        originalGamesOwned: [...p.gamesOwned]
      }))
    );
  }

  saveEdit(player: PlayerRow) {
    if (!player.username.trim()) {
      alert('Le nom ne peut pas être vide');
      return;
    }

    this.playerService.update(player.id, player).subscribe({
      next: () => {
        this.players.update(list => 
          list.map(p => p.id === player.id ? { ...p, isEditing: false } : p)
        );
        console.log('✅ Joueur mis à jour');
      },
      error: (error) => {
        console.error('❌ Erreur mise à jour:', error);
        alert('Erreur lors de la mise à jour');
      }
    });
  }

  cancelEdit(player: PlayerRow) {
    this.players.update(list => 
      list.map(p => p.id === player.id 
        ? { 
            ...p, 
            username: p.originalUsername || p.username,
            gamesOwned: p.originalGamesOwned || p.gamesOwned,
            isEditing: false 
          } 
        : p
      )
    );
  }

  delete(player: PlayerRow) {
    if (!confirm(`Supprimer le joueur "${player.username}" ?`)) {
      return;
    }

    this.playerService.delete(player.id).subscribe({
      next: () => {
        this.players.update(list => list.filter(p => p.id !== player.id));
        console.log('✅ Joueur supprimé');
      },
      error: (error) => {
        console.error('❌ Erreur suppression:', error);
        alert('Erreur lors de la suppression');
      }
    });
  }

  // Gestion des jeux (tags)
  toggleGame(player: PlayerRow, game: Game) {
    const hasGame = player.gamesOwned.some(g => g.id === game.id);
    
    if (hasGame) {
      // Retirer le jeu
      player.gamesOwned = player.gamesOwned.filter(g => g.id !== game.id);
    } else {
      // Ajouter le jeu
      player.gamesOwned = [...player.gamesOwned, game];
    }
  }

  hasGame(player: PlayerRow, game: Game): boolean {
    return player.gamesOwned.some(g => g.id === game.id);
  }

  // Ajout d'un nouveau joueur
  startAdd() {
    this.isAdding.set(true);
    this.newPlayer = { id: 0, username: '', gamesOwned: [] };
  }

  saveNew() {
    if (!this.newPlayer.username.trim()) {
      alert('Le nom ne peut pas être vide');
      return;
    }

    this.playerService.create(this.newPlayer).subscribe({
      next: (created) => {
        this.players.update(list => [...list, { ...created, isEditing: false }]);
        this.isAdding.set(false);
        console.log('✅ Joueur créé');
      },
      error: (error) => {
        console.error('❌ Erreur création:', error);
        alert('Erreur lors de la création');
      }
    });
  }

  cancelAdd() {
    this.isAdding.set(false);
    this.newPlayer = { id: 0, username: '', gamesOwned: [] };
  }

  toggleNewPlayerGame(game: Game) {
    const hasGame = this.newPlayer.gamesOwned.some(g => g.id === game.id);
    
    if (hasGame) {
      this.newPlayer.gamesOwned = this.newPlayer.gamesOwned.filter(g => g.id !== game.id);
    } else {
      this.newPlayer.gamesOwned = [...this.newPlayer.gamesOwned, game];
    }
  }

  newPlayerHasGame(game: Game): boolean {
    return this.newPlayer.gamesOwned.some(g => g.id === game.id);
  }
}