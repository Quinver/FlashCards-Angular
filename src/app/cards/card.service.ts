import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Card {
  id: number;
  frontText: string;
  backText: string;
  flipped: boolean;
  deckId: number;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'http://localhost:5041/api/decks'; // API endpoint for decks

  constructor(private http: HttpClient) {}

  // Get all cards
  getCards(deckId: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/${deckId}/cards`);
  }

  // Get a specific card by id
  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${id}`);
  }

  // Create a new card
  createCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Update an existing card
  updateCard(id: number, card: Card): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, card, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Delete a card
  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
