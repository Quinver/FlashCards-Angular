import { Routes } from '@angular/router';
import { DeckListComponent } from './deck-list/deck-list.component';

export const routes: Routes = [
    { path: '', component: DeckListComponent },
    { path: 'about', component: DeckListComponent },
];
