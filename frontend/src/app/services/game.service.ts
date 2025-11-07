// src/app/services/game.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/games';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  create(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  update(id: number, game: Game): Observable<Game> {
    // Transformer en GameUpdateDTO
    const updateDTO = {
      title: game.title,
      criteriaIds: game.criteria.map(c => c.id)
    };
    return this.http.put<Game>(`${this.apiUrl}/${id}`, updateDTO);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}