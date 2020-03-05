import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { ModelComponent } from './model/model.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { HowToComponent } from './how-to/how-to.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ProjectsWrapperComponent } from './projects/projects-wrapper.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'projects' },
  { path: 'projects', component: ProjectsWrapperComponent, data: { animation: 'ProjectsPage' } },
  { path: 'projects/:projectName', component: ServicesListComponent, data: { animation: 'ServicesListPage' } },
  { path: 'experiences', component: ExperiencesComponent, data: { animation: 'ExperiencesPage' } },
  { path: 'experiences/:experienceName', component: ModelComponent, data: { animation: 'ExperienceDetailsPage' } },
  { path: 'howto', component: HowToComponent, data: { animation: 'HowToPage' } }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
