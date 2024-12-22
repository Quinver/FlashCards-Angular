import { Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';
import { CardsComponent } from './cards/cards.component';

export const routes: Routes = [
    { path: '', component: DeckListComponent },
    { path: 'cards', component: CardsComponent },
];
