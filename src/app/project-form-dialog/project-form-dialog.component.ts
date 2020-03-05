import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import * as projectsActions from '../state/projects/projects.actions';
import * as projectsSelectors from '../state/projects/projects.selectors';
import { Subject, Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
  styleUrls: ['./project-form-dialog.component.scss']
})
export class ProjectFormDialogComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  isCreatingProject$: Observable<boolean>;
  projectForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<any>,
    private actions$: Actions,
  ) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });

    this.isCreatingProject$ = this.store.pipe(select(projectsSelectors.isCreatingProject));

    this.actions$.pipe(
      ofType(projectsActions.ProjectsActionTypes.CREATE_PROJECT_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => {
        this.activeModal.close(true);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  dismissModal() {
    this.activeModal.dismiss(false);
    return false;
  }

  createProject() {
    this.store.dispatch(new projectsActions.CreateProject(this.projectForm.value));
  }
}
