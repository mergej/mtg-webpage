import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCardsComponent } from './components/all-cards/all-cards.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { MtgComponent } from './components/mtg/mtg.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MtgComponent },
  { path: 'cards', component: AllCardsComponent },
  { path: 'cards/:id', component: CardDetailComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
