import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/models';

@Injectable({
  providedIn: 'root'  // ← Rend le service disponible partout dans l'app
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/api/players';  // ← URL de base de l'API

  // Injection du HttpClient
  constructor(private http: HttpClient) {}

  // Récupère tous les joueurs
  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
    // ← get<Player[]> indique le type de retour attendu
  }

  // Récupère un joueur par ID
  getById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  // Crée un nouveau joueur
  create(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
    // ← post() envoie les données dans le body
  }

  // Met à jour un joueur existant
  update(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player);
  }

  // Supprime un joueur
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}