import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelComponent } from './model/model.component';
import { ServicesListComponent } from './services-list/services-list.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'services'},
  {path: 'services', component: ServicesListComponent},
  {path: 'portals', component: ModelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// bb-import cx6-collection-business-banking-demo-2.16.2.zip --auth-type ropc --portal-username admin --portal-password admin --ropc-identity-provider http://10.104.168.107:8080/auth/realms/nbb-bank-employee/protocol/openid-connect/token --ropc-client-id bb-tooling-client --portal-host 10.104.168.46 --portal-port 8080 --portal-version 6.1 --portal-context api
