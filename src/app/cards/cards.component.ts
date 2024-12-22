import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { CommonModule } from '@angular/common';

interface Card {
  id: number;
  flipped: boolean;
  frontText: string;
  backText: string;
}

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  cards: Card[] = [];

  currentCardIndex = 0;

  constructor(private cardService: CardService) {}

  ngOnInit() {
    // Fetch cards from the API when the component is initialized
    this.cardService.getCards().subscribe((data: Card[]) => {
      this.cards = data;
    });
  }

  flipCard(index: number) {
    // Toggle the flipped state based on the card index and reset to front
    this.cards[index].flipped = !this.cards[index].flipped;
  }

  nextCard() {
    // Increment the current card index and wrap around using modulo and reset to front
    this.cards.forEach(card => card.flipped = false);
    this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
  }

  previousCard() {
    // Decrement the current card index and wrap around using modulo
    this.cards.forEach(card => card.flipped = false);
    this.currentCardIndex = (this.currentCardIndex - 1 + this.cards.length) % this.cards.length;
  }
  
  addCard() {
    const newCard: Card = { id: 0, frontText: 'New Front', backText: 'New Back', flipped: false };
    this.cardService.createCard(newCard).subscribe((card: Card) => {
      this.cards.push(card); // Add the new card to the list
    });
  }

  // Delete a card
  deleteCard(id: number) {
    this.cardService.deleteCard(id).subscribe(() => {
      this.cards = this.cards.filter(card => card.id !== id); // Remove the deleted card from the list
    });
  }
}
