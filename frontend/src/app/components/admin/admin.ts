import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PlayerManagement } from './player-management/player-management';
import { GameManagement } from './game-management/game-management';
import { CriterionManagement } from './criterion-management/criterion-management';

type Section = 'players' | 'games' | 'criteria';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    PlayerManagement,
    GameManagement,
    CriterionManagement
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  // Section actuellement affichée
  selectedSection = signal<Section>('players');

  // Liste des sections
  menuItems = [
    { id: 'players' as Section, label: 'Joueurs', icon: 'people' },
    { id: 'games' as Section, label: 'Jeux', icon: 'videogame_asset' },
    { id: 'criteria' as Section, label: 'Critères', icon: 'label' }
  ];

  selectSection(section: Section) {
    this.selectedSection.set(section);
  }
}