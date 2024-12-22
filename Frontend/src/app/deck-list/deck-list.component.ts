import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecksService } from './decks.service';
import { CommonModule } from '@angular/common';
import { Deck } from '../models/deck.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deck-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.css',
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];
  newDeck: Deck = { id: 0, name: '', description: '', cards: [] };
  isFormVisible: boolean = false;

  constructor(private decksService: DecksService, private router: Router) {}

  ngOnInit() {
    // Fetch decks when the component is initialized
    this.decksService.getDecks().subscribe((data: Deck[]) => {
      this.decks = data;
    });
  }

  onSelect(id: number) {
    // Navigate to the cards component with the selected deck id
    this.router.navigate(['/cards', id]);
  }

  onDelete(id: number, event: MouseEvent) {
    event.stopPropagation();

    // Delete the deck with the given id
    this.decksService.deleteDeck(id).subscribe(() => {
      // Fetch the updated list of decks after deletion
      this.decksService.getDecks().subscribe((data: Deck[]) => {
        this.decks = data;
      });
    });
  }

  onEdit(id: number, event: MouseEvent) {
    event.stopPropagation();

    // Navigate to the edit deck component with the selected deck id
    this.router.navigate(['/edit-deck', id]);
  }

  openForm() {
    this.isFormVisible = true;
    this.newDeck = { id: 0, name: '', description: '', cards: [] }; // clear the new deck object
  }

  closeForm() {
    this.isFormVisible = false;
  }

  createDeck() {
    if (this.newDeck.name) {
      // Create a new deck
      this.decksService.createDeck(this.newDeck).subscribe(() => {
        // Fetch the updated list of decks after creation
        this.decksService.getDecks().subscribe((data: Deck[]) => {
          this.decks = data;
        });
      });
      this.isFormVisible = false;
    }
  }
}
