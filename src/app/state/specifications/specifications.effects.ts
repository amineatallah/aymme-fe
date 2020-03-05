import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as specificationsActions from './specifications.actions';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HomeService } from '../../shared/home.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SpecificationsEffects {
  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private toastr: ToastrService,
  ) { }

  @Effect()
  loadSpecifications$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.LOAD_SPECIFICATIONS),
    concatMap((action: specificationsActions.LoadSpecifications) =>
      this.homeService.getSpecs().pipe(
        map(
          (specifications: any[]) => new specificationsActions.LoadSpecificationsSuccess(specifications)
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to load specifications!');
            return of(new specificationsActions.LoadSpecificationsFailure(err));
          }
        )
      )
    )
  );

  @Effect()
  createSpecification$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.CREATE_SPECIFICATION),
    concatMap((action: specificationsActions.CreateSpecification) =>
      this.homeService.createSpec({ name: action.payload.specName }).pipe(
        map(
          (specifications: any[]) => {
            this.toastr.success('', 'Specification created successfully!');
            return new specificationsActions.CreateSpecificationSuccess(specifications);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to create specification!');
            return of(new specificationsActions.CreateSpecificationFailure(err));
          }
        )
      )
    )
  );

  @Effect()
  deleteSpecification$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.DELETE_SPECIFICATION),
    concatMap((action: specificationsActions.DeleteSpecification) =>
      this.homeService.deleteSpecs(action.payload).pipe(
        map(
          (specifications: any) => {
            this.toastr.success('', 'Specification deleted successfully!');
            return new specificationsActions.DeleteSpecificationSuccess(action.payload);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete specification!');
            return of(new specificationsActions.DeleteSpecificationFailure(err));
          }
        )
      )
    )
  );

  @Effect()
  createExample$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.CREATE_EXAMPLE),
    concatMap((action: specificationsActions.CreateExample) =>
      this.homeService.uploadFile(action.payload.id, action.payload.filesToUpload).pipe(
        map(
          (specifications: any) => {
            this.toastr.success('', 'File uploaded successfully!');
            return new specificationsActions.CreateExampleSuccess(specifications);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to upload file!');
            return of(new specificationsActions.CreateExampleFailure(err));
          }
        )
      )
    )
  );
}
