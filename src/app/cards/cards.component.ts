import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
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
  cards: Card[] = [
    { frontText: 'Front 1', backText: 'Back 1', flipped: false },
    { frontText: 'Front 2', backText: 'Back 2', flipped: false },
    { frontText: 'Front 3', backText: 'Back 3', flipped: false },
  ];

  currentCardIndex = 0;

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
}
