export interface Card {
  id?: number;
  frontText: string;
  backText: string;
  flipped: boolean;
  deckId: number;
}
