import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Player, Game, Criterion } from '../../models/models';
import { PlayerSelectorComponent } from '../../components/player-selector/player-selector';
import { CriterionSelectorComponent } from '../../components/criterion-selector/criterion-selector';
import { GamesListComponent } from '../../components/games-list/games-list';
import { PlayerService } from '../../services/player.service';
import { GameService } from '../../services/game.service';
import { CriterionService } from '../../services/criterion.service';

@Component({
  selector: 'app-game-randomizer',
  standalone: true,
  imports: [
    RouterOutlet,
    PlayerSelectorComponent,
    CriterionSelectorComponent,
    GamesListComponent
  ],
  templateUrl: './game-randomizer.html',
  styleUrl: './game-randomizer.scss'
})
export class GameRandomizer {

  /* Signals pour les données */
  allPlayers = signal<Player[]>([]);
  allGames = signal<Game[]>([]);
  allCriteria = signal<Criterion[]>([]);

  selectedPlayers = signal<Player[]>([]);
  selectedCriteria = signal<Criterion[]>([]);

  /* Injection des services */
  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private criterionService: CriterionService
  ) {}

  /* Chargement des données au démarrage */
  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Charger les joueurs
    this.playerService.getAll().subscribe({
      next: (players) => {
        this.allPlayers.set(players);
        console.log('✅ Joueurs chargés:', players.length);
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des joueurs:', error);
      }
    });

    // Charger les jeux
    this.gameService.getAll().subscribe({
      next: (games) => {
        this.allGames.set(games);
        console.log('✅ Jeux chargés:', games.length);
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des jeux:', error);
      }
    });

    // Charger les critères
    this.criterionService.getAll().subscribe({
      next: (criteria) => {
        this.allCriteria.set(criteria);
        console.log('✅ Critères chargés:', criteria.length);
      },
      error: (error) => {
        console.error('❌ Erreur lors du chargement des critères:', error);
      }
    });
  }

  /* Computed signals (logique réactive) */
  availableGames = computed(() => {
    return this.calculateGamesIntersection(this.selectedPlayers(), this.selectedCriteria());
  });

  availableCriteria = computed(() => {
    return this.calculateCriteriaIntersection(this.availableGames());
  });

  selectablePlayers = computed(() => {
    const selectedPlayers = this.selectedPlayers();
    
    // Filtre allPlayers pour ne garder que ceux qui ne sont pas dans selectedPlayers
    return this.allPlayers().filter(player => 
      !selectedPlayers.some(selectedPlayer => selectedPlayer.id === player.id)
    );
  });

  selectableCriteria = computed(() => {
    const selectedCriteria = this.selectedCriteria();
    
    // Filtre allPlayers pour ne garder que ceux qui ne sont pas dans selectedPlayers
    return this.availableCriteria().filter(criterion => 
      !selectedCriteria.some(selectedCriteria => selectedCriteria.id === criterion.id)
    );
  });

  playerWarnings = computed(() => {
    const warnings = new Map<number, string>();
    const selectable = this.selectablePlayers();
    const currentSelected = this.selectedPlayers();
    const currentCriteria = this.selectedCriteria();
  
    selectable.forEach(player => {
      // Simuler l'ajout du joueur
      const playersWithNewPlayer = [...currentSelected, player];
      const gamesAfterAddingNewPlayer = this.calculateGamesIntersection(playersWithNewPlayer, []);
      const criteriaAfterAddingNewPlayer = this.calculateCriteriaIntersection(gamesAfterAddingNewPlayer);
      
      // Type 1 : Aucun jeu en commun ?
      if (gamesAfterAddingNewPlayer.length === 0) {
        warnings.set(player.id, "Aucun jeu en commun avec les joueurs sélectionnés");
        return; // Pas besoin de vérifier Type 2
      }
      
      // Type 2 : Des critères sélectionnés deviendraient invalides ?
      const invalidatedCriteria = currentCriteria.filter(criterion => 
        !criteriaAfterAddingNewPlayer.some(newCriterion => newCriterion.id === criterion.id)
      );
        
      if (invalidatedCriteria.length > 0) {
        const criteriaNames = invalidatedCriteria.map(c => c.name).join(', ');
        warnings.set(player.id, `Supprimerait les critères : ${criteriaNames}`);
      }
    });
    
    return warnings;
  });

  /* Méthodes de calcul (logique métier) */
  private calculateGamesIntersection(selectedPlayers: Player[], selectedCriteria: Criterion[]): Game[] {
    return this.allGames().filter(game => {
      // Vérifie si le jeu est possédé par tous les joueurs sélectionnés
      const ownedByAllPlayers = selectedPlayers.length === 0 || 
        selectedPlayers.every(player => 
          player.gamesOwned.some(ownedGame => ownedGame.id === game.id)
        );

      // Vérifie si le jeu possède tous les critères sélectionnés
      const hasAllCriteria = selectedCriteria.length === 0 ||
        selectedCriteria.every(criterion =>
          game.criteria.some(gameCriterion => gameCriterion.id === criterion.id)
        );

      return ownedByAllPlayers && hasAllCriteria;
    });
  }

  private calculateCriteriaIntersection(availableGames: Game[]): Criterion[] {
    // Récupère tous les critères des jeux disponibles
      const allCriteria = availableGames.flatMap(game => game.criteria);
      
      // Élimine les doublons en utilisant un Set et les IDs comme clé d'unicité
      const uniqueCriteria = Array.from(
        new Map(allCriteria.map(criterion => [criterion.id, criterion])).values()
      );
      
      return uniqueCriteria;
  }

  /* Gestionnaires d'événements */
  onPlayerAdded(player: Player) {
    this.selectedPlayers.update(players => [...players, player]);
  }

  onPlayerRemoved(player: Player) {
    this.selectedPlayers.update(players => players.filter(p => p.id !== player.id));
  }

  onCriterionAdded(criterion: Criterion) {
    this.selectedCriteria.update(criteria => [...criteria, criterion]);
  }

  onCriterionRemoved(criterion: Criterion) {
    this.selectedCriteria.update(criteria => criteria.filter(c => c.id !== criterion.id));
  }

}
