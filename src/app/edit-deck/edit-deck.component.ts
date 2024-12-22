import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../deck-list/decks.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Deck } from '../models/deck.model';


@Component({
  selector: 'app-edit-deck',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-deck.component.html',
  styleUrl: './edit-deck.component.css',
})
export class EditDeckComponent {
  deck: Deck = { id: 0, name: '', description: '', cards: [] };
  

  constructor(private route: ActivatedRoute, private deckService: DecksService, private router: Router) {}

  ngOnInit() {
    // Fetch the deckId from the route parameters
    this.deck.id = Number(this.route.snapshot.paramMap.get('deckId'));

    // Fetch deck details for the current deckId
    this.deckService.getDeck(this.deck.id).subscribe((data: Deck) => {
      this.deck.name = data.name;
      this.deck.description = data.description;
      this.deck.cards = data.cards;
    });
  }

  removeCard(index: number) {
    // Remove the card at the given index
    this.deck.cards.splice(index, 1);
  }

  addCard() {
    // Add a new card to the deck
    this.deck.cards.push({ id: 0, frontText: 'Front Placeholder', backText: 'Back Placeholder', deckId: this.deck.id, flipped: false });
  }

  saveDeck() {
    // Update the deck details
    this.deckService.updateDeck(this.deck.id, this.deck).subscribe(() => {
      // Navigate back to the deck list after updating the deck
      this.router.navigate(['/']);
    });
  }
}
