import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as projectsActions from '../state/projects/projects.actions';
import * as projectsSelectors from '../state/projects/projects.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'projects-wrapper',
  template: `
    <ng-container *ngIf="projects$ | async as projects">
      <ng-container *ngTemplateOutlet="projectsTemplate; context:{projects: projects}"></ng-container>

      <ng-template #projectsTemplate let-projects=projects>
        <projects [projects]="projects"></projects>
      </ng-template>
    </ng-container>
  `,
  styleUrls: ['./projects.component.scss']
})
export class ProjectsWrapperComponent implements OnInit {

  projects$: Observable<any>
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new projectsActions.LoadProjects);
    this.projects$ = this.store.pipe(select(projectsSelectors.getProjects));
  }

}
