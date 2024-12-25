import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deck } from '../models/deck.model';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  private apiUrl = 'http://localhost:5041/api/decks'; // API endpoint

  constructor(private http: HttpClient) { }

  // Get all decks
  getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>(this.apiUrl);
  }

  // Get a specific deck by id
  getDeck(id: number): Observable<Deck> {
    return this.http.get<Deck>(`${this.apiUrl}/${id}`);
  }

  // Create a new deck
  createDeck(deck: Deck): Observable<Deck> {
    return this.http.post<Deck>(this.apiUrl, deck, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Update an existing deck
  updateDeck(id: number, deck: Deck): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, deck, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Delete a deck
  deleteDeck(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
