import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Observable } from 'rxjs';

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
  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projects$ = this.projectsService.getProjects();
  }

}
