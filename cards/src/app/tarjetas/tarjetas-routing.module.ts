import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetasPage } from './tarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetasPage
  },
  {
    path: 'card-detail',
    loadChildren: () => import('./card-detail/card-detail.module').then( m => m.CardDetailPageModule)
  },
  {
    path: 'card-add',
    loadChildren: () => import('./card-add/card-add.module').then( m => m.CardAddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetasPageRoutingModule {}
