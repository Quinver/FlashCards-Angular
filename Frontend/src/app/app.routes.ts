import { Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CardsComponent } from './cards/cards.component';
import { EditDeckComponent } from './edit-deck/edit-deck.component';

export const routes: Routes = [
    { path: '', component: DeckListComponent },
    { path: 'cards/:deckId', component: CardsComponent },
    { path: 'edit-deck/:deckId', component: EditDeckComponent },
];
