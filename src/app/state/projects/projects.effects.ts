import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as projectsActions from './projects.actions';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProjectsService } from '../../shared/projects.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private toastr: ToastrService,
  ) { }

  @Effect()
  loadExperiences$ = this.actions$.pipe(
    ofType(projectsActions.ProjectsActionTypes.LOAD_PROJECTS),
    concatMap((action: projectsActions.LoadProjects) => {
      return this.projectsService.getProjects().pipe(
        map(
          (portals: any[]) => {
            return new projectsActions.LoadProjectsSuccess(portals);
          }),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to load projects!');
            return of(new projectsActions.LoadProjectsFailure(err));
          }
        )
      );
    })
  );

  @Effect()
  createProject$ = this.actions$.pipe(
    ofType(projectsActions.ProjectsActionTypes.CREATE_PROJECT),
    concatMap((action: projectsActions.CreateProject) =>
      this.projectsService.createProject(action.payload).pipe(
        map(
          (experience: any[]) => {
            this.toastr.success('Project created successfully!', '');
            return new projectsActions.CreateProjectSuccess(experience);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to create project!');
            return of(new projectsActions.CreateProjectFailure(err));
          }
        )
      )
    )
  );

  @Effect()
  deleteExperience$ = this.actions$.pipe(
    ofType(projectsActions.ProjectsActionTypes.DELETE_PROJECT),
    concatMap((action: projectsActions.DeleteProject) =>
      this.projectsService.deleteProject(action.payload).pipe(
        map(
          (results: any[]) => {
            this.toastr.success('', 'Project deleted successfully!');
            return new projectsActions.DeleteProjectSuccess(action.payload);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete project!');
            return of(new projectsActions.DeleteProjectFailure(err));
          }
        )
      )
    )
  );
}
