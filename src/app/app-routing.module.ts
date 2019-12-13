import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { MocksComponent } from './mocks/mocks.component';
import { ServiceComponent } from './service/service.component';
import { ModelComponent } from './model/model.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'services/:service', component: ServiceComponent,
    children: [
      {
        path: ':id',
        component: DetailsComponent
      }
    ]

  },
  {path: 'mocks', component: MocksComponent},
  {path: 'model', component: ModelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
