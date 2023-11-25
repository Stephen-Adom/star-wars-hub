import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListerPageComponent } from './lister-page/lister-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':category/list',
        component: ListerPageComponent
      },
      {
        path: ':category/details/:id',
        component: DetailsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
