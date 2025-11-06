// src/app/services/criterion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Criterion } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CriterionService {
  private apiUrl = 'http://localhost:8080/api/criteria';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Criterion[]> {
    return this.http.get<Criterion[]>(this.apiUrl);
  }

  getById(id: number): Observable<Criterion> {
    return this.http.get<Criterion>(`${this.apiUrl}/${id}`);
  }

  create(criterion: Criterion): Observable<Criterion> {
    return this.http.post<Criterion>(this.apiUrl, criterion);
  }

  update(id: number, criterion: Criterion): Observable<Criterion> {
    return this.http.put<Criterion>(`${this.apiUrl}/${id}`, criterion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}