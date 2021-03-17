import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'tarjetas',
    pathMatch: 'full'
  },
  {
    path: 'tarjetas',
    children: [
      {
        path: "",
        loadChildren: () => import('./tarjetas/tarjetas.module').then( m => m.TarjetasPageModule)
      },
      {
        path: ":cardId",
        loadChildren: () => import('./tarjetas/card-detail/card-detail.module').then( m => m.CardDetailPageModule)
      }
    ]
  },
  {
    path: 'new-card',
    loadChildren: () => import('./tarjetas/card-add/card-add.module').then(m => m.CardAddPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
