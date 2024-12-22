import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  deckId: number = 0;

  currentCardIndex = 0;

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch the deckId from the route parameters
    this.deckId = Number(this.route.snapshot.paramMap.get('deckId'));
    
    // Fetch cards for the current deckId
    this.cardService.getCards(this.deckId).subscribe((data: Card[]) => {
      this.cards = data;
    });
  }

  flipCard(index: number) {
    // Toggle the flipped state based on the card index and reset to front
    this.cards[index].flipped = !this.cards[index].flipped;
  }

  nextCard() {
    // Increment the current card index and wrap around using modulo and reset to front
    this.cards.forEach((card) => (card.flipped = false));
    this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
  }

  previousCard() {
    // Decrement the current card index and wrap around using modulo
    this.cards.forEach((card) => (card.flipped = false));
    this.currentCardIndex =
      (this.currentCardIndex - 1 + this.cards.length) % this.cards.length;
  }
}
